from bs4 import BeautifulSoup
import requests
import re
import os
import json
from firestore_client import FireStore_Client
from datetime import datetime

firestoreClient = FireStore_Client()

#List of python list of all the json data (Each jsonData is a individual report and its corresponding data)
jsonList = []

#Returns True if the page uses "Reported Cases", else it uses "Case Count"
def RcChecker(soupHandler):
    aag=soupHandler.findAll('div', class_="card-body bg-tertiary")
    reportedCaseFilter = re.compile(".*Reported Cases.*")
    lastDiv = aag[1:-1]
    if lastDiv==[]:
        lastDiv = aag[1:]
    for i in lastDiv:
        liTags = i.find_all("li")
        if (liTags!=[]):
            for li in liTags:
                if (reportedCaseFilter.match(li.text.rstrip().lstrip())):
                    return True
            return False

#Return the main report content of the page (I.E As of March 19, 2020 there has been a large influx of...)
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

#Requests the salmonella general outbreak page
page = requests.get("https://www.cdc.gov/salmonella/outbreaks.html")

#Parse the page into HTML to be scraped
soup = BeautifulSoup(page.content, 'html.parser')

# Looks for all the links that starts with /salmonella
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

#All links which has the "At a glance box"
legalLinks = []

#All the links which has the "At a glance box" but uses a different class type
legalLinksWhite = []

#Filter all links for those with "At a glance" boxes
for y in filterALinks:
    url = "https://www.cdc.gov" + y
    page1 = requests.get(url)
    soupHandler = BeautifulSoup(page1.content, 'html.parser')
    aag = soupHandler.findAll('div', text="At A Glance")
    if (aag != []):
        legalLinks.append(url)

hospitalFilter = re.compile(".*Hospitalizations: .*")
deathFilter = re.compile(".*Deaths: .*")
rcCcFilter = re.compile(".*(Reported Cases: |Case Count: ).*")

#Goes through all legal links
for y in legalLinks:
    jsonData = {}
    #jsonDataInt = {}
    pageUrl = requests.get(y)
    soupHandler = BeautifulSoup(pageUrl.content, 'html.parser')

    aag = soupHandler.findAll('div', class_="card-body bg-tertiary")
    #print("URL: ", y)
    lastDiv = aag[1:2]
    
    if lastDiv==[]:
        lastDiv = aag[1:]
    for i in lastDiv:
        liTags = i.find_all("li")
        if (liTags!=[]):
            #print("URL: ", y)
            jsonData['date'] = soupHandler.find('span', id="last-reviewed-date").text.lstrip().rstrip()
            jsonData['title'] = soupHandler.find('h1', id="content").text.lstrip().rstrip()
            jsonData['maintext'] = getMainText(soupHandler)
            jsonData['url'] = y
            jsonData['location'] = 'USA'

            #jsonList.append(json.dumps(jsonData))

            #print("Date: ", soupHandler.find('span', id="last-reviewed-date").text)
            #print("Title: ", soupHandler.find('h1', id="content").text)
            #print("Text: ")
            #getMainText(soupHandler)
            #print("URL: ", url)
            
            for li in liTags:
                if(hospitalFilter.match(li.text.rstrip().lstrip())):
                    splitter = li.text.rstrip().lstrip().split(": ")
                    #print("Hospital Filter Val: ", splitter[1])
                    jsonData["hospital"] = splitter[1] 
                elif (deathFilter.match(li.text.rstrip().lstrip())):
                    splitter = li.text.rstrip().lstrip().split(": ")
                    #print("Death Filter Val: ", splitter[1])
                    jsonData["death"] = splitter[1] 
                elif(rcCcFilter.match(li.text.rstrip().lstrip())):
                    splitter = li.text.rstrip().lstrip().split(": ")
                    #print("RcCc Filter Val: ", splitter[1])
                    jsonData["rcCc"] = splitter[1] 
                    #print(" - ", li.text.rstrip().lstrip())

                #print("")
                #jsonList.append(json.dumps(jsonData))
                pass
            jsonList.append(json.dumps(jsonData))
        else:
            legalLinksWhite.append(y) #All the white "At a glance box" class

    

# Goes through all the legal links with white class box and retreive the required data
for z in legalLinksWhite:
    jsonData = {}
    url = z
    pageUrl = requests.get(url)
    soupHandler = BeautifulSoup(pageUrl.content, 'html.parser')

    jsonData['date'] = soupHandler.find('span', id="last-reviewed-date").text.lstrip().rstrip()
    jsonData['title'] = soupHandler.find('h1', id="content").text.lstrip().rstrip()
    jsonData['maintext'] = getMainText(soupHandler)
    jsonData['url'] = url
    jsonData['location'] = "USA"

    #jsonList.append(json.dumps(jsonData))

    #print("Date: ", soupHandler.find('span', id="last-reviewed-date").text)
    #print("Title: ", soupHandler.find('h1', id="content").text)
    #print("Text: ")
    #getMainText(soupHandler)
    aag = soupHandler.findAll('div', class_="card-body pt-0 bg-white")
    #print("URL2: ", url)
    lastDiv = aag[2:3]
    if lastDiv==[]:
        lastDiv = aag[1:]
    for i in lastDiv:
        liTags = i.find_all("li")
        if (liTags!=[]):
            for li in liTags:
                if(hospitalFilter.match(li.text.rstrip().lstrip())):
                    splitter = li.text.rstrip().lstrip().split(": ")
                    jsonData["hospital"] = splitter[1] 
                    #print("Hospital Filter Val: ", splitter[1])
                elif (deathFilter.match(li.text.rstrip().lstrip())):
                    splitter = li.text.rstrip().lstrip().split(": ")
                    jsonData["death"] = splitter[1] 
                    #print("Death Filter Val: ", splitter[1])
                elif(rcCcFilter.match(li.text.rstrip().lstrip())):
                    splitter = li.text.rstrip().lstrip().split(": ")
                    jsonData["rcCc"] = splitter[1] 
                    #print("RcCc Filter Val: ", splitter[1])

    jsonList.append(json.dumps(jsonData))
                #pass
                #print(" - ", li.text.rstrip().lstrip())
                #jsonList.append(json.dumps(jsonData))
    #print("")

#DEBUG Prints out the json list
#print("Here")
#write_article_auto_id(self, url: str, headline: str, main_text: str, date_of_publication: datetime) -> str:
for i in jsonList:
    jsonPoint = json.loads(i)
    #article_id = firestoreClient.write_article_auto_id(jsonPoint["url"],jsonPoint["title"],jsonPoint["maintext"],(datetime.strptime(jsonPoint['date'], "%B %d, %Y")))
    #str(datetime.strptime(soupHandler.find('span', id="last-reviewed-date").text.lstrip().rstrip(), "%B %d, %Y"))
    #write_report_auto_id(self, article_id: str, disease_id: str, location: str, event_date: datetime, reported_cases: int = None, hospitalisations: int = None, deaths: int = None) -> str:
    #print(str(datetime.strptime(jsonPoint.get('date'), "%B %d, %Y")))
    #print(jsonPoint.get('title'))
    #print(jsonPoint.get('maintext'))
    #print(jsonPoint.get('url'))
    #print(jsonPoint.get('location'))
    #print(jsonPoint.get('hospital'))
    #print(jsonPoint.get('death'))
    #print(jsonPoint.get('rcCc'))
    article_id = firestoreClient.write_article_auto_id(jsonPoint.get('url'),jsonPoint.get('title'),jsonPoint.get('maintext'),(datetime.strptime(jsonPoint.get('date'), "%B %d, %Y")))
    firestoreClient.write_report_auto_id(article_id, "777d1c109f5eef1d64c418062a918d33",jsonPoint.get('location'),(datetime.strptime(jsonPoint.get('date'), "%B %d, %Y")),jsonPoint.get('rcCc'),jsonPoint.get('hospital'),jsonPoint.get('death'))
    #print("")

