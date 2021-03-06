// select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const yearElement = document.getElementById("year");
const list = document.getElementById("list");
const input = document.getElementById("input");
const addBtn = document.getElementById("plus-button");

// classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables
let List, id;

// get item from localStorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to the last item of the list
  loadList(LIST); // load the list to the user interface
} else {
  // if data is not empty
  LIST = [];
  id = 0;
}

// load items to the users interface
function loadList(array) {
  array.forEach(function(item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// clear the localStorage
clear.addEventListener("click", function() {
  localStorage.clear();
  location.reload();
})

// display todays date
const options = {
  weekday: "long",
  month: "short",
  day: "numeric"
}
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// display year
const yearOption = {
  year: "numeric",
}
yearElement.innerHTML = today.toLocaleDateString("en-US", yearOption);

// add to-Do function
function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `
                <li class="item">
                  <i class="fa ${DONE} co" job="complete" id=${id}></i>
                  <p class="text ${LINE}">${toDo}</p>
                  <i class="fa fa-trash-o de" job="delete" id=${id}></i>
                </li>
               `;
  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
}

// add item by pressing enter key
document.addEventListener("keyup", function(event) {
  if (event.keyCode == 13) {
    const toDo = input.value;
    // if the input is not empty
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });

      // add item from localStorage
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
})

// add item by clicking plus-button
addBtn.addEventListener("click", function() {
  const toDo = input.value;
  // if the input is not empty
  if (toDo) {
    addToDo(toDo, id, false, false);
    LIST.push({
      name: toDo,
      id: id,
      done: false,
      trash: false
    });

    // add item from localStorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
    id++;
  }
  input.value = "";
})

// complete to Do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to Do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

// target items dynamically
list.addEventListener("click", function(event) {
  const element = event.target;   // return the clicked element inside list
  const elementJob = element.attributes.job.value;  // complete or delete

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }

  // add item from localStorage
  localStorage.setItem("TODO", JSON.stringify(LIST));
})
