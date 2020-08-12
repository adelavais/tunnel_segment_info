import clock from "clock";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import document from "document";
var puncte = document.getElementById("puncte");
var azi = document.getElementById("azi");
var myLabel = document.getElementById("myLabel");
var myLabl = document.getElementById("myLabl");
var ora11 = document.getElementById("ora11");

function clock2(){
  clock.granularity = "seconds";
  clock.ontick = (evt) => {
    
    let today = evt.date;
    var hours = today.getHours();
    
    //ora pe ceas e o diferenta de o ora
    if (preferences.clockDisplay === "12h") {
      hours = (hours) % 12 || 12;
    } else {
      hours = util.zeroPad(hours);
    }
    if (hours == 24){
      myLabel.text = `00`;
    }
    /*else if (hours == 11){
      ora11.text = `11`;
    }*/
    else{
      myLabel.text = `${hours}`;
    }
    
    //minute
    let mins = util.zeroPad(today.getMinutes());
    myLabl.text = `${mins}`;
    puncte.text = `:`;
    
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
    azi.text = `${month} ${data}`;
  }
}

export {clock2};