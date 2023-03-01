window.onload = (event) => {
    
  console.log('page is fully loaded');
  
  var mqtt;
  var connected_flag      =  0	
  var reconnectTimeout    = 2000;  
  var pubtopic            = "620148150_lab3";       //Replace with your ID number ex. 620012345_lab3  
  var subtopic            = "620148150";            //Replace with your ID number ex. 620012345. MQTT topic for subscribing to
  var host                = "www.yanacreations.com";  // MQTT HOST
  var port                = 8883;                     // MQTT Port
  var var1 =0;
  var var2 =0;
  var var3 =0;
  var var4 =0;
  var var5 =0;
  var var6 =0;
  var elevationData = [ ];
  let start = document.querySelector("#start");
  let end = document.querySelector("#end");
  let plotBtn = document.querySelector("#qhe");
  let limit = 10;


  
  /* HTML ELEMENT SELECTORS */
  // Query selector objects used to manipulate HTML elements
  let printMessage        = document.querySelector("#messages");          // Query by HTML Element's id. Select <div> element
  let printStatus         = document.querySelector("#status"); 

  let kitchenCard         = document.querySelector(".kitchen > p");       // Query by HTML class & element type. Select <p> element
  let kitchenCardBtn      = document.querySelector(".kitchen > button");  // Query by HTML class & element type. Select <button> element
  let kitchenCardImg      = document.querySelector(".kitchen > img");
  
  let livingroomCard         = document.querySelector(".livingroom > p");       // Query by HTML class & element type. Select <p> element
  let livingroomCardBtn      = document.querySelector(".livingroom > button");
  let livingroomCardImg      = document.querySelector(".livingroom > img");
  
  let bedroomCard         = document.querySelector(".bedroom > p");       // Query by HTML class & element type. Select <p> element
  let bedroomCardBtn      = document.querySelector(".bedroom > button");
  let bedroomCardImg      = document.querySelector(".bedroom > img");
  
  let bathroomCard         = document.querySelector(".bathroom > p");       // Query by HTML class & element type. Select <p> element
  let bathroomCardBtn      = document.querySelector(".bathroom > button");
  let bathroomCardImg      = document.querySelector(".bathroom > img");
  
  let studyroomCard         = document.querySelector(".studyroom > p");       // Query by HTML class & element type. Select <p> element
  let studyroomCardBtn      = document.querySelector(".studyroom > button");
  let studyroomCardImg      = document.querySelector(".studyroom > img");
  
  let hallCard         = document.querySelector(".hall > p");       // Query by HTML class & element type. Select <p> element
  let hallCardBtn      = document.querySelector(".hall > button");
  let hallCardImg      = document.querySelector(".hall > img");  
  
  let frontdoorCard       = document.querySelector(".frontdoor > p"); 
  let frontdoorCardImg      = document.querySelector(".frontdoor > img"); 
  let balconydoorCard       = document.querySelector(".balconydoor > p");
  let balconydoorCardImg      = document.querySelector(".balconydoor > img");   

  /* EVENT LISTENERS */
  // Add event listener which sends fetch request to server once plot button is clicked
  plotBtn.addEventListener("click", async ()=>{
	  console.log("Clicked_Clicked");
	  let starttime = new Date(start.value).getTime() / 1000;
	  let endtime = new Date(end.value).getTime() / 1000;
	  // Request data from server
	  const URL = `/data?start=${starttime}&end=${endtime}&variable=OUTTEMP`;//OUTTEMP for temperature
	  //const URL = `/data?start='+starttime+'&end='endtime'+&variable=OUTTEMP`;//OUTTEMP for temperature
	  console.log(URL);
	  const response = await fetch(URL);
	  if(response.ok){
		  	let res = await response.json();
			elevationData = [res];//Three dots
			//Print data received to console
			console.log(elevationData);
			
			// Render plot with received data
			graph.update({
				series: [{
					data: res,
					lineColor: Highcharts.getOptions().colors[1],
					color: Highcharts.getOptions().colors[2],
					fillOpacity: 0.5,
					name: 'Temperature',
					marker: {
						enabled: false
						},
					threshold: null
					}]
				});
}
});

/* GRAPH */
graph = Highcharts.chart('container', {
	chart:{
		type: 'area',
		zoomType: 'x',
		panning: true,
		panKey: 'shift',
		scrollablePlotArea:{
			minWidth: 600
			}
		},
title:{
	text: 'Average Outside Temperature',
	align: 'center'
},
xAxis:{
	type: "datetime"
},
yAxis:{
	startOnTick: true,
	endOnTick: false,
	maxPadding: 0.35,
	title:{
		text: null
	},
	labels:{
		format: '{value} °C'
		} 
	},
tooltip:{
	// headerFormat: 'Distance: {point.x:.1f} km<br>',
	pointFormat: '{point.y:.1f} °C',
	shared: true
},
legend:{
	enabled: false
},
series: [{
	data: elevationData,
	lineColor: Highcharts.getOptions().colors[1],
	color: Highcharts.getOptions().colors[2],
	fillOpacity: 0.5,
	name: 'Temperature',
	marker:{
		enabled: false
	},
	threshold: null
	}]
});

// Render live Graph
liveGraph = Highcharts.chart('livedata', {
	chart: {
		type: 'spline',
		zoomType: 'x',
		panning: true,
		panKey: 'shift',
		scrollablePlotArea: {
			minWidth: 600
		}
},
title: {
	text: 'Live Temperature Data',
	align: 'center'
}, 
xAxis: {
	type: "datetime"
},
yAxis: {
	startOnTick: true,
	endOnTick: false,
	maxPadding: 0.35,
	title: {
		text: null
	},
	labels: {
		format: '{value} °C'
	} 
},
tooltip: {
	// headerFormat: 'Distance: {point.x:.1f} km<br>',
	pointFormat: '{point.y:.1f} °C',
	shared: true
},
legend: {
	enabled: false
},
series: [{
	data: [],
	lineColor: Highcharts.getOptions().colors[3],
	color: Highcharts.getOptions().colors[2],
	fillOpacity: 0.5,
	name: 'Temperature',
	marker: {
		enabled: false
},
	threshold: null
}]
});

  
  
  kitchenCardBtn.addEventListener("click",()=>{ 
        console.log("Kitchen Button clicked");
		if(var1==0){
			kitchenCard.innerHTML="ON";
			var1=var1+1;
			
		}
		else if(var1==1){
			kitchenCard.innerHTML="OFF";
			var1=var1-1;
			
		}
		//kitchenCardBtn.innerHTML="bulb";
		//kitchenCardImg.src="bulb_on.svg";
		//console.log("test1test2");

        // Send message
        let message = {"message":"toggle","sensor":"KITCHEN"};
        send_message(JSON.stringify(message));
		
  });
  livingroomCardBtn.addEventListener("click",()=>{ 
        console.log("LivingRoom Button clicked");
		if(var2==0){
			livingroomCard.innerHTML="ON";
			var2=var2+1;
			
		}
		else if(var2==1){
			livingroomCard.innerHTML="OFF";
			var2=var2-1;
			
		}

        // Send message
        let message = {"message":"toggle","sensor":"LIVINGROOM"};
        send_message(JSON.stringify(message));
  });
    bedroomCardBtn.addEventListener("click",()=>{ 
        console.log("BedRoom Button clicked");
		if(var3==0){
			bedroomCard.innerHTML="100";
			var3=var3+1;
			
		}
		else if(var3==1){
			bedroomCard.innerHTML="0";
			var3=var3-1;
			
		}

        // Send message
        let message = {"message":"toggle","sensor":"BEDROOM"};
        send_message(JSON.stringify(message));
  });
    bathroomCardBtn.addEventListener("click",()=>{ 
        console.log("Bathroom Button clicked");
		if(var4==0){
			bathroomCard.innerHTML="ON";
			var4=var4+1;
			
		}
		else if(var4==1){
			bathroomCard.innerHTML="OFF";
			var4=var4-1;
			
		}

        // Send message
        let message = {"message":"toggle","sensor":"BATHROOM"};
        send_message(JSON.stringify(message));
  });
    studyroomCardBtn.addEventListener("click",()=>{ 
        console.log("StudyRoom Button clicked");
		if(var5==0){
			studyroomCard.innerHTML="ON";
			var5=var5+1;
			
		}
		else if(var5==1){
			studyroomCard.innerHTML="OFF";
			var5=var5-1;
			
		}

        // Send message
        let message = {"message":"toggle","sensor":"STUDYROOM"};
        send_message(JSON.stringify(message));
  });
    hallCardBtn.addEventListener("click",()=>{ 
        console.log("Hall Button clicked");
		if(var6==0){
			hallCard.innerHTML="ON";
			var6=var6+1;
			
		}
		else if(var6==1){
			hallCard.innerHTML="OFF";
			var6=var6-1;
			
		}

        // Send message
        let message = {"message":"toggle","sensor":"HALL"};
        send_message(JSON.stringify(message));
  });


  /* MQTT FUNCTIONS  */  
  onMessageArrived = (r_message)=>{ 
		//console.log("TESTETSTES");
      
      try{
        // Convert message received to json object
        let mssg  = JSON.parse(r_message.payloadString); 

        // Print json message to console(View in Browser Dev Tools)
        console.log(mssg); 
		//send_message(mssg);
	  if(var1==1){
		  mssg.KITCHEN="ON";}
	  if(var1==0){
		  mssg.KITCHEN="OFF";}
	  if(var2==1){
		  mssg.LIVINGROOM="ON";}
	  if(var2==0){
		  mssg.LIVINGROOM="OFF";}
	  if(var3==1){
		  mssg.BEDROOM="100";}
	  if(var3==0){
		  mssg.BEDROOM="0";}
	  if(var4==1){
		  mssg.BATHROOM="ON";}
	  if(var4==0){
		  mssg.BATHROOM="OFF";}
	  if(var5==1){
		  mssg.STUDYROOM="ON";}
	  if(var5==0){
		  mssg.STUDYROOM="OFF";}
	  if(var6==1){
		  mssg.HALL="ON";}
	  if(var6==0){
		  mssg.HALL="OFF";}
	  if(mssg.TYPE == "SENSOR"){   //if(mssg.TYPE=="SENSOR)
          // Update webpage 
		  
		  let timestamp = mssg.TIMESTAMP;
		  let temperature = mssg.OUTTEMP; 
          if(limit > 0){
			  liveGraph.series[0].addPoint({y:parseFloat(temperature) ,x:((parseInt(timestamp) - 18000 )*1000) }, true, false);
			  limit--;
					  }
		  else{
			 liveGraph.series[0].addPoint({y:parseFloat(temperature) ,x:((parseInt(timestamp) - 18000 )*1000) }, true, true);
					}
		  
		  
		  
          kitchenCard.innerHTML   =  mssg.KITCHEN;
		  
		  if(mssg.KITCHEN=="OFF"){
			  console.log("debug");
			  kitchenCardImg.src="../static/images/bulb_off.svg"
			  var1=0;
			  kitchenCard.innerHTML="OFF";
		  
		  }
		  if(mssg.KITCHEN=="ON"){
			  kitchenCardImg.src="../static/images/bulb_on.svg"
			  var1=1;
			  kitchenCard.innerHTML="ON";
			  }
		  livingroomCard.innerHTML=mssg.LIVINGROOM;
		  if(mssg.LIVINGROOM=="ON"){livingroomCardImg.src="../static/images/bulb_on.svg"}
		  if(mssg.LIVINGROOM=="OFF"){livingroomCardImg.src="../static/images/bulb_off.svg";}
		  bedroomCard.innerHTML=mssg.BEDROOM;
		  if(mssg.BEDROOM=="ON"){bedroomCardImg.src="../static/images/bulb_on.svg"}
		  if(mssg.BEDROOM=="OFF"){bedroomCardImg.src="../static/images/bulb_off.svg";}		  
		  bathroomCard.innerHTML=mssg.BATHROOM;
		  if(mssg.BATHROOM=="ON"){bathroomCardImg.src="../static/images/bulb_on.svg"}
		  if(mssg.BATHROOM=="OFF"){bathroomCardImg.src="../static/images/bulb_off.svg"}
		  studyroomCard.innerHTML=mssg.STUDYROOM;
		  if(mssg.STUDYROOM=="ON"){studyroomCardImg.src="../static/images/bulb_on.svg"}
		  if(mssg.STUDYROOM=="OFF"){studyroomCardImg.src="../static/images/bulb_off.svg"}
		  hallCard.innerHTML=mssg.HALL;
		  if(mssg.HALL=="ON"){hallCardImg.src="../static/images/bulb_on.svg"}
		  if(mssg.HALL=="OFF"){hallCardImg.src="../static/images/bulb_off.svg"}
		  balconydoorCard.innerHTML=mssg.BALCONYDOOR;	
		  if(mssg.BALCONYDOOR=="CLOSED"){balconydoorCardImg.src="../static/images/door_close.svg"}
		  if(mssg.BALCONYDOOR=="OPEN"){balconydoorCardImg.src="../static/images/door_open.svg"}
          frontdoorCard.innerHTML = mssg.FRONTDOOR; 
		  if(mssg.FRONTDOOR=="CLOSED"){frontdoorCardImg.src="../static/images/door_close.svg"}
		  if(mssg.FRONTDOOR=="OPEN"){frontdoorCardImg.src="../static/images/door_open.svg"}		  
        }
      
           
      }
      catch (error){
          console.error(error);
      }
   
         
  }
  
  onConnectionLost = ()=>{
      console.log("connection lost"); 
      printMessage.classList.remove("mqttConnected");
      printMessage.classList.add("mqttdisconnected");
      setTimeout(connect,3000);
    }
    
    
  onFailure = (message) => {
    console.log("Failed"); 
    printMessage.classList.remove("mqttConnected");
    printMessage.classList.add("mqttdisconnected");
    setTimeout(MQTTconnect, reconnectTimeout);
  }
    

  onConnected = (recon,url)=>{
    console.log(" in onConnected " +recon);
  }
  
  onConnect = ()=>{
   // Once a connection has been made, make a subscription and send a message. 
  connected_flag          = 1 
  printMessage.classList.add("mqttConnected");
  printMessage.classList.remove("mqttDisconnected");
  console.log(`on Connect ${connected_flag}`); 
  sub_topics();
   }
  
  
  makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
  }
  
  var IDstring = makeid(12);
  
  MQTTconnect = ()=> {
  
  console.log(`connecting to  ${host}   ${port}`);
  mqtt = new Paho.MQTT.Client( host ,port,IDstring);
  
 
  var options = {
          timeout: 3,
          onSuccess: onConnect,
          onFailure: onFailure,   
          useSSL:true  
       };
  
  mqtt.onConnectionLost = onConnectionLost;
  mqtt.onMessageArrived = onMessageArrived;
  mqtt.onConnected = onConnected;
  mqtt.connect(options);
  return false;
   
   
  }
  
  
  sub_topics = ()=>{   
  console.log("Subscribing to topic = "+ subtopic);
  mqtt.subscribe(subtopic);
  return false;
  }
  
  send_message = (msg)=>{

    printStatus.innerHTML ="";
    if (connected_flag == 0){
        out_msg="<b style='color:red'> Not Connected so can't send </b>"
        console.log(out_msg);
        printStatus.innerHTML = out_msg;
        setTimeout(function(){ printStatus.innerHTML = " ";  }, 3000);
        return false;
    }
    else{  
        // Send message                   
        var message = new Paho.MQTT.Message(msg);
        message.destinationName = pubtopic;
        mqtt.send(message);
        return true;
        }   
  }
  
  // Connect to MQTT broker
  MQTTconnect();
  
  
  };