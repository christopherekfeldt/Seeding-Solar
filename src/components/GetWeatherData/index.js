import request from 'request';
import config from '../../weather/config';


let apiKey = config.apiKey;
let cityId = 184742;
let url = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`
function showWeather(){

request(url, function (err, response, body) {
    if(err){
      console.log('error:', err);
    } else {
      let weather = JSON.parse(body)
      let message = `cloud percent = ${weather.clouds.all} in ${weather.name} `;
      console.log(message);
    }
  });
}

export default showWeather;