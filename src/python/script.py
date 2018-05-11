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

#------------------------------------------------------#

db = firebase.database() 
#------------------------------------------------------#

users = db.child("users").get()

#-------INSERT FUNCTIONS HERE----------------------------------------#
def main():
    #getAccounts()
    #getPanelsPerMonth()
    #print(users.val())
    #calcPanelsPerMonth()
    addPanelsPerMonth()
    #removeOldPanels()
#---------------------------------------------------------------------#

#--------GET ALL ACCOUNT VALUES---------------------------------------#
def getAccounts():
    users = db.child("users").get()
    for user in users.each():
        userId = user.key()
        account = db.child("users").child(userId).child("account").get()
        print( account.val() )

#-----------ADD PANELS TO panelsPerMonth----------------------------------------#

def addPanelsPerMonth():
    

    users = db.child("users").get()
    for user in users.each():
        userId = user.key()
        #panels första värde skall uppdateras med värdet ifrån calcPanelsPerMonth()
        panel = {"NumberOfPanels": "100", "DateOfUpdate": today}
        db.child("users").child(userId).child("panelsPerMonth").push(panel)

#-------------ITERATE THROUGH AND REMOVE ALL OUTDATED PANELS------------------------#


def removeOldPanels():
    users = db.child("users").get()
    for user in users.each():
        userId = user.key()
        checkpanel= db.child("users").child(userId).child("panelsPerMonth").get()
        for eachpanel in checkpanel.each():
            panelId = eachpanel.key()
            panelDate = db.child("users").child(userId).child("panelsPerMonth").child(panelId).child("date").get()
            print (panelDate.val())
            outDated = today - timedelta(weeks=104)
            print ("two years ago: ", outDated)
            #if panelDate.val() < outDated
                #db.child("users").child(userId).child("panelsPerMonth").child(panelId).remove()

        #print (checkpanel.val())
           
#-----------CALCULATE AMOUNT OF PANELS DEPENDING ON SIZE OF INVESTMENT----------#

#def calcPanelsPerMonth():
    #removeOldPanels()
    #getAccounts()

    #print (account.val())
#------------RUNS MAIN---------------------#
main()