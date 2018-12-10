var express = require('express')
var request = require('request') // Importerar request modul för att kunna göra request genom och få tillgång till data
var app = express();
var bodyParser = require('body-parser');
app.use(express.static('public')); // För att kunna få access till bilder/filer etc
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended : true}));
var city = 'Gothenburg'; // Gör en variabel som är Gothenburg som standard om ingen annan har skrivit in i form

var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4e744982e76bfbbe2a0cd0a2a54e4155`; // URL för att hämta data med en variabel city för att kunna hämta olika städer

/** Gör en request och hämtar data och skickar över datan till vår template pug fil */
app.get('/', function(req, res){
    
    request(url, function(error, response, body) {
       weather_json = JSON.parse(body) // Gör om datan från JSON till Javascript och gör sen 
       var weather = {
        city : city,
        tempature :  Math.round(weather_json.main.temp),
        description : weather_json.weather[0].description,
        icon : weather_json.weather[0].icon
    };
   var weather_data = {weather : weather}; 
   

     
      res.render('get_form', weather_data) // Kör template filen och skickar över weather_data variabel till vår get_form.pug så vi kan använda och skriva ut den data vi vill
    });

 });

 /** Funktion för att genom formulär skriva in och få data från specifik stad */
app.post('/', function(req, res){
   
    var city = req.body.city_name; // Hämtar namnet på staden från formulä
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4e744982e76bfbbe2a0cd0a2a54e4155`; // Skriver om url variabel med ny city varibel från formulär

    /** Gör en ny request med ny city variabel för att få data för den specifika staden */
    request(url, function(error, response, body) {
        weather_json = JSON.parse(body)
        var weather = {
         city : city,
         tempature :  Math.round(weather_json.main.temp),
         description : weather_json.weather[0].description,
         icon : weather_json.weather[0].icon
     };
    var weather_data = {weather : weather}; 
    res.render('get_form', weather_data) // Kör template igen för att uppdatera datan vi fått med en ny city variabel


});
});



app.listen(3000);