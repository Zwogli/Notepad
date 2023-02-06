let noteTitles = ['test', 'test2'];
let noteMessages = ['erste Nachricht', 'zweite Nachricht'];
load();


function render(){
    renderHeader();
    renderNewNote();
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

            <p id="uhr"></p>
        </div>
        <img class="icon-note" src="img/icon/menu-4-64.png" alt="">
    </div>
    `;
}


//<<<<<<<<< add New Note 
function renderNewNote(){
    let newNotes = document.getElementById('new-notes');
    newNotes.innerHTML = '';
    newNotes.innerHTML = /*html*/`
    <div id="new-note" class="note">
            <input id="new-title" class="newNote-innerStyle" type="text" placeholder="Title" required>
            <textarea  id="new-message" class="newNote-innerStyle" cols="10" rows="5" placeholder="Message" required></textarea>
            <div class="add">
                <img onclick="addNote()" id="add-icon" class="icon-note" src="img/icon/check-mark-2-64.png" alt="add Note">
            </div>
        </div>
    `;
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


//<<<<<<<<<< delte Array
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
function uhrzeit() {
    var jetzt = new Date(),
        h = jetzt.getHours(),
        m = jetzt.getMinutes(),
        s = jetzt.getSeconds();
    m = fuehrendeNull(m);
    s = fuehrendeNull(s);
    document.getElementById('uhr').innerHTML = h + ':' + m + ':' + s;
    setTimeout(uhrzeit, 500);
  }
  
  function fuehrendeNull(zahl) {
    zahl = (zahl < 10 ? '0' : '' )+ zahl;  
    return zahl;
  }
