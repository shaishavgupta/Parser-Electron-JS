from xml.etree import ElementTree as et
import os
import pandas as pd
import sys

path = sys.argv[1]
file_name = path.split('/')[-1]
path = path.split('/')[0:len(path.split('/'))-1]
path = '/'.join(path)

os.chdir(path)

table = pd.DataFrame(columns=["Sectionid", "RavellingArea"])
rav_area = []
sectionid = []

mytree = et.parse(file_name)

root = mytree.getroot()

sum = 0
for i in root.findall('RoadSectionInfo'):
    sectionid.append(i.find('SectionID').text)
for i in root.findall('RavelingInformation'):
    if (len(root.findall('RavelingInformation'))):
        for j in i.findall('ZoneReportList'):
            for k in j.findall('ZoneReport'):
                sum += float(k.find('RI_Area').text)
rav_area.append(sum)
table["Sectionid"] = sectionid
table["RavellingArea"] = rav_area
table.to_excel('output.xlsx')
val = True
while val:
    print("excel sucessfully generated")
    val = False
val=True