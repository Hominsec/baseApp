window.addEventListener('load',()=>{

console.log("Calc page loaded");
  var var1 =0;
  var add1=0;
  var add2=0;
  var var2=0;
  var var3=0;
// Add your JS code below
  let inputCard1         = document.querySelector("#One");       // Query by HTML class & element type. Select <p> element
  let inputCard2         = document.querySelector("#Two"); 
  let inputCardBtn      = document.querySelector("#hm");  // Query by HTML class & element type. Select <button> element
  let p1=document.querySelector("#p1");
  let p2=document.querySelector("#prd");
  let p3=document.querySelector("#temp");
  let inputCard3         = document.querySelector("#x");       // Query by HTML class & element type. Select <p> element
  let inputCard4         = document.querySelector("#y"); 
  let inputCardBtn1      = document.querySelector("#z");
  let inputCard5        = document.querySelector("#t");       // Query by HTML class & element type. Select <p> element 
  let inputCardBtn2      = document.querySelector("#n");
  inputCardBtn.addEventListener("click",()=>{
	console.log("Button clicked");
	var1=parseInt(inputCard1.value)+parseInt(inputCard2.value);
	add1=inputCard1.value;
	add2=inputCard2.value;
	console.log(var1);
	console.log('${var1}');
	
	funcadd().catch(error =>{
		console.log('error');
	});
	async function funcadd(){
		const URL = "/sum?number1="+add1+"&number2="+add2;
		const response =await fetch(URL);
		let res= await response.text();
		p1.innerHTML=res;
		console.log(res);
		
	}
	
	


});
  inputCardBtn1.addEventListener("click",()=>{
	console.log("Button clicked");
	var2=inputCard3.value*inputCard4.value;
	console.log(var2);
	
	funcmul().catch(error =>{
		console.log('error');
	});
	
	async function funcmul(){
		const URL='/mul';
		let data={"number1":inputCard3.value,"number2":inputCard4.value}
		const response=await fetch(URL,{method:"POST",body:JSON.stringify(data),headers:{'Content-Type':'application/json'}});
		let rees=await response.text();
		p2.innerHTML=rees;
		console.log("It indeed does work "+rees);
		
	}

});
  inputCardBtn2.addEventListener("click",()=>{
	console.log("Button clicked");
	var3=inputCard5.value;
	let ans=parseFloat((parseFloat(var3)*1.8)+32);
	let fin="Answer:"+var3+" C is "+ans+" F";
	p3.innerHTML=fin;
	console.log(ans);

});
});