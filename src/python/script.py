import pyrebase
import datetime
from datetime import timedelta,date,time


#import json

#class DateTimeEncoder(json.JSONEncoder):
 #   def default(self, o):
  #      if isinstance(o, datetime):
   #         return o.isoformat()
#
 #       return json.JSONEncoder.default(self, o)

#----------------FIREBASE KOPPLING--------------------#
config = {
  "apiKey": "AIzaSyDPj0BZVQebAYww_VUFXhbEXPP-n2gq120",
  "authDomain": "seeding-solar.firebaseapp.com",
  "databaseURL": "https://seeding-solar.firebaseio.com",
  "projectId": "seeding-solar",
  "storageBucket": "seeding-solar.appspot.com",
  "messagingSenderId": "1066950282834"
}
firebase = pyrebase.initialize_app(config)
#------------------------------------------------------# 
#-------------TIMESTAMP--------------------------------#
today = datetime.date.today()
todaystr = today.strftime("%Y-%m-%d")

#------------------------------------------------------#

db = firebase.database() 
#------------GLOBAL VARIABLES--------------------------#

costPerPanel = 54
paybackTime = 18 #18 months
paybackPerMonth = (costPerPanel/paybackTime)
#------------------------------------------------------#


#-------INSERT FUNCTIONS HERE----------------------------------------#
def main():
    
    #getAccounts()
    #getPanelsPerMonth()
    #print(users.val())
    #calcPanelsPerMonth()
    #addPanelsPerMonth()
    #removeOldPanels(userId)
    #getAllPanels("GmUvyPwBX0dWiFawH3FGcc45P5l1")
    #updateDatabase()
    #sumActivePanels("GmUvyPwBX0dWiFawH3FGcc45P5l1")
    #setActivePanels("GmUvyPwBX0dWiFawH3FGcc45P5l1")
    #monthlySumPayBack("GmUvyPwBX0dWiFawH3FGcc45P5l1")
    getUserAccount("GmUvyPwBX0dWiFawH3FGcc45P5l1")

#---------------------------------------------------------------------#

#--------GET ALL ACCOUNT VALUES---------------------------------------#
def getAccounts():
    users = db.child("users").get()
    for user in users.each():
        userId = user.key()
        account = db.child("users").child(userId).child("account").get()
        print( account.val() )

#--------GET ONE USERS ACCOUNT VALUE---------------------------------------#
def getUserAccount(userId):
    account = db.child("users").child(userId).child("account").get()
    print (account.val())
    return account


#-----------------------------------------------#
#def updateAccount():


#-----------CALCULATES AND RETURN A USERS MONTLY PAYBACK ON SUNPANELS--------------#
def monthlySumPayBack(userId):
    monthlySumPayBack = sumActivePanels(userId) * paybackPerMonth
    print (monthlySumPayBack)
    return monthlySumPayBack 

#-----------ADD PANELS TO panelsPerMonth----------------------------------------#

def addPanelsPerMonth():
    users = db.child("users").get()
    for user in users.each():
        userId = user.key()
        #panels första värde skall uppdateras med värdet ifrån calcPanelsPerMonth()
        panel = {"NumberOfPanels": 100, "DateOfUpdate": todaystr}
        db.child("users").child(userId).child("panelsPerMonth").push(panel)

#-------------------------------------#
def updateDatabase():
    users = db.child("users").get()
    for user in users.each():
        userId = user.key()
        removeOldPanels(userId)
#-------------------------------------#
def getUserId():
    users = db.child("users").get()
    for user in users.each():
        userId = user.key()
        return userId
#-------------GET ALL PANELS FOR ONE USER------------------------#

def getAllPanels(userId):
    checkpanel= db.child("users").child(userId).child("panelsPerMonth").get()
    return checkpanel

    
#-----------------SUM OF ACTIVE PANELS FOR EACH USER------------------------------#
def sumActivePanels(userId):
    sum = 0
    panels = getAllPanels(userId)
    for eachMonth in panels.each():
        panelId = eachMonth.key()
        test = db.child("users").child(userId).child("panelsPerMonth").child(panelId).child("NumberOfPanels").get()
        sum = sum + test.val()
    
    return sum

#--------------SETS activePanels FOR EACH USER-----------------------#
def setActivePanels(userId):
    activePanels = sumActivePanels(userId)
    db.child("users").child(userId).update({"activePanels": activePanels})    

#-------------ITERATE THROUGH AND REMOVE ALL OUTDATED PANELS------------------------#

def removeOldPanels(userId):
    checkpanel = getAllPanels(userId)
    for eachpanel in checkpanel.each():
        panelId = eachpanel.key()
        panelDate = db.child("users").child(userId).child("panelsPerMonth").child(panelId).child("DateOfUpdate").get()
        dateOfUpdate = datetime.datetime.strptime(panelDate.val(), "%Y-%m-%d")
        print (dateOfUpdate)
        outDated = today - timedelta(weeks=104)
        outDated = datetime.datetime.strftime(outDated, "%Y-%m-%d")
        outDated = datetime.datetime.strptime(outDated, "%Y-%m-%d")
        print ("two years ago: ", outDated)
        if (dateOfUpdate < outDated):
            db.child("users").child(userId).child("panelsPerMonth").child(panelId).remove()

#-----------CALCULATE AMOUNT OF PANELS DEPENDING ON SIZE OF INVESTMENT----------#

#def calcPanelsPerMonth():
 #   removeOldPanels()
  #  account = getAccounts()

   # print (account.val())
#------------RUNS MAIN---------------------#
main()
