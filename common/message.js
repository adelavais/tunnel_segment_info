import * as messaging from "messaging";
import clock from "clock";
import document from "document";
import { vibration } from "haptics";
import { display } from "display";

var normal = document.getElementById("normal");
var accident = document.getElementById("accident");
var cutremur = document.getElementById("cutremur");
var incendiu = document.getElementById("incendiu");
var carosabil = document.getElementById("carosabil");
var traficc = document.getElementById("traficc");

//trimite cerere
function fetchtz() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) 
    messaging.peerSocket.send({
      command: 'tz'
    });
}

//prelucrare statistici
function messages(callBack2){

  messaging.peerSocket.onopen = function() {
    fetchtz();
  }

  messaging.peerSocket.onerror = function(err) {
    console.log("Connection error: " + err.code + " - " + err.message);
  }

  setInterval(fetchtz, 1 * 1000 * 60 /5);

  messaging.peerSocket.onmessage = function(evt) {
    if (evt.data != "No Wi-Fi connection"){

      var obj = JSON.parse(evt.data);

      //display on
      display.autoOff = false;
      display.on = true; 

      //setare ecran normal
      incendiu.style.visibility = "hidden";
      traficc.style.visibility= "hidden";
      carosabil.style.visibility = "hidden";
      cutremur.style.visibility = "hidden";
      accident.style.visibility = "hidden";
      incendiu.style.opacity = 0;
      carosabil.style.opacity = 0;
      cutremur.style.opacity = 0;
      accident.style.opacity = 0;
      traficc.style.opacity = 0;

      var carosabilverify = 0;
      var incendiuverify = 0;
      var traficverify = 0;

      //incendiu
      if (obj.gaz == 1){
        incendiuverify = 1;
      }

      //carosabil umed
      if (obj.umiditate == 1) {
        carosabilverify = 1;
      }

      //trafic aglomerat
      if (obj.trafic > 75){
        traficverify = 1;
      }    

      let statistics = obj;

      //initializez timer
      let timerinit = 2000;

      //avertsiment incendiu
      setTimeout(function(){
        if (obj.accident == 1){
          normal.style.visibility = "hidden";
          incendiu.style.visibility = "visible";
          incendiu.style.opacity = 1;
          vibration.start("nudge-max");
        }
      }, timerinit);

      //avertsiment cutremur
      setTimeout(function(){ 
        vibration.stop();
        incendiu.style.opacity = 0;
        incendiu.style.visibility = "hidden";
        normal.style.visibility = "visible";
        if (obj.cutremur == 1) {
          vibration.start("nudge-max");
          normal.style.visibility = "hidden";
          cutremur.style.visibility = "visible";
          cutremur.style.opacity = 1;
        }
      }, obj.timercutremur);

      //avertsiment accident
      setTimeout(function(){
        vibration.stop();
        cutremur.style.opacity = 0;
        incendiu.style.opacity = 0;
        incendiu.style.visibility = "hidden";
        cutremur.style.visibility = "hidden"; 
        normal.style.visibility = "visible";
        if (incendiuverify == 1) {
          vibration.start("nudge-max");
          normal.style.visibility = "hidden";
          accident.style.visibility = "visible";
          accident.style.opacity = 1;
        }
      }, obj.timeraccident);

      //avertisment carosabil umed
      setTimeout(function(){
        vibration.stop();
        accident.style.opacity = 0;
        cutremur.style.opacity = 0;
        incendiu.style.opacity = 0;
        incendiu.style.visibility = "hidden";
        cutremur.style.visibility = "hidden";
        accident.style.visibility = "hidden"; 
        normal.style.visibility = "visible";
        if (carosabilverify == 1) {
          vibration.start("nudge");
          normal.style.visibility = "hidden";
          carosabil.style.visibility = "visible";
          carosabil.style.opacity = 1;
        }
      }, obj.timercarosabil);

      //avertisment trafic intens
      setTimeout(function(){
        vibration.stop();
        carosabil.style.opacity = 0;
        accident.style.opacity = 0;
        cutremur.style.opacity = 0;
        incendiu.style.opacity = 0;
        incendiu.style.visibility = "hidden";
        cutremur.style.visibility = "hidden";
        accident.style.visibility = "hidden"; 
        carosabil.style.visibility = "hidden"; 
        normal.style.visibility = "visible";
        if (traficverify == 1) {
          vibration.start("nudge");
          normal.style.visibility = "hidden";
          traficc.style.visibility = "visible";
          traficc.style.opacity = 1;
        }
      }, obj.timertrafic);

      //readucere la ecranul normal
      setTimeout(function(){
        vibration.stop();
        incendiu.style.visibility = "hidden";
        normal.style.visibility = "visible";
        carosabil.style.visibility = "hidden";
        cutremur.style.visibility = "hidden";
        accident.style.visibility = "hidden";
        traficc.style.visibility = "hidden";
        traficc.style.visibility= "hidden";
        normal.style.opacity = 1;
        traficc.style.opacity = 0;
        incendiu.style.opacity = 0;
        carosabil.style.opacity = 0;
        cutremur.style.opacity = 0;
        accident.style.opacity = 0;
        traficc.style.opacity = 0;
      }, obj.timernormal); 

      //trimitere statistici
      callBack2(statistics);
    
  }
  else {
    callBack2("No Wi-Fi connection");
  }}
}

export {fetchtz,messages};