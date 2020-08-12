import clock from "clock";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import document from "document";
var puncte2 = document.getElementById("puncte2");
var azi2 = document.getElementById("azi2");
var myLabel2 = document.getElementById("myLabel2");
var myLabl2 = document.getElementById("myLabl2");
var ora112 = document.getElementById("ora112");
var nowifi = document.getElementById("nowifi");

function clock2(){
  clock.granularity = "seconds";
  clock.ontick = (evt) => {
    
    let today = evt.date;
    var hours = today.getHours();
    
    //ora
    if (preferences.clockDisplay === "12h") {
      hours = (hours) % 12 || 12;
    } else {
      hours = util.zeroPad(hours);
    }
    
    //minute
    let mins = util.zeroPad(today.getMinutes());
    myLabl2.text = `${hours}:${mins}`;
    
    //luna si data
    let month = today.getMonth()+1;
    if (month === 1){
      month = 'IANUARIE';
    }
    else if (month === 2){
      month = 'FEBRUARIE';
    }
    else if (month === 3){
      month = 'MARTIE';
    }
    else if (month === 4){
      month = 'APRILIE';
    }
    else if (month === 5){
      month = 'MAI';
    }
    else if (month === 6){
      month = 'IUNIE';
    }
    else if (month === 7){
      month = 'IULIE';
    }
    else if (month === 8){
      month = 'AUGUST';
    }
    else if (month === 9){
      month = 'SEPTEMBRIE';
    }
    else if (month === 10){
      month = 'OCTOMBRIE';
    }
    else if (month === 11){
      month = 'NOIEMBRIE';
    }
    else if (month === 12){
      month = 'DECEMBRIE';
    }
    let data = util.zeroPad(today.getDate());
    azi2.text = `${month} ${data}`;
    nowifi.text = "No Wi-Fi connection";
  }
}

export {clock2};