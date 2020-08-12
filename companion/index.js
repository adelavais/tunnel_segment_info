import * as messaging from "messaging";

// preluarea datelor din json
function urlprocessing(x){
  console.log(x);
  return fetch(x)
    .then(function(response) {
        return response.json(); 
    })
    .catch(function (error) {
        console.error(`Fetch Error =\n`, error)
    })
    .then(function(myJson) {
        console.log(myJson);
        if (myJson != undefined && myJson != null){
          var dateletz = [];
          dateletz[0] = myJson.nrMasini;
          dateletz[1] = myJson.viteza;
          dateletz[2] = myJson.temperatura;
          dateletz[3] = myJson.incendiu;
          dateletz[4] = myJson.umiditate;
          dateletz[5] = myJson.cutremur;
          dateletz[6] = myJson.drumBlocat; 
          return dateletz;
        }
        else {
          let errormessage = "No Wi-Fi connection";
          return  errormessage;
        }
        
  })
}


function queryStat() {
  var datele = [];
  urlprocessing('http://192.168.30.22:3001')
    .then(function(statistici) {
      console.log(statistici);
      if (statistici != "No Wi-Fi connection") {
        var carosabilverify = 0
        var incendiuverify = 0
        var traficverify = 0
//console.log("e ceva gresit aici");
        //incendiu
        if (statistici[3] == 1){
          incendiuverify = 1
        }

        //carosabil umed
        if (statistici[4] == 1) {
          carosabilverify = 1
        }

        //trafic aglomerat
        if (statistici[0] > 75){
          traficverify = 1
        }

        //initializare timere
        var timerinit = 2000;
        var timercutremur1 = 5000 + timerinit;
        var timeraccident1 = 10000 + timerinit;
        var timercarosabil1 = 15000 + timerinit;
        var timertrafic1 = 20000 + timerinit;
        var timernormal1 = 25000 + timerinit;

        //nu exista incendiu
        if (statistici[6] != 1){ ////
          timercutremur1 = timercutremur1 - 5000;
          timeraccident1 = timeraccident1 - 5000;
          timercarosabil1 = timercarosabil1 - 5000;
          timertrafic1 = timertrafic1 - 5000;
          timernormal1 = timernormal1 - 5000;
        }

        //nu exista cutremur
        if (statistici[5] != 1){
          timeraccident1 = timeraccident1 - 5000;
          timercarosabil1 = timercarosabil1 - 5000;
          timertrafic1 = timertrafic1 - 5000;
          timernormal1 = timernormal1 - 5000;
        }

        //nu exista accident
        if (incendiuverify != 1){ //////
          timercarosabil1 = timercarosabil1 - 5000;
          timertrafic1 = timertrafic1 - 5000;
          timernormal1 = timernormal1 - 5000;
        }

        //nu exista carosabil umed
        if (carosabilverify != 1){
           timertrafic1 = timertrafic1 - 5000;
           timernormal1 = timernormal1 - 5000;
       }

       //nu exista aglomeratie 
       if (traficverify != 1){
          timernormal1 = timernormal1 - 5000;
       }

       //stats
       let datele2 = {
         trafic: statistici[0],
         luminozitate: statistici[1],
         temperatura: statistici[2],
         gaz: statistici[3],
         umiditate: statistici[4],
         cutremur: statistici[5],
         accident: statistici[6],
         timerincendiu: timerinit,
         timercutremur: timercutremur1,
         timeraccident: timeraccident1,
         timercarosabil: timercarosabil1,
         timertrafic: timertrafic1,
         timernormal: timernormal1
       }

       console.log(datele2)
       datele2 = JSON.stringify(datele2)
       sendStatData(datele2)
     }
     else {
       let datele2 = statistici;
       sendStatData(datele2);
     }
  });
}


function sendStatData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } 
  else {
    console.log("Error: Connection is not open");
  }
}


messaging.peerSocket.onmessage = function(evt) {
  if (evt.data && evt.data.command == "tz") {
    queryStat();
  }
}


messaging.peerSocket.onerror = function(err) {
  console.log("Connection error: " + err.code + " - " + err.message);
}


messaging.peerSocket.onopen = function() {
  sendMessage(); 
}


messaging.peerSocket.onerror = function(err) {
  console.log("Connection error: " + err.code + " - " + err.message);
}


function sendMessage() {
  var data = queryStat();
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}
