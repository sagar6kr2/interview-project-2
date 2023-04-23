const text = document.getElementById('inputvalue');
const btnText =text.innerText;
const userbutton = document.getElementById('btns');
const recordDisplay =document.getElementById('records');
let userArray = [];
let edit_id =null;


let objstr =localStorage.getItem('users');
if(objstr!=null){

    userArray = JSON.parse(objstr);
}
DisplayInfo()
userbutton.onclick = () => {
    const name = text.value;
    if(edit_id!=null){
        //edit
        userArray.splice(edit_id,1,{'name': name});
        edit_id=null;
    }else{

        userArray.push({ 'name': name });
    }
    //console.log(userArray)
    SaveInfo(userArray);
    text.value='';
    
    userbutton.innerText =btnText
}

function SaveInfo() {
    let str = JSON.stringify(userArray)
    localStorage.setItem('users', str)
    DisplayInfo()
}

function DisplayInfo() {
    let statement ='';
    userArray.forEach((user,i) => {
        statement +=`<tr>
        <th scope="row">${i+1}</th>
        <td>${user.name}</td> 
        <td><i class=" btn text-white fa fa-edit  btn-info mx-3" onclick='EditeInfo(${i})'></i></td>
        <td><i class="btn btn danger text white fa fa-trash-o" onclick='DeleteInfo(${i})'></i></td>
        </tr>`
    })
    recordDisplay.innerHTML=statement;
}
function EditeInfo(id) {
    edit_id=id;
    text.value=userArray[id].name
    userbutton.innerHTML="Save change"

}

function DeleteInfo(id) {
  userArray.splice(id,1)
  SaveInfo(userArray)
  

}
