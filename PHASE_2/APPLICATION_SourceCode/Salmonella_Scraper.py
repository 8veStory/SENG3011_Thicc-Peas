from bs4 import BeautifulSoup
import requests
import re
import os
import json

# Dealing with different representation of a country name (Abbreviations)
# Dealing with subset
jsonList = []


def RcChecker(soupHandler): #Returns true if uses RC, False else
    aag=soupHandler.findAll('div', class_="card-body bg-tertiary")
    reportedCaseFilter = re.compile(".*Reported Cases.*")
    lastDiv = aag[1:-1]
    if lastDiv==[]:
        lastDiv = aag[1:]
    for i in lastDiv:
        liTags = i.find_all("li")
        if (liTags!=[]):
            for li in liTags:
                #print(li.text)
                if (reportedCaseFilter.match(li.text.rstrip().lstrip())):
                    return True
            return False

def getMainText(soupHandler):
    aag=soupHandler.find_all('div', class_="card-body bg-white")
    mainText = ""
    if (RcChecker(soupHandler)):
        reqDiv = aag[3:4]
        #print(reqDiv)
        if (len(aag)==7):
            reqDiv = aag[4:5]
        if (len(aag)==9):
            reqDiv = aag[6:7]
    else:
        reqDiv = aag[0:1]
        if(len(reqDiv[0].find_all('p')) == 0):
            aag=soupHandler.find_all('div', class_="card-body p-0")
            reqDiv = aag[1:2]
            if (reqDiv==[]):
                aag=soupHandler.find_all('div', class_="card-body pt-0 bg-white")
                reqDiv = aag[0:1]

    for d in reqDiv:
        for p in d.find_all('p'):
            mainText = mainText + p.text

    return mainText

page = requests.get("https://www.cdc.gov/salmonella/outbreaks.html")
soup = BeautifulSoup(page.content, 'html.parser')

# Looks for all the links that starts with /salmonella #
#aLinks = soup.findAll('a', href=lambda x: x and x.startswith('/salmonella'))
aLinks = soup.findAll('a', href=lambda x: x and x.startswith('/salmonella'))

#Does a conversion from ResultSet into a list using aLinkList.append
aLinksList = []
for i in aLinks:
    aLinksList.append(i['href'])

#Filters again for all the links that is "index.html"
indexFilter = re.compile("^.*[0-9][0-9]/index\.html$")
filterALinks = [s for s in aLinksList if indexFilter.match(s)]

#Removes all the duplicates
filterALinks = list(dict.fromkeys(filterALinks))

legalLinks = []

#Loops through each valid page
for y in filterALinks:
    url = "https://www.cdc.gov" + y
    page1 = requests.get(url)
    soupHandler = BeautifulSoup(page1.content, 'html.parser')
    aag = soupHandler.findAll('div', text="At A Glance")
    if (aag != []):
        legalLinks.append(url)

legalLinksWhite = []

for y in legalLinks:
    jsonData = {}
    jsonDataInt = {}
    url = y
    pageUrl = requests.get(url)
    soupHandler = BeautifulSoup(pageUrl.content, 'html.parser')
    aag = soupHandler.findAll('div', class_="card-body bg-tertiary")
    lastDiv = aag[1:2]
    if lastDiv==[]:
        lastDiv = aag[1:]
    for i in lastDiv:
        liTags = i.find_all("li")
        if (liTags!=[]):
            jsonData['date'] = soupHandler.find('span', id="last-reviewed-date").text
            jsonData['title'] = soupHandler.find('h1', id="content").text
            jsonData['maintext'] = getMainText(soupHandler)
            jsonData['url'] = url
            jsonData['location'] = 'USA'
            #print("Date: ", soupHandler.find('span', id="last-reviewed-date").text)
            #print("Title: ", soupHandler.find('h1', id="content").text)
            #print("Text: ")
            #getMainText(soupHandler)
            #print("URL: ", url)
            for li in liTags:
                #print(" - ", li.text.rstrip().lstrip())
                #print("")
                jsonList.append(json.dumps(jsonData))
            else:
                legalLinksWhite.append(y)


for z in legalLinksWhite:
    url = z
    pageUrl = requests.get(url)
    soupHandler = BeautifulSoup(pageUrl.content, 'html.parser')
    jsonData['date'] = soupHandler.find('span', id="last-reviewed-date").text
    jsonData['title'] = soupHandler.find('h1', id="content").text
    jsonData['maintext'] = getMainText(soupHandler)
    jsonData['url'] = url
    jsonData['location'] = 'USA'
    #print("Date: ", soupHandler.find('span', id="last-reviewed-date").text)
    #print("Title: ", soupHandler.find('h1', id="content").text)
    #print("Text: ")
    getMainText(soupHandler)
    aag = soupHandler.findAll('div', class_="card-body pt-0 bg-white")
    #print("URL2: ", url)
    lastDiv = aag[2:3]
    if lastDiv==[]:
        lastDiv = aag[1:]
    for i in lastDiv:
        liTags = i.find_all("li")
        if (liTags!=[]):
            for li in liTags:
                #print(" - ", li.text.rstrip().lstrip())
                jsonList.append(json.dumps(jsonData))
    #print("")

for i in jsonList:
    print(i)

print(type(jsonList[0]))
