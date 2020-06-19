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
function addToDo(toDo, id, done, trash) {
  if (trash) { return; }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `
                <li class="item">
                  <i class="fa fa-circle-thin co" job="complete" id="${id}"></i>
                  <p class="text">${toDo}</p>
                  <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
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
      addToDo(toDo);
    }
    input.value = "";
  }
})
