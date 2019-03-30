window.addEventListener('load',()=>{
  let long;
  let lat;
  let tempDes = document.querySelector(".temp-des");
  let tempDeg = document.querySelector(".temp-degree");
  let location = document.querySelector(".location-timezone");
  let tempSec = document.querySelector(".temperature");
  const tempSpan = document.querySelector(".temperature span");

  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // This proxy is to allow the api to fetch on local host
      const proxy = 'https://cors-anywhere.herokuapp.com/'
      //This api does not allow local host to fetch the data
      const api = `${proxy}https://api.darksky.net/forecast/43fd0779756aa32b26cf70619512776f/${lat},${long}`;
      //Fetch the api and get the data from the api, save setInterval(function () {
      // in data variable
      fetch(api)
        .then(data => {
          return data.json();
        })
        .then(response => {
          const {temperature, summary, icon} = response.currently;
          //Set the DOM element from API on the website
          tempDes.textContent = summary;
          tempDeg.textContent = temperature;
          location.textContent = response.timezone;
          // Convert the temp
          let celcius = Math.floor((temperature - 32) * (5/9));
          // Update the icon
          setIcon(icon, document.querySelector('.icon'));

          //Change temp to C/F
          tempSec.addEventListener("click", ()=> {
            if (tempSpan.textContent === "F"){
              tempSpan.textContent = "C";
              tempDeg.textContent = celcius;
            }else{
              tempSpan.textContent = "F";
              tempDeg.textContent = temperature;
            }
          })
        });
    });
  }

  function setIcon(icon, id){
    const skycons = new Skycons({color: "white"});
    // Replace - with _
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(id,Skycons[currentIcon]);
  }
});
