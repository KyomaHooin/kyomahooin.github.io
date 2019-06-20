#!/usr/bin/python
#
# Interactive post CLI tool.
#
#TODO:
# -loop video/image/cover
#

import time,os,re

TAG=['tech','poi','book','sound','other']

header,title,rating,tag,content = '','','','',''

#---------------------------

def get_index(tag):
    index = 1
    for F in os.listdir('_posts/'):
        if tag in F:
            i = int(re.sub('.*' + tag + '-(.*)\.md','\\1',F))
            if i > index: index = i
    return str(index + 1)

#---------------------------

print "\n--# Post composer 1.0 #--\n"

# HEADER
while not tag in TAG: tag = raw_input("Tag: ")
while not title: title = raw_input("Title: ")
if tag == 'book':
    while not rating: rating = raw_input("Rating: ")

header +='---' + '\n'
header +='title: ' + title + '\n'
if rating: header += 'rating: ' + rating + '\n'
header += 'layout: post\n'
header +='tags: ' + tag + '\n'
header += 'date: ' + time.strftime('%Y-%m-%d %H:%M:%S') + '\n'
header +='---' + '\n'

# CONTENT
while 1:
    line = raw_input("Content: ")
    if line == '.': break
    content += line + '\n'

# PREVIEW
preview = raw_input("\nShow preview? [y/n]: ")
if preview == 'y': print header + content

# WRITE
fn = time.strftime('%Y-%m-%d') + '-' + tag + '-' + get_index(tag) +'.md'
write = raw_input('Write to file [ ' + fn + ' ]? [y/n]: ')
if write == 'y':
    try:
        f = open('_posts/' + fn, 'a')
        f.write(header)
        f.write(content)
        f.close()
        print "Done."
    except:
        print "Write error."

