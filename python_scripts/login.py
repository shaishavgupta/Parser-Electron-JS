import sqlite3
import sys

username = str(sys.argv[1]).lower()
password = str(sys.argv[2])
dir = str(sys.argv[3])

conn = sqlite3.connect(dir+"/alluser.db")
c = conn.cursor()

c.execute("""select * from user where username=? and password=?""",(username,password,))
if(len(c.fetchall())):
    print("Logged In")
else:
    print("No Such Username Exists")

conn.commit()
conn.close()