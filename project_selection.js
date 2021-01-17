function display(val){
    if(val)
        document.getElementById("new_project").style.display="block";
    else
        document.getElementById("new_project").style.display="none";
}

function my_project()
{
    var selection=2,project_name;
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");

    if(document.getElementById("old_projects").checked)
    {
        selection=0;
    }
    else if(document.getElementById("new_projects").checked)
    {
        if(document.getElementById("project_name").value){
            project_name = document.getElementById("project_name").value;
            selection=1;
        }
        else
        {
        alert("Please do a valid selection");
        location.reload();
        }
    }
    else
    {
        alert("Please do a valid selection");
        location.reload();
    }
    var {PythonShell} = require('python-shell');

    if(selection<2){
    var options = {
        mode: 'text',
        pythonPath: 'C:/Users/nidhi/AppData/Local/Programs/Python/Python36/python.exe', 
        pythonOptions: ['-u'],
        scriptPath: './python_scripts/',
        args: [username,password,__dirname,selection,project_name]
    };

        let pyshell = new PythonShell('projects.py', options);

        pyshell.on('message', function(message) {

        if(message=="New project created")
        {
            alert(message);
            window.location="choose_file.html";
        }
        // else if(message=="loading old projects")
        //     window.location = "old_projects.html";

        else if(message.length>25)
            document.write(message);
        else
            alert(message);
            
        })
    }
}

function goback()
{
    window.location="gui.html";
}