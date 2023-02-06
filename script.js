let noteTitles = ['test', 'test2'];
let noteMessages = ['erste Nachricht', 'zweite Nachricht'];
let months = ['Januar', 'Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']
load();


function render(){
    renderHeader();
    getCurrentDate();
    
    renderNotes();
}


function renderHeader(){
    let header = document.getElementById('header');
    header.innerHTML = '';
    header.innerHTML = /*html*/`
    <img class="header-bg-img" src="img/notepad_640.jpg" alt="Adeventure equipment">
    <div class="header-container">
        <div class="header-title">
            <h1>Notes</h1>
            <h3 id="date"></h3>
        </div>
        <img class="icon-note" onclick="openMenu()" src="img/icon/menu-4-64.png" alt="">
    </div>
    <nav>
        <ul id="menu-list" class="d-none">
        <li><a onclick="renderNewNote()">Neue Aufgabe <img src="img/icon/text-file-4-64.png" alt="file"></a></li>
        <li><a>Papierkorb <img src="img/icon/trash-2-64.png" alt="trash"></a></li>
        </ul>
    </nav>
    `;
}


/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function openMenu() {
    var x = document.getElementById("menu-list");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }


//<<<<<<<<< add New Note 
function renderNewNote(){
    let newNotes = document.getElementById('new-notes');
    newNotes.classList.remove('d-none'); 
}


function closeTask(){
    document.getElementById('new-notes').classList.add('d-none');
}


//<<<<<<<<< display Notes
function renderNotes(){
    let notes = document.getElementById('added-notes');

    notes.innerHTML = '';
    for (let i = noteTitles.length -1; i >= 0  ; i--) {
        let title = noteTitles[i];
        let message = noteMessages[i];
        
        notes.innerHTML += /*html*/`
        <div class="note">
            <h2>${title}</h2>
            <p>${message}</p>
            <div class="add">
                <img onclick="deleteNote(${i})" id="trash-icon" class="icon-note" src="img/icon/trash-2-64.png" alt="delete note">
            </div>
        </div>
        `;
    }
}


// <<<<<<<< push new Note in Array
function addNote(){
    let title = document.getElementById('new-title');
    let message = document.getElementById('new-message')

    noteTitles.push(title.value)
    noteMessages.push(message.value)

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


// Clock
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
