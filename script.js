const textField = document.getElementById(`textField`);
const textlist = document.getElementById("textlist");

function addTask() {
  const textval = textField.value.trim();
  if (textval !== "") {
    const li = document.createElement("li");
    li.innerHTML = `${textval}<button class = "editbtn" onclick= editTask(this)><i class="fa-solid fa-file-pen"></i></button><button class="delbtn" onclick = deleteTask(this)><i class="fa-solid fa-square-minus"></i></button>`;
    textlist.appendChild(li);
    textField.value = "";
    saveToLocalStorage();
  }
}
// Event Listener for Enter Key
document.addEventListener('keypress', function keyPressHandler(e) {
    if ((e.keyCode || e.which) === 13 && !e.shiftKey){
        addTask();
        }});

function deleteTask(button){
    textlist.removeChild(button.parentElement);
    saveToLocalStorage();
}
function editTask(button) {
  const li = button.parentElement;
  const taskText = li.firstChild.textContent;

  const newText = prompt("Edit task:", taskText);
  if (newText !== null) {
    li.firstChild.textContent = newText;
    saveToLocalStorage();
  }
}

function saveToLocalStorage() {
  const tasks = [];
  for (let i = 0; i < textlist.children.length; i++) {
    tasks[i] = textlist.children[i].innerText.trim();
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((tasktext) => {
    const li = document.createElement("li");
    li.innerHTML = `${tasktext}<button class = "editbtn" onclick= editTask(this)><i class="fa-solid fa-file-pen"></i></button><button class="delbtn" onclick = deleteTask(this)><i class="fa-solid fa-square-minus"></i></button>`;
    textlist.appendChild(li);
    console.log(tasktext);
  });
}
loadFromLocalStorage();
