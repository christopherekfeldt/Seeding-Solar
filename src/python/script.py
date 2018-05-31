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

db = firebase.database() 
#------------GLOBAL VARIABLES--------------------------#
intrest = 1.08
costPerPanel = 54
paybackTime = 18 #18 months
paybackPerMonth = (costPerPanel/paybackTime)
#------------------------------------------------------#


#-------INSERT FUNCTIONS HERE----------------------------------------#
def main():
    while True:
    #----TIME---------------#
    today = datetime.date.today()
    todaystr = today.strftime("%Y-%m-%d")
    
    updateDatabase(today, todaystr)
    time.sleep(120)
    
#---------------------------------------------------------------------#
#Updates the database for each user
def updateDatabase(today, todaystr):
    users = db.child("users").get()
    for user in users.each():
        userId = user.key()
        removeOldPanels(userId, today)
        updateAccount(userId, today)
        updateSoldPanels(userId)
        addPanelsPerMonth(userId, todaystr)
        setActivePanels(userId)
        reducedAccount(userId)

#--------GET ONE USERS ACCOUNT VALUE---------------------------------------#
def getUserAccount(userId):
    account = db.child("users").child(userId).child("account").get()
    #print (account.val())
    return account.val()


#-----------------------------------------------#
#Adds the montly payback from hoseholds to the users "account"
def updateAccount(userId, today):
    newAccount = getUserAccount(userId) + monthlySumPayBack(userId, today)
    db.child("users").child(userId).update({"account": newAccount})


#-----------------------------------------------#
#Reduces the users account based on how many solar panels the user can afford this month
def reducedAccount(userId):
    account = db.child("users").child(userId).child("account").get()
    costForNewPanels = calcPanelsPerMonth(userId) * costPerPanel
    account = account.val() - costForNewPanels
    account = db.child("users").child(userId).update({"account": account})

#-----------CALCULATES AND RETURN A USERS MONTLY PAYBACK ON SUNPANELS--------------#
def monthlySumPayBack(userId, today):
    int monthlySumPayBack = sumActivePanels(userId, today) * paybackPerMonth * intrest 
    return monthlySumPayBack 
#---------------------------------------------------------------------------------#
#Updates the total ammount of sold panels for the user in the database
def updateSoldPanels(userId):
    previousAmountSoldPanels = db.child("users").child(userId).child("soldPanels").get()
    soldPanels = calcPanelsPerMonth(userId) + previousAmountSoldPanels.val()
    db.child("users").child(userId).update({"soldPanels": soldPanels})

#-----------ADD PANELS TO panelsPerMonth----------------------------------------#

def addPanelsPerMonth(userId, todaystr):
    panelsPerMonth = calcPanelsPerMonth(userId)
    if (panelsPerMonth == 0):
        pass
    else:
        panel = {"numberOfPanels": panelsPerMonth, "dateOfUpdate": todaystr}    
        db.child("users").child(userId).child("panelsPerMonth").push(panel)

#-------------GET ALL PANELS FOR ONE USER------------------------#

def getAllPanels(userId):
    checkpanel= db.child("users").child(userId).child("panelsPerMonth").get()
    return checkpanel

    
#-----------------SUM OF ACTIVE PANELS FOR EACH USER ON MONTHLY PAYBACK------------------------------#
def sumActivePanels(userId, today):
    sum = 0
    outDated = today - timedelta(weeks=78)
    outDated = datetime.datetime.strftime(outDated, "%Y-%m-%d")
    outDated = datetime.datetime.strptime(outDated, "%Y-%m-%d")
    panels = getAllPanels(userId)
    if (panels.val() == 0):
        pass
    else:
        for eachMonth in panels.each():
            panelId = eachMonth.key()
            date = db.child("users").child(userId).child("panelsPerMonth").child(panelId).child("dateOfUpdate").get()
            dateOfUpdate = datetime.datetime.strptime(date.val(), "%Y-%m-%d")
            if(dateOfUpdate < outDated):
                pass
            else:
                numberOfPanels = db.child("users").child(userId).child("panelsPerMonth").child(panelId).child("numberOfPanels").get()
                sum = sum + numberOfPanels.val()
        
    return sum

#--------------SETS activePanels FOR CARBON EMISSION-----------------------#
def setActivePanels(userId):
    sum = 0
    panels = getAllPanels(userId)
    for eachMonth in panels.each():
        panelId = eachMonth.key()
        test = db.child("users").child(userId).child("panelsPerMonth").child(panelId).child("numberOfPanels").get()
        sum = sum + test.val()
    
        db.child("users").child(userId).update({"activePanels": sum})    


#-------------ITERATE THROUGH AND REMOVE ALL OUTDATED PANELS------------------------#

def removeOldPanels(userId, today):
    
    checkpanel = getAllPanels(userId)
    if (checkpanel.val() == 0):
        pass 
    else:    
        for eachpanel in checkpanel.each():
            panelId = eachpanel.key()
            panelDate = db.child("users").child(userId).child("panelsPerMonth").child(panelId).child("dateOfUpdate").get()
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
