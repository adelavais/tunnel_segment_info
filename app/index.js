import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as mess from "../common/message";
import * as clk from "../common/ceas";
import * as clk2 from "../common/ceas2";
import { display } from "display";

var trafictext = document.getElementById("trafictext");
var temperaturatext = document.getElementById("temperaturatext");
var luminozitatetext = document.getElementById("luminozitatetext");
var normal = document.getElementById("normal");
var accident = document.getElementById("accident");
var cutremur = document.getElementById("cutremur");
var incendiu = document.getElementById("incendiu");
var carosabil = document.getElementById("carosabil");
var myRect0 = document.getElementById("myRect0");
var myRect1 = document.getElementById("myRect1");
var traficc = document.getElementById("traficc");
var nodata = document.getElementById("nodata");

//cerere update avertismente
 myRect0.onclick = function() {
    console.log("click");
    mess.fetchtz();
  }
  
 myRect1.onclick = function() {
    console.log("click");
    mess.fetchtz();
  }
 
//display always on
display.autoOff = false;
display.on = true; 
 
//afisare statistici api
mess.messages(function(statistici){ 
  
  //am net 
  if (statistici != "No Wi-Fi connection"){
    
    //setare ecran normal
    incendiu.style.visibility = "hidden";
    normal.style.visibility = "visible";
    carosabil.style.visibility = "hidden";
    cutremur.style.visibility = "hidden";
    accident.style.visibility = "hidden";
    traficc.style.visibility= "hidden";
    nodata.style.opacity = 0;
    nodata.style.visibility = "hidden";
    normal.style.opacity = 1;
    incendiu.style.opacity = 0;
    carosabil.style.opacity = 0;
    cutremur.style.opacity = 0;
    accident.style.opacity = 0;
    traficc.style.opacity = 0;

    //afisare pe ecran
    console.log(statistici.trafic);
    trafictext.text = `${statistici.trafic}`;
    temperaturatext.text = `${statistici.temperatura}`;
    luminozitatetext.text = `${statistici.luminozitate}`;
    
    //ceas
    clock.granularity = "seconds";
    clock.ontick = (evt) => {
      clk.clock2(function(){
      }) 
    }   
  }
  //nu am net
  else {
    //setare ecran nodata
    incendiu.style.visibility = "hidden";
    normal.style.visibility = "hidden";
    carosabil.style.visibility = "hidden";
    cutremur.style.visibility = "hidden";
    accident.style.visibility = "hidden";
    traficc.style.visibility= "hidden";
    nodata.style.opacity = 1;
    nodata.style.visibility = "visible";
    normal.style.opacity = 0;
    incendiu.style.opacity = 0;
    carosabil.style.opacity = 0;
    cutremur.style.opacity = 0;
    accident.style.opacity = 0;
    traficc.style.opacity = 0;
    
    //ceas
    clock.granularity = "seconds";
    clock.ontick = (evt) => {
      clk2.clock2(function(){
      }) 
    }
  }
})