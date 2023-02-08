# Weather_WebApp
Okay so my main objective for making this project was to get Hands-on experience with API callbacks , endpoint utilization , querySelector , promises and event listener in javascript 
firstly i coded a static html webpage and styled it accordingly to create a simple interface 

then i created a .js file which would store my internals of script which is interlinked with html element

then i went to https://openweathermap.org/ to signup for their free and fair usage of Open weather API
got the base url from the web and my private key 

in the script.js file i proceeded to declare the Api components for accessibility
created an eventlistener for searchbox input element of querytype 'key press' which would trigger the event => of an if statement 
of whether or not the enter key had been pressed , 13 being the keycode of enter key 
which would basically set off all of the functions inside of it 

which includes getResult function which specially utilises API callback using base url , private api key and the query which is the value  detected in the searchbox element and returns the weather.json file which contains all the weather meta data of the location query 

this function using (then) keyword sets off the displayresults function which replaces the stringd in the html elements according to the reference variables present in the weather.json file 

extra function of getting current date/day/month/year is also present.

using the geocoding api i converted the city name to corresponding lattitude and longitude coordinates

then by using timezonedb api and the respetive lattitude and longitude i was able to pinpoint and calculate the current time in the city

also added newsfetching function which displays headlines , description and corresponding image of that news
thing to be displayed 
note: news is only filtered according to country and not city 
