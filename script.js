let noteTitles = ['test', 'test2'];
let noteMessages = ['erste Nachricht', 'zweite Nachricht'];
let months = ['Januar', 'Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']
load();

// ! in progress
function render(){
    getCurrentDate();
    let notes = document.getElementById('notes');
    notes.innerHTML = '';
    for (let i = noteTitles.length -1; i >= 0; i--) {
        let title = noteTitles[i];
        let message = noteMessages[i];
        
        notes.innerHTML += /*html*/`
        <div class="task m-b active-task">
            <h2>${title}</h2>
            <p>${message}</p>
            <div class="bottom-icon">
                <img onclick="deleteNote(${i})" id="trash-icon" class="icon" src="img/icon/trash-2-64.png" alt="">
            </div>
        </div>
        `;
    }
}

// <<<<<<<< Open / Close Overlay New Task
function openNewTask(){
    document.getElementById('new-tasks').classList.remove('d-none');
}
function closeNewTask(){
    document.getElementById('new-tasks').classList.add('d-none');
}


// <<<<<<<<< Open / Close Overlay Trash
function openTrash(){
    document.getElementById('trash').classList.remove('d-none');
}
function closeTrash(){
    document.getElementById('trash').classList.add('d-none');
}


// <<<<<<<< push new Note in Array
function addNote(){
    let title = document.getElementById('new-title');
    let message = document.getElementById('new-message')

    noteTitles.push(title.value)
    noteMessages.push(message.value)

    title.value = '';
    message.value = '';

    render()
    save();
}


//<<<<<<<<<< delete Array
function deleteNote(i){
    noteTitles.splice(i, 1);
    noteMessages.splice(i, 1);

    render();
    save();
}


//<<<<<<<<< Save & Load Array´s
function save(){
    let saveArrayTitle = JSON.stringify(noteTitles);
    let saveArrayMessage = JSON.stringify(noteMessages);

    localStorage.setItem('Title', saveArrayTitle);
    localStorage.setItem('Message', saveArrayMessage);
}
function load(){
    let saveArrayTitle = localStorage.getItem('Title');
    let saveArrayMessage = localStorage.getItem('Message');

    if (saveArrayTitle && saveArrayMessage) {
        noteTitles = JSON.parse(saveArrayTitle);
        noteMessages = JSON.parse(saveArrayMessage);   
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
    <p>${d + ' . ' + monthsText+' '+ y}</p>`;
}
