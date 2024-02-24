import os
def html(name):
    return '''
     <img
        class="main-window-imgs"
        src="./src/images/{0}"
        alt="{0}"
    />
    '''.format(name)

def src(name :str,i :int):
    return name[0:name.find('.')] + ":this.allImgsDom[{0}],\n".format(i)


def dom(name):
    name1 = name[0: name.find(".")]
    return f'{name1} : new Dom("{name1}"),\n'


# names = os.listdir("E:\\Office work add\\EE3 version1\\src\\images\\exp3")
names = os.listdir("E:\\office project\\vlabs-EE\EE4\\src\\images\\exp4")

# namesStr = ''
# for name in names:
#     namesStr = namesStr + f'{name}\n'

# open("temp3.txt","w").write(namesStr)

BASE_COUNT = 13
count = 168

srcs = ''
doms = ''
htms = ''
for i in range(len(names)):
    htms = htms + html(names[i])
    doms = doms + dom(names[i])
    srcs = srcs + src(names[i],i+count)

        


# open("temp.txt","w").write()
allItems = f'{htms}\n\n{srcs}\n\n{doms}'
open("temp2.txt","w").write(allItems)

print("Done 👍")
# print(os.__path__)
#            