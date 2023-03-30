var arr=[];
var completeTask=[];
const ul=document.querySelector(".inComplete-task");
const ul1=document.querySelector(".complete-task");

const submit=()=>{
    const input=document.getElementById('text');
    const todo=input.value;
    if(todo.length==0){
        alert("Please Enter something")
     return;
    }
    arr.push(input.value);
    input.value="";
    //to add dask to incomplete task
    const list=inComplete(todo);
    var textnode = document.createTextNode(todo);
     list.appendChild(textnode);
    ul.appendChild(list);
}


const inComplete=(todo)=>{
    //for every incomplete task
    const li=document.createElement('li');
    li.classList.add("task");
    //for every button
    const del=document.createElement('button');
    var textnode = document.createTextNode("Delete");
    del.appendChild(textnode);
    del.addEventListener('click',deleteElement)
    del.classList.add("delete")
    li.appendChild(del);
   
    //for checkbox
    const check=document.createElement('input');
    check.type="checkbox"
    check.classList.add("check");
    li.appendChild(check);
    check.addEventListener('change',()=>{
        completeTask.push(todo);
        complete(todo);
    })
    check.addEventListener('change',deleteElement);
   return li;
}

var ltext="";
const deleteElement=function (){
    var listItem=this.parentNode;
    const text=listItem.innerText;
    ltext=text.slice(7);

    arr=arr.filter(checkCorrect)
	ul.removeChild(listItem);
}

const checkCorrect=(text)=>{
 if(text!==ltext) return true;
}

//for complete task

const complete=(todo)=>{
    const li=document.createElement('li');
    li.classList.add("task");
    //for every button
    const del=document.createElement('button');
    var textnode = document.createTextNode("Delete");
    del.appendChild(textnode);
    del.addEventListener('click',deleteElement1)
    del.classList.add("delete")
    li.appendChild(del);
    var textnode = document.createTextNode(todo);
     li.appendChild(textnode);
    ul1.appendChild(li);
}

const deleteElement1=function (){
    var listItem=this.parentNode;
	ul1.removeChild(listItem);
}

