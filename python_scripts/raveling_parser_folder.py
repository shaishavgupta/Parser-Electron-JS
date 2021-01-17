from xml.etree import ElementTree as et
import os
import pandas as pd
import sys
s=0
path=sys.argv[1]
start=int(sys.argv[2])
end=int(sys.argv[3])
v=int(sys.argv[4])


if v>=end:
    table = pd.DataFrame(columns=["Sectionid", "RavellingArea"])
    rav_area = []
    sectionid = []
    for x in range(len(os.listdir(os.chdir(path)))):
        if os.listdir()[x].endswith('.xml'):
            s+=1
            if(s>=start and s<=end):
                mytree = et.parse(os.listdir()[x])
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
    print("done")
    print(f"output.xlsx generated sucessfully from {end-start} xml")

else:
    print("No files found or maximum size increased")