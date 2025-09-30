let temp;
let clock;
let place = "nothing";
let number = "nothing";
window.onload = () => {
+  //run time function every 1000 milliseconds
  setInterval(timeFunction, 1000);
  var bkg = document.createElement("img");
  bkg.id = "background";
  bkg.src = "https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/48byXia/close-up-of-static-on-tv-screen_4kjl6kge_thumbnail-1080_02.png";

  const currentDiv = document.getElementById("background");
  document.body.insertBefore(bkg, currentDiv);

  //Making the "clock" element
  clock = document.createElement("p");
  // creates the tag
  // const clockText = document.getElementById("clock");
  clock.classList.add("clock-text");
  clock.textContent = temp;

  //   console.log(temp)
  //adding "clock" element to body
  document.body.appendChild(clock);
};

timeFunction = () => {
  //   console.log("time function started run");
  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  temp = String(hour % 12);
  if (temp === "0") {
    temp = "12";
  }
  temp += (minute < 10 ? ":0" : ":") + minute;
  temp += (second < 10 ? ":0" : ":") + second;
  temp += hour >= 12 ? "PM" : "AM";
//morning
  if (hour > 5 && hour <= 9) {
    //retrieve element by id of background
    document.getElementById("background").src = "Clockimages/ruin-2.png";
  }
//noon
  //else if stops when the conditions are met for one of them
   else if (hour > 9 && hour <= 17) {
    //retrieve element by id of background
    document.getElementById("background").src = "Clockimages/ruin-3.png";
  }
//sunset
  else if (hour > 17 && hour <= 19) {
    //retrieve element by id of background
    document.getElementById("background").src = "Clockimages/ruin-4.png";
  }
//night
  else {
    //retrieve element by id of background
    document.getElementById("background").src = "Clockimages/ruin-1.png";
  }
  clock.textContent = temp;
  //   console.log(temp);
};
