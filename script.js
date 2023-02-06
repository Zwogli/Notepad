let noteTitles = ['test', 'test2'];
let noteMessages = ['erste Nachricht', 'zweite Nachricht'];


function render(){
    let notes = document.getElementById('added-notes');
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

    notes.innerHTML = '';
    for (let i = 0; i < noteTitles.length; i++) {
        let title = noteTitles[i];
        let message = noteMessages[i];
        
        notes.innerHTML += /*html*/`
        <div class="note">
            <h2>${title}</h2>
            <p>${message}</p>
            <div class="add">
                <img id="trash-icon" class="icon-note" src="img/icon/trash-2-64.png" alt="">
            </div>
        </div>
        `;
    }
}