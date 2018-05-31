import pyrebase
import time
import pyowm

#----------------FIREBASE CONECTION--------------------#
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

#-----------------GLOBAL VARIABLES----------------------#

maxSolarPanelEffect = 500 #byt ut värden mot korrekta
lighBulbEffect = 100 # 
hourlyKeroseneEmission = 4 # 

#-------INSERT FUNCTIONS HERE----------------------------------------#
def main():
    while True:
        #Will run forever with a 20 seconds delay.
        #You need to insert your own OpenWeatherMap key into pyowm.OWM('key goes here')
        #Gets the current weather and calls updateDatabase()
        owm = pyowm.OWM('eba1606aafc3aa14ec0ebc9437f939f6')
        observation = owm.weather_at_id(184742)
        weather = observation.get_weather()


        cloudPercentage = weather.get_clouds()
        cloudPercentage = (cloudPercentage/100)
        temperature = weather.get_temperature('celsius')['temp'] 
        temperature = int(temperature)

        sunriseEpoch = weather.get_sunrise_time()
        sunsetEpoch = weather.get_sunset_time()
        epochTime = time.time()
        epochTime = int(epochTime)

        updateDatabase(epochTime, sunriseEpoch, sunsetEpoch, cloudPercentage, temperature)
        time.sleep(20)
#--------------------------------------------------------#
#Calls the function updateReducedCO2 for every single user
def updateDatabase(epochTime, sunriseEpoch, sunsetEpoch, cloudPercentage, temperature):
    users = db.child("users").get()
    for user in users.each():
        userId = user.key()
        updateReducedCO2(userId, epochTime, sunriseEpoch, sunsetEpoch, cloudPercentage, temperature)
#--------------------------------------------------------#
#Desides what effect the solar panel has.
#First it checks if it is night and returns zero effect if it is.
#If it is day, the effect depends on cloud percentage and temperature
def getSolarPanelEffect(epochTime, sunriseEpoch, sunsetEpoch, cloudPercentage, temperature):
    effect = 0
    if (epochTime < sunriseEpoch or epochTime > sunsetEpoch):
        pass
    else:
        if (cloudPercentage <= 0.25):
            effect = (1 - temperatureEffect(temperature)) * maxSolarPanelEffect
        elif (cloudPercentage > 0.25 and cloudPercentage <= 0.5):
            effect = (0.5 - temperatureEffect(temperature)) * maxSolarPanelEffect
        elif (cloudPercentage > 0.5 and cloudPercentage <= 0.75): 
            effect = (0.25 - temperatureEffect(temperature)) * maxSolarPanelEffect
        else: 
            effect = (0.1 - temperatureEffect(temperature)) * maxSolarPanelEffect
    return effect
#--------------------------------------------------------#
#If the temperature is over 25 C, returns the effect loss of a solar panel
def temperatureEffect(temperature):
    if (temperature <= 25):
        return 0
    else: 
        return 0.005 * (temperature - 25)


#--------------------------------------------------------#
#Multiplies the amount of solar panels for one user with the current effect of a solar panel
def getUserTotalEffect(userId, epochTime, sunriseEpoch, sunsetEpoch, cloudPercentage, temperature):
    active =  db.child("users").child(userId).child("activePanels").get()

    getTotalEffect = active.val() * getSolarPanelEffect(epochTime, sunriseEpoch, sunsetEpoch, cloudPercentage, temperature)
    return getTotalEffect
#--------------------------------------------------------#
#Compares the energy from one users solar panels with the energy from a light bulb to get the time
def hoursOfLightBulb(userId, epochTime, sunriseEpoch, sunsetEpoch, cloudPercentage, temperature):
    totalEffect = getUserTotalEffect(userId, epochTime, sunriseEpoch, sunsetEpoch, cloudPercentage, temperature)
    hoursOfLight = totalEffect/lighBulbEffect
    return hoursOfLight
#--------------------------------------------------------#
#Gets the time from a light buld and multiplies it with the Kerosene emission
def reducedEmissions(userId, epochTime, sunriseEpoch, sunsetEpoch, cloudPercentage, temperature):
    reducedEmission = hoursOfLightBulb(userId, epochTime, sunriseEpoch, sunsetEpoch, cloudPercentage, temperature) * hourlyKeroseneEmission

    return reducedEmission
#--------------------------------------------------------#
#Updates the reduced carbon dioxide for the user in the database
def updateReducedCO2(userId, epochTime, sunriseEpoch, sunsetEpoch, cloudPercentage, temperature):
    oldValue =  db.child("users").child(userId).child("reducedCO2").get()
    newValue = oldValue.val() + reducedEmissions(userId, epochTime, sunriseEpoch, sunsetEpoch, cloudPercentage, temperature)
    db.child("users").child(userId).update({"reducedCO2": newValue})

#------------RUNS MAIN---------------------#
main()