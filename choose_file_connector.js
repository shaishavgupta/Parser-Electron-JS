var path_global;
function upload_file(){

var {PythonShell} = require('python-shell');
const ipc = require('electron').ipcRenderer;

// const realFileBtn = document.getElementById("real-file");

const customTxt = document.getElementById("custom-text1");

// realFileBtn.click();

// realFileBtn.addEventListener("change", function() {
//   if (realFileBtn.value) {
//     customTxt.innerHTML = realFileBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
//   } else {
//     customTxt.innerHTML = "No file chosen.";
//   }
// });
ipc.send('open-file-dialog-for-file');
ipc.on('selected-file', function (event,path) {
  path = path.split('\\').join('/')
  customTxt.innerHTML = path.split("/")[path.split("/").length-1]
  var options = {
    mode: 'text',
    pythonPath: 'C:/Users/nidhi/AppData/Local/Programs/Python/Python36/python.exe', 
    pythonOptions: ['-u'],
    scriptPath: './python_scripts/',
    args: [path]
  };
    let pyshell = new PythonShell('raveling_parser_file.py', options);
    pyshell.on('message', function(message) {
      alert(message);
    // if(message=="")
    if(message=="excel sucessfully generated")
      location.reload();
  
    })
    path = null;
});


}

function upload_folder(){
  const ipc = require('electron').ipcRenderer;
  var {PythonShell} = require('python-shell');
  var start=0,end=0;
    // const realFolBtn = document.getElementById("real-folder");
    const customTxt = document.getElementById("folder-name");
    const file_number = document.getElementById("file_number")

  //   realFolBtn.addEventListener("change", function() {
  //   if (realFolBtn.value) {
  //     customTxt.innerHTML = realFolBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];

  //   } else {
  //     customTxt.innerHTML = "No file chosen, yet.";
  //   }
  // });
    
ipc.send('open-file-dialog-for-folder');

ipc.on('selected-folder', function (event,path) {

  console.log('Folder path: ', path);

  path_global = path.split('\\').join('/')
  customTxt.innerHTML = path.split("/")[path.split("/").length-1]
  var options = {
    mode: 'text',
    // pythonPath: 'C:/Users/nidhi/AppData/Local/Programs/Python/Python36/python.exe', 
    pythonPath: 'C:/ProgramData/Anaconda3/python.exe', 

    pythonOptions: ['-u'],
    scriptPath: './python_scripts/',
    args: [path]
  };
    let pyshell = new PythonShell('folder_details.py', options);
    pyshell.on('message', function(message) {
      file_number.innerHTML = "this folder has "+ message[16] +" XML files";
      document.getElementById("to").max = message[16];
      
        // location.reload();
        document.getElementById("submit").addEventListener("click",function(){
        if(document.getElementById("range").checked)
        {
          start = parseInt(document.getElementById("from").value)-1;
          end = document.getElementById("to").value;
        }
        else if(document.getElementById("all").checked)
        {
          start=0;
          end = message[16];
        }
        else
        {
          start=0;
          end=1;
        }

        var options = {
          mode: 'text',
          pythonPath: 'C:/ProgramData/Anaconda3/python.exe',       
          pythonOptions: ['-u'],
          scriptPath: './python_scripts/',
          args: [path_global,start,end,message[16]]
        };

        let pyshell = new PythonShell('raveling_parser_folder.py', options);
        pyshell.on('message', function(message) {
         
        if(message=="done")
        {
          location.reload();
        }     
        else if(message=="No files found or maximum size increased")
        {
          alert(message)
          location.reload();
        }
        else
        alert(message);
      });

    });
  });
    path = null;
});
}
