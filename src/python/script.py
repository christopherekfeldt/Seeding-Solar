import pyrebase
import datetime
from datetime import timedelta,date,time

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
    #addPanelsPerMonth("GmUvyPwBX0dWiFawH3FGcc45P5l1")
    #removeOldPanels("nt7tE9xTNyTMfWaYSKvvypa0CIN2")
    #getAllPanels("GmUvyPwBX0dWiFawH3FGcc45P5l1")
    updateDatabase()
    #sumActivePanels("GmUvyPwBX0dWiFawH3FGcc45P5l1")
    #setActivePanels("GmUvyPwBX0dWiFawH3FGcc45P5l1")
    #monthlySumPayBack("GmUvyPwBX0dWiFawH3FGcc45P5l1")
    #getUserAccount("GmUvyPwBX0dWiFawH3FGcc45P5l1")
    #updateAccount("GmUvyPwBX0dWiFawH3FGcc45P5l1")
    #calcPanelsPerMonth("GmUvyPwBX0dWiFawH3FGcc45P5l1")
    #updateSoldPanels("GmUvyPwBX0dWiFawH3FGcc45P5l1")
    #reducedAccount("GmUvyPwBX0dWiFawH3FGcc45P5l1")


#---------------------------------------------------------------------#
def updateDatabase():
    users = db.child("users").get()
    for user in users.each():
        userId = user.key()
        removeOldPanels(userId)
        setActivePanels(userId)
        updateAccount(userId)
        updateSoldPanels(userId)
        addPanelsPerMonth(userId)
        reducedAccount(userId)

#--------GET ONE USERS ACCOUNT VALUE---------------------------------------#
def getUserAccount(userId):
    account = db.child("users").child(userId).child("account").get()
    #print (account.val())
    return account.val()


#-----------------------------------------------#
def updateAccount(userId):
    newAccount = getUserAccount(userId) + monthlySumPayBack(userId)
    db.child("users").child(userId).update({"account": newAccount})


#-----------------------------------------------#
def reducedAccount(userId):
    account = db.child("users").child(userId).child("account").get()
    costForNewPanels = calcPanelsPerMonth(userId) * costPerPanel
    account = account.val() - costForNewPanels
    account = db.child("users").child(userId).update({"account": account})

#-----------CALCULATES AND RETURN A USERS MONTLY PAYBACK ON SUNPANELS--------------#
def monthlySumPayBack(userId):
    monthlySumPayBack = sumActivePanels(userId) * paybackPerMonth
    #print (monthlySumPayBack)
    return monthlySumPayBack 
#---------------------------------------------------------------------------------#
def updateSoldPanels(userId):
    previousAmountSoldPanels = db.child("users").child(userId).child("soldPanels").get()
    soldPanels = calcPanelsPerMonth(userId) + previousAmountSoldPanels.val()
    db.child("users").child(userId).update({"soldPanels": soldPanels})

#-----------ADD PANELS TO panelsPerMonth----------------------------------------#

def addPanelsPerMonth(userId):
    panel = {"NumberOfPanels": calcPanelsPerMonth(userId), "DateOfUpdate": todaystr}
    db.child("users").child(userId).child("panelsPerMonth").push(panel)

#-------------GET ALL PANELS FOR ONE USER------------------------#

def getAllPanels(userId):
    checkpanel= db.child("users").child(userId).child("panelsPerMonth").get()
    return checkpanel

    
#-----------------SUM OF ACTIVE PANELS FOR EACH USER------------------------------#
def sumActivePanels(userId):
    sum = 0
    panels = getAllPanels(userId)
    if (panels.val() == 0):
        pass
    else:
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
    if (checkpanel.val() == 0):
        pass 
    else:    
        for eachpanel in checkpanel.each():
            panelId = eachpanel.key()
            panelDate = db.child("users").child(userId).child("panelsPerMonth").child(panelId).child("DateOfUpdate").get()
            dateOfUpdate = datetime.datetime.strptime(panelDate.val(), "%Y-%m-%d")
            #print (dateOfUpdate)
            outDated = today - timedelta(weeks=104)
            outDated = datetime.datetime.strftime(outDated, "%Y-%m-%d")
            outDated = datetime.datetime.strptime(outDated, "%Y-%m-%d")
            #print ("two years ago: ", outDated)
            if (dateOfUpdate < outDated):
                db.child("users").child(userId).child("panelsPerMonth").child(panelId).remove()

#-----------CALCULATE AMOUNT OF PANELS DEPENDING ON SIZE OF INVESTMENT----------#

def calcPanelsPerMonth(userId):
    account = getUserAccount(userId)
    numberOfNewPanels = (account/costPerPanel)
    numberOfNewPanels = int(numberOfNewPanels) #rounds up float to integer
    #print (numberOfNewPanels)
    return numberOfNewPanels
   
#------------RUNS MAIN---------------------#
main()
