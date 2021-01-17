import sqlite3
import sys

username = sys.argv[1].lower()
password = sys.argv[2]
dir = sys.argv[3]
selection = int(sys.argv[4])

conn = sqlite3.connect(dir+"/alluser.db")
c = conn.cursor()

if(selection):
    project_name=sys.argv[5]
    c.execute("""select * from user where username=? and projects=?""",(username,project_name))
    if(len(c.fetchall())):
        print("Project already created")

    else:
        c.execute("""insert into user values(?, ?, ?, ?, datetime())""",(None,username,password,project_name))
        print("New project created")



if not(selection):
    c.execute("""select projects,created_on from user where username=? and password=?""",(username,password))
    print(c.fetchall())

conn.commit()
conn.close()