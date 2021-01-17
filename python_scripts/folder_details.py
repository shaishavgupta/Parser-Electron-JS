import os
import sys
import pandas as pd
path = sys.argv[1]

s=0
os.chdir(path)
for x in range(len(os.listdir())):
    if os.listdir()[x].endswith('.xml'):
        s+=1
print(f"this folder has {s} xml files")

