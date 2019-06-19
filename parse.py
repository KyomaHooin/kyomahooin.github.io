#!/usr/bin/python
#
# Parse input
#

import re

source = ['src1.txt','src2.txt','src3.txt']
fileindex = {'poi':1,'book':1,'tech':1,'other':1,'sound':1}

#------------------------

for FILE in source:

    marker = 0
    index = 0
    header = ''

    print "FILE: ", FILE

    f = open(FILE,'r')
    data = f.readlines()
    f.close()

    while 1:# parse header
        while marker != 2:
            line = data[index]
            header += line 
            if line.startswith('---'): marker += 1
            if line.startswith('date'):
                prefix = re.sub('date: (....-..-..) .*','\\1',line).strip()
            if line.startswith('tags'):
                sufix = re.sub('tags: (.*)','\\1',line).strip()
            index += 1

        o = open('out/' + prefix + '-' + sufix + '-' + str(fileindex[sufix]) + '.md', 'a')
        o.write(header)
        header = ''
        fileindex[sufix] += 1

        while 1:# parse data
            if index == len(data): break
            line = data[index]
            if line.startswith('---'):
                marker = 0
                o.close()
                break
            else:
                o.write(line)
            index += 1
        if index == len(data): break

