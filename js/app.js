// select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");


// classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// display todays date
const options = { weekday : "long", month: "short", day: "numeric" }
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to-Do function
