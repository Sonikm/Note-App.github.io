// || CHANGE COLOR
window.addEventListener('load', () => {

    const color = document.querySelectorAll('.color');
    color.forEach(item => {
        item.addEventListener('click', () => {
            const idSelected = item.id;
            document.body.className = idSelected;
        })
    })

    let c = bodyColor.className
    bodyColor.classList.remove(`${c}`);
    
})



// || ACCESSING ELEMENETS FOR TOGGLE LEFT AND RIGHT CONTAINER
const leftContainer = document.querySelector(' .left-container'),
rightContainer = document.querySelector(' .right-container'),
newNote = document.querySelector('.add-note'),
addNote = document.querySelector('.save');

// Corrent value of note
let noteDesc = document.querySelector('.note-desc'),
noteTitle = document.querySelector('.title'),
noteDate = document.querySelector('.date'),
bodyColor = document.body;

// If there is not any list is created or it is null than initialise empty array
const notesList = JSON.parse(localStorage.getItem('notesList') || "[]"),
      months = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];

// || CURRENT DATE
window.onload = () => {
    let currentDate = new Date();
    let date = `<i class="fa-solid fa-calendar-days"></i> ${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    noteDate.innerHTML = date;

    document.getElementById('current-date').innerHTML = `${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

}

 //   || DISPLAY TO ADD NEW NOTE AND DELETE PREVIOUS NOTE VALUE 
newNote.addEventListener('click', () => {
    newNote.classList.toggle('active');
    rightContainer.classList.toggle('active');
    leftContainer.classList.toggle('active');

    // Remove previous content
    noteDesc.value = '';
    noteTitle.value = '';
    let c = bodyColor.className
    bodyColor.classList.remove(`${c}`);
    
    noteTitle.focus()
    
    let notes = document.querySelectorAll('.notes-list');
    let saveUpdated = document.querySelector('.saveUpdateIcon');

    modificationMenu.classList.remove('active');

    notes.forEach(e => {
        if(e.classList.contains('active')) {
            e.classList.remove('active')
            e.lastElementChild.classList.remove('active')
            saveUpdated.classList.remove('active');
        }

    })

})

   // || FUNCTION FOR CLOSE NOTE
   closeNote = document.querySelector('.close-icon');
   closeNote.addEventListener('click', () => {
    newNote.click();
})

// || ADD NOTE CONTENTS IN NOTE LIST
function showNotes () {

    let addBox = document.querySelector('.notes-list');
    let li =  document.querySelectorAll('.notes-list');

    // Remove previous note before adding new notes
     for(let i=1; i< li.length; i++){
         li[i].remove();
     }
 
     let noteL = '';
 
     notesList.forEach((elem, index)=> {
         
     noteL = `
                   <li class="notes-list ${elem.color}" onclick="showMenu(this, ${index})">
           
                         <h3 class="notes-list__heading">${elem.title}</h3>
                         <p class="notes-list__content">${elem.description}</p>
                         <p class="notes-list__date">${elem.date}</p>
                         <div class="selected-note">
                             <div class="icon"><i class="fa-solid fa-square-check"></i></div>   
                         </div>
                   </li>
                 
               `
               bodyColor.className = elem.color;    
               addBox.insertAdjacentHTML('afterend', noteL);
  }) 

}

// || only show notes when the length of notes is greater then zero
if(notesList.length >= 1) {
    showNotes();
}


 // || TO SHOW EDITE AND DELETE MENU
 const modificationMenu = document.querySelector('.update-delete_menu');
 let update = document.querySelector('.update');
 let menu = document.querySelectorAll('.notes-list')
 var updateIndex = 0

 function showMenu(elem, id) {
    
    let selectedItem = 0;
    updateIndex = id;

    elem.classList.toggle('active')
    modificationMenu.classList.add('active')

    let menu = document.querySelectorAll('.notes-list')

    menu.forEach(e => {
        if(e.classList.contains('active')) {
            e.lastElementChild.classList.add('active')
            modificationMenu.classList.add('active')

            selectedItem++;
        }
        else{
            e.lastElementChild.classList.remove('active')
        }
    })

    // Remove update button when notes are selected more than one
    if(selectedItem > 1) {
        update.classList.add('active');  
    } 
    else {
        update.classList.remove('active');  
    }
}


// || ADD NOTES
addNote.addEventListener('click', () => {

    let desc = noteDesc.value,
        title = noteTitle.value,
        currentDate = new Date(),
        color = bodyColor.className,
        date = `${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

    if(desc || title) {
        let noteInfo = {
            title: title,
            description: desc,
            date: date,
            color: color
        }
    notesList.push(noteInfo);
    localStorage.setItem('notesList', JSON.stringify(notesList));
   
    showNotes();
    newNote.click();
    }

})

// // || DETETE NOTE

const deleteList = document.querySelector('.delete');
deleteList.addEventListener('click', () => {

    let notes = document.querySelectorAll('.notes-list'),
        deleteCount = 0,
        j = 0;

    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;    
    for(let i =  notes.length-1; i > 0; i--) {
        if(notes[i].classList.contains('active')) {
    
            notesList.splice(deleteCount, 1);
            localStorage.setItem("notesList", JSON.stringify(notesList));            
        }
        else {
            deleteCount++;
        }
    }

    showNotes();
    newNote.click();

})

//  || UPDATE NOTE
let saveUpdated = document.querySelector('.saveUpdateIcon');

update.addEventListener('click', () => {
    let notes = document.querySelectorAll('.notes-list');
    let updateCount = 0;

    for(let i =  notes.length-1; i > 0; i--) {
        if(notes[i].classList.contains('active')) {
          
            update.classList.add('active'); 
            saveUpdated.classList.add('active');
           
            leftContainer.classList.toggle('active');
            rightContainer.classList.toggle('active');
            updateNote(updateCount);   
     
        }
        else {
           updateCount++;
        }
    }
})


// || CALLING UPDATE FUNCTION 

function updateNote (noteId) {
    

    noteTitle.value = notesList[noteId].title;
    noteDesc.value = notesList[noteId].description;
    bodyColor.className = notesList[noteId].color;
   
    document.querySelector('.saveUpdateIcon').onclick = ()=>{

            if(noteTitle.value || noteDesc.value) {

                notesList[noteId].title = noteTitle.value
                notesList[noteId].description = noteDesc.value
                notesList[noteId].color = bodyColor.className;
    
                localStorage.setItem("notesList", JSON.stringify(notesList));   
                saveUpdated.classList.remove('active');
                showNotes();
                newNote.click();
            }

        }

    }