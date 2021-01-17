function register_user() {
  var {PythonShell} = require('python-shell');

  var new_username = document.getElementById("new_username").value;
  var new_password = document.getElementById("new_password").value;
  var thaver_id = document.getElementById("thaver_id").value;
  if(new_password=="" || new_username=="")
  {
    alert("Empty Username, Password and ID should be Number")
  }
  var options = {
    mode: 'text',
    pythonPath: 'C:/Users/nidhi/AppData/Local/Programs/Python/Python36/python.exe', 
    pythonOptions: ['-u'],
    scriptPath: './python_scripts/',
    args: [new_username, new_password, thaver_id]
  };

    let pyshell = new PythonShell('register.py', options);


    pyshell.on('message', function(message) {
      alert(message);

      if(message=="New User Created Sucessfully")
      {
        window.location = "gui.html";
      }
    })

    document.getElementById("new_username").value = "";
    document.getElementById("new_password").value = "";
    document.getElementById("thaver_id").value = "";

}
