import sqlite3
import sys

new_username = str(sys.argv[1]).lower()
new_password = str(sys.argv[2])
thaver_id = int(sys.argv[3])

thaver_id_list = [1]
conn = sqlite3.connect("C:/Users/nidhi/Desktop/electron-quick-start/Responsive-Login-Form/alluser.db")
c = conn.cursor()

if not(len(new_username)):
    print("Invalid Username")
if len(new_password)<5:
    print("Enter 5 character password")


if thaver_id in thaver_id_list:
    c.execute("""select * from user where username=?""",(new_username,))
    if(len(c.fetchall())):
        print("Username Already Exists")
    
    else:
        c.execute("""insert into user values (?, ?, ?, ?, ?)""",(thaver_id, new_username, new_password, None, None))
        print("New User Created Sucessfully")

else:
    print("No such ID exist")

conn.commit()
conn.close()