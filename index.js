var inCompleteTask=[];
var completeTask=[];
var checkText="";
const ul=document.querySelector(".inComplete-task");
const ul1=document.querySelector(".complete-task");

const submit=()=>{
    const input=document.getElementById('text');
    const todo=input.value;
    if(todo.length==0){
        alert("Please Enter something")
     return;
    }
    inCompleteTask.push(todo);
    input.value="";
    //to add dask to incomplete task
    console.log(inCompleteTask)
    const list=createIncomplete(todo);

    var textnode = document.createTextNode(todo);
     list.appendChild(textnode);
    ul.appendChild(list);
}


const createIncomplete=(todo)=>{
    //for every incomplete task
    const li=document.createElement('li');
    li.classList.add("task");
   
    //for every button
    const del=document.createElement('button');
    var textnode = document.createTextNode("Delete");
    del.appendChild(textnode);
    del.addEventListener('click',function(e){
        deleteElement(e.target,todo)
    });
    del.classList.add("delete");
    li.appendChild(del);
   
    //for check box
    const check=document.createElement('input');
    check.type="checkbox"
    check.classList.add("check");
    li.appendChild(check);
    check.addEventListener('change',()=>{
        completeTask.push(todo);
        const list=createComplete(todo);
        var textnode = document.createTextNode(todo);
        list.appendChild(textnode);
        ul1.appendChild(list);
    })
    check.addEventListener('change',(e)=>deleteElement(e.target,todo));
    return li;
}


const deleteElement=function (e,todo){
    var listItem=e.parentNode;
    checkText=todo;
    inCompleteTask=inCompleteTask.filter(checkCorrect);
    console.log('INCOMPLETE',inCompleteTask);
	ul.removeChild(listItem);
}

//filter function 
const checkCorrect=(text)=>{
 if(text!==checkText) return true;
}

//for complete task

const createComplete=(todo)=>{
    const li=document.createElement('li');
    li.classList.add("task");
    //for every button
    const del=document.createElement('button');
    var textnode = document.createTextNode("Delete");
    del.appendChild(textnode);
    del.addEventListener('click',(e)=>deleteElementComplete(e.target,todo))
    del.classList.add("delete")
    li.appendChild(del);
    return li;
}

const deleteElementComplete=function (e,todo){
    var listItem=e.parentNode;
    checkText=todo;
    completeTask=completeTask.filter(checkCorrect);
    console.log('COMPLETE',completeTask);
	ul1.removeChild(listItem);
}

//run when there is cookie for inComplete
const setCookie=(cname,cvalue,exdays)=>{
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const getCookie=(str1,str2)=>{
    let temp=document.cookie;
    temp=temp.split(';');
    var point=temp[0].indexOf('=');
    var str=temp[0].substring(point+1);
    str=JSON.parse(str);
    inCompleteTask=str;
    point=temp[1].indexOf('=');
    str=temp[1].substring(point+1);
    str=JSON.parse(str);
    completeTask=str;
}

//to render at first
const fillUl=()=>{
if(inCompleteTask.length>0){
    inCompleteTask.forEach(todo=>{
     const list=createIncomplete(todo);
     var textnode = document.createTextNode(todo);
     list.appendChild(textnode);
     ul.appendChild(list);
    })
}

//run when there is cookie for Complete
if(completeTask.length>0){
    completeTask.forEach(todo=>{
     const list=createComplete(todo);
     var textnode = document.createTextNode(todo);
     list.appendChild(textnode);
     ul1.appendChild(list);
    })
}
}

window.addEventListener("beforeunload", function(e){
   str1=JSON.stringify(inCompleteTask);
   str2=JSON.stringify(completeTask);
   setCookie('inCompleteTask',str1,24);
   setCookie('completeTask',str2,24);
 }, false);

 window.addEventListener("load", function(e){
    getCookie('inCompleteTask=','completeTask=');
    fillUl();
   });