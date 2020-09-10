/* API url and key  */
let URL ='https://api.openweathermap.org/data/2.5/weather?zip=';
const APIkey ='2696ded58a072a2df572f69833d4ea89&units=metric';

//variables
const zipcode   = document.querySelector('#zip');
const userFeel  = document.querySelector('#feelings');
const genButton = document.querySelector('#generate');

// update variables
const temp    = document.querySelector('#temp');
const date    = document.querySelector('#date');
const userRes = document.querySelector('#content');


// Create a new date instance dynamically with JS
let d = new Date();

function performAction(){

  let zip  = zipcode.value;
  let feel = userFeel.value;
  let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

  getData(URL,zip,APIkey)
    .then(function(data){
      console.log(data);
      postData('/add', {temp:data.main.temp+'°C' , date :newDate , Feel:feel} )
        .then(
          updateUI()
        );
    })
}
// post request
const postData = async (url=' ', data ={} )=>{

  const response = await fetch(url,{
    method :'POST',
    credentials:'same-origin',
    headers:{
      'content-type':'application/json',
    },
    body: JSON.stringify(data),
  });

  try{
    const newData = await response.json();
    return newData;
  }catch(error){
    console.log("error",error);
  }
};

// get request
const getData = async (url ,userZip,apiKey)=>{
  //console.log(url+userZip+apiKey);
  const request = await fetch(url+userZip+',us'+'&APPID='+apiKey);
  try{
    const recievedData  = await request.json();
    //console.log( recievedData.main.temp );
    return recievedData;
  }catch(error){
    console.log("error",error);
  }
};

const updateUI = async()=>{

  const respond = await fetch('/send');
  try{
    let res = await respond.json();
    temp.innerHTML    = res.temp;
    date.innerHTML    = res.date;
    userRes.innerHTML = res.Feel;
  }catch(error){
    console.log("error",error);
  }


}

genButton.addEventListener('click',performAction);
