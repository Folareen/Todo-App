const todoInput = document.querySelector(".todo-input");
const addButton = document.querySelector(".submit-button");
let todoList = document.querySelector('ul');
const all = document.querySelector('.all');
const uncompleted = document.querySelector('.uncompleted');
const completed = document.querySelector('.completed');
const select = document.querySelector('select');

addButton.addEventListener('click', addTodo);
select.addEventListener('change' , filter);
document.addEventListener('DOMContentLoaded', getTodos);

function addTodo(event){
    event.preventDefault();
    const todoItem = document.createElement('li');

    localStorage.removeItem("todos");

    const checkButton = document.createElement('button');
    checkButton.classList.add('check');
    checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    todoItem.append(checkButton);
    checkButton.addEventListener('click', checkTodo);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    todoItem.append(deleteButton);
    deleteButton.addEventListener('click', deleteTodo);

    const todoText = document.createElement('div');
    todoText.classList.add('todo-text');
    if (todoInput.value.length < 1){
        alert("todo item can't be empty!");
    }else{
        todoText.innerText = todoInput.value;
        todoItem.append(todoText);
        todoItem.classList.add("todo-item");
        todoList.appendChild(todoItem);
    }
    todoInput.value = "";

    localStorage.setItem("todos", todoList.outerHTML)
}

function checkTodo(event){
    const item = event.target.parentElement;
    item.classList.toggle('completed');
    console.log("completed ahhh")
}
function deleteTodo(event){
    const item = event.target.parentElement;
    item.classList.add('deleted');
    item.addEventListener('transitionend', function (e){

        localStorage.removeItem("todos");

        e.target.remove();

        localStorage.setItem("todos", todoList.outerHTML)
    })
}

function filter(event){
    const todoChildren = todoList.children;
    [...todoChildren].forEach( function(each){
        switch (event.target.value){
            case "all":
                each.style.display = "flex";
                break;
            case "uncompleted":
                if (!each.classList.contains('completed')){
                    each.style.display = "block";
                }else{
                    each.style.display = "none"
                }
                break;
            case "completed":
                if (each.classList.contains('completed')){
                    each.style.display = "block";
                } else{
                    each.style.display = "none";
                }
                break;
    }});
}

function getTodos(){
    if(localStorage.getItem('todos') !== null){
        todoList.innerHTML = localStorage.getItem("todos");
        document.querySelectorAll('.check').forEach( (checkBtn) => checkBtn.addEventListener('click', checkTodo));
        document.querySelectorAll('.delete').forEach( (deleteBtn) => deleteBtn.addEventListener('click', deleteTodo));      
    }
}