function login_user() {
  //var {PythonShell} = require('python-shell');
  const {PythonShell} =require('python-shell'); 
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  var options = {
    mode: 'text',
    pythonPath: 'C:/Users/nidhi/AppData/Local/Programs/Python/Python36/python.exe', 
    pythonOptions: ['-u'],
    scriptPath: './python_scripts/',
    args: [username,password,__dirname]
  };

    let pyshell = new PythonShell('login.py', options);

    pyshell.on('message', function(message) {

      if(message=="Logged In")
      {
        localStorage.setItem("username", username);
        localStorage.setItem("password",password);
        window.location = "project_select.html";
      }

      else{alert(message)}

    })
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

}
