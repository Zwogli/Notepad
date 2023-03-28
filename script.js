let noteTitles = ['test', 'test2'];
let noteMessages = ['erste Nachricht', 'zweite Nachricht'];
let trashTitles = [];
let trashMessages = [];
let months = ['Januar', 'Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
load();

// <<<<<<<<<<<< Render Notes
function render(){
    getCurrentDate();
    let notes = document.getElementById('notes');
    notes.innerHTML = '';
    for (let i = noteTitles.length -1; i >= 0; i--) {
        let title = noteTitles[i];
        let message = noteMessages[i];
        
        notes.innerHTML += generateNotesHTML(i, title, message);
    }
}
function generateNotesHTML(i, title, message){
    return /*html*/`
        <div class="task m-b active-task">
            <h2>${title}</h2>
            <p>${message}</p>
            <div class="bottom-icon">
                <img onclick="deleteNote(${i})" class="icon" src="img/icon/trash-2-64.png" alt="">
            </div>
        </div>
        `;
}

// <<<<<<<< Open / Close Overlay New Task
function openNewTask(){
    document.getElementById('body').classList.add('overflow');
    document.getElementById('new-tasks').classList.remove('d-none');
    let path = document.getElementById('path');
    path.innerHTML = '';
    path.innerHTML = `Neue Notiz`;
}
function closeNewTask(){
    document.getElementById('body').classList.remove('overflow')
    document.getElementById('new-tasks').classList.add('d-none');
    let path = document.getElementById('path');
    path.innerHTML = '';
    path.innerHTML = `Notizen`;
}


// <<<<<<<<< Open / Close Overlay Trash
function openTrash(){
    document.getElementById('body').classList.add('overflow')
    document.getElementById('trash').classList.remove('d-none');
    let path = document.getElementById('path');
    path.innerHTML = '';
    path.innerHTML = `Papierkorb`;
    renderTrash();   
}
function closeTrash(){
    document.getElementById('body').classList.remove('overflow')
    document.getElementById('trash').classList.add('d-none');
    let path = document.getElementById('path');
    path.innerHTML = '';
    path.innerHTML = `Notizen`;
}


// <<<<<<<<<<< load Trash Notes
function renderTrash(){
    let trash = document.getElementById('trash-file');
    trash.innerHTML = '';
    if(trashTitles.length == 0){
        emptyTrashHtml(trash)
    }
    for (let i = trashTitles.length -1; i >= 0; i--) {
        let title = trashTitles[i];
        let message = trashMessages[i];
        
            trash.innerHTML += generateTrashHtml(i, title, message);
    }
}
function emptyTrashHtml(trash){
    trash.innerHTML = /*html*/`
        <div class="task">
        <h2>Wenn du was von mir willst, <br><br> möchte ich erst einmal was von dir!</h2>
        </div>
        `;
}
function generateTrashHtml(i, title, message){
    return /*html*/`
    <div class="task m-b active-task">
        <h2>${title}</h2>
        <p>${message}</p>
        <div class="d-space bottom-icon">
            <img onclick="restoreTrash(${i})" class="icon" src="img/icon/download-2-64.png" alt="">
            <span onclick="deleteTrash(${i})" class="cursor material-symbols-outlined">delete_forever</span>
        </div>
    </div>
    `;
}


// <<<<<<<< push new Note in Array
function addNote(){
    let title = document.getElementById('new-title');
    let message = document.getElementById('new-message')

    if(title.value == '' ||
    message.value == ''){ 
            document.getElementById('alert-newTask').classList.remove('d-none');
        }else{
        moveNoteToArray(title, message);
        render();
        save();
        closeNewTask();
    }
}
function moveNoteToArray(title, message){
    noteTitles.push(title.value);
    noteMessages.push(message.value);
    
    title.value = '';
    message.value = '';
}


function closeAlertNewTask(){
    document.getElementById('alert-newTask').classList.add('d-none');
}


//<<<<<<<<<< delete & push Array into trash
function deleteNote(i){
    trashTitles.push(noteTitles[i]);
    trashMessages.push(noteMessages[i]);

    noteTitles.splice(i, 1);
    noteMessages.splice(i, 1);

    render();
    save();
}
function deleteTrash(i){
    trashTitles.splice(i, 1);
    trashMessages.splice(i, 1);

    render();
    save();
}
function restoreTrash(i){
    noteTitles.push(trashTitles[i]);
    noteMessages.push(trashMessages[i]);

    trashTitles.splice(i, 1);
    trashMessages.splice(i, 1);

    render();
    save();
}


//<<<<<<<<< Save & Load Array´s
function save(){
    let saveArrayTitle = JSON.stringify(noteTitles);
    let saveArrayMessage = JSON.stringify(noteMessages);

    localStorage.setItem('Title', saveArrayTitle);
    localStorage.setItem('Message', saveArrayMessage);

    let saveArrayTrashTitle = JSON.stringify(trashTitles);
    let saveArrayTrashMessage = JSON.stringify(trashMessages);

    localStorage.setItem('trashTitle', saveArrayTrashTitle);
    localStorage.setItem('trashMessage', saveArrayTrashMessage);
}
function load(){
    let saveArrayTitle = localStorage.getItem('Title');
    let saveArrayMessage = localStorage.getItem('Message');

    if (saveArrayTitle && saveArrayMessage) {
        noteTitles = JSON.parse(saveArrayTitle);
        noteMessages = JSON.parse(saveArrayMessage);   
    }

    let saveArrayTrashTitle = localStorage.getItem('trashTitle');
    let saveArrayTrashMessage = localStorage.getItem('trashMessage');
    if (saveArrayTrashTitle && saveArrayTrashMessage) {
        trashTitles = JSON.parse(saveArrayTrashTitle);
        trashMessages = JSON.parse(saveArrayTrashMessage);   
    }
}


//<<<<<<<<<<<<<<<< Clock
function getCurrentDate(){       /* manages Time, Date and greetings based an time*/
    date = new Date();
    day = date.getDate();
    month = date.getMonth() ;
    year = date.getFullYear();
    hour = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds(); 
    monthsText = months[month];
    d = day.toString();
    y = year.toString();

    if(hour<12){
        greeting = `Guten Morgen `; 
    }
    else if(hour<18){
        greeting = `Guten Tag `; 
    }
    else if(hour<22){
        greeting = `Guten Abend `; 
    }
    else{
        greeting = `Du solltest besser schlafen. `; 
    }

    document.getElementById('date').innerHTML = '';
    document.getElementById('date').innerHTML = `
    ${greeting}
    <br>
    ${d + ' . ' + monthsText+' '+ y}`;
}
