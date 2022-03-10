const todoInput = document.querySelector(".todo-input");
const addButton = document.querySelector(".submit-button");
const todoList = document.querySelector('ul');
const all = document.querySelector('.all');
const uncompleted = document.querySelector('.uncompleted');
const completed = document.querySelector('.completed');
const select = document.getElementById('select');


addButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkTodo);
todoList.addEventListener('click', deleteTodo);
select.addEventListener('change' , filter);


function addTodo(event){
    event.preventDefault();
    const todoItem = document.createElement('li');

    const checkButton = document.createElement('button');
    checkButton.classList.add('check');
    checkButton.innerText = "v";
    todoItem.append(checkButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.innerText = "x";
    todoItem.append(deleteButton);

    const todoText = document.createElement('div');
    todoText.classList.add('todo-text');
    if (todoInput.value.length <1){
        alert("todo item can't be empty!");
    }else{
        todoText.innerText = todoInput.value;
        todoItem.append(todoText);
        todoItem.classList.add("todo-item");
        todoList.appendChild(todoItem);
    }
    todoInput.value = "";

}

function checkTodo(event){
    const item = event.target;
    if (item.className == "check"){
       item.parentElement.classList.toggle('completed');
    }
}
function deleteTodo(event){
    const item = event.target;
    if(item.className == "delete"){
        item.parentElement.classList.add('deleted');
        item.parentElement.addEventListener('transitionend', function (e){
            e.target.remove();
        })
    }
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
};