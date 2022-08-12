function createFretboard() {
  const stringQuantity = 6;
  for (let stringNum = 0; stringNum < stringQuantity; stringNum++) {
    let stringRow = document.createElement('div');
    let stringDiv = document.createElement('div');
    stringRow.classList.add('string-row');
    stringDiv.classList.add('string-div');
    stringRow.appendChild(stringDiv);
    addFrets(stringRow, stringNum);
    fretboard.appendChild(stringRow);
  }
  addRiffNumbers();
}

function addFrets(stringRow, stringNum) {
  const fretQuantity = 21;
  for (let fretNum = 0; fretNum < fretQuantity; fretNum++) {
    let fret = document.createElement('div');
    let note = document.createElement('div');
    let noteID = 's' + (6 - stringNum) + 'f' + fretNum;
    if (fretNum == 0) { fret.classList.add('fret-open') }
    fret.classList.add('fret');
    note.classList.add('fret-note');
    note.setAttribute('data-noteid', noteID);
    fret.appendChild(note);
    addFretDetails(fret, noteID);
    addFretControls(fret);
    stringRow.appendChild(fret);
  }
}

function checkNoteID(noteID) {
  const markedFrets = ['3', '5', '7', '9', '12', '15', '17'];
  return markedFrets.some(num => {
    return noteID.includes('s3f' + num) ? true : false;
  });
}

function addFretDetails(fret, noteID) {
  if (checkNoteID(noteID)) {
    if (noteID == 's3f12') {
      for (let f = 1; f < 3; f++) {
        let fretCircle = document.createElement('div');
        fretCircle.classList.add('fret-circle-12_' + f.toString());
        fretCircle.classList.add('fret-circle');
        fret.appendChild(fretCircle);
      }
    } else {
      let fretCircle = document.createElement('div');
      fretCircle.classList.add('fret-circle');
      fret.appendChild(fretCircle);
    }
  }
}

function addFretControls(fret) {
  fret.addEventListener('click', () => {
    if (fret.children[0].style.display == 'block') {
      fret.children[0].style.display = 'none';
    } else {
      fret.children[0].style.display = 'block';
    }
  });
}

let movedNoteBubble;
function dragstartNoteBubble(event) {
  movedNoteBubble = event.target.cloneNode(true);
  // movedNoteBubble = event.target;
  console.dir(event.target.parentElement);
  console.dir(movedNoteBubble.parentElement);
  event.dataTransfer.dropEffect = 'copy';
  console.log('drag start');
}

function dragFretBubble() {
  movedNoteBubble = event.target;
  console.dir(event.target.parentElement);
  console.dir(movedNoteBubble.parentElement);
  event.dataTransfer.dropEffect = 'move';
  console.log('drag start');
}

function dragoverNoteBubble(event) {
  event.preventDefault();
  if (event.target.classList[0] == 'fret') {
    event.target.style.background = 'lightgray';
  }
  console.log('dragged over');
}

function dragleaveNoteBubble(event) {
  event.preventDefault();
  if (event.target.classList[0] == 'fret') {
    event.target.style.background = 'tan';
  }
}

const targetIsFret = (e) => { return e.target.classList[0] == 'fret' };

function dropNoteBubble(event) {
  event.preventDefault();
  if (targetIsFret(event)) {
    movedNoteBubble.style.background = 'tan';
    movedNoteBubble.classList.add('note-bubble-fret');
    event.target.appendChild(movedNoteBubble);
    event.target.style.background = 'tan';
  }

  resetFretBubbles();
  console.log('dropped');
}

function trashNoteBubble(event) {
  event.preventDefault();
  event.target.appendChild(movedNoteBubble);
  while (event.target.firstChild) {
    event.target.removeChild(event.target.firstChild);
  }
}

function resetFretBubbles() {
  let noteBubbleFrets = document.getElementsByClassName('note-bubble-fret');
  for (let n = 0; n < noteBubbleFrets.length; n++) {
    noteBubbleFrets[n].removeEventListener('dragstart', dragstartNoteBubble);
    noteBubbleFrets[n].addEventListener('dragstart', dragFretBubble);
  }
}

function addRiffNumbers() {
  let riffNumbers = document.getElementsByClassName('riff-numbers')[0];
  let frets = document.getElementsByClassName('fret');

  for (let r = 0; r < 21; r++) {
    let noteBubble = document.createElement('div');
    noteBubble.classList.add('note-bubble');
    noteBubble.setAttribute('draggable', 'true');
    noteBubble.textContent = r;
    noteBubble.addEventListener('dragstart', dragstartNoteBubble);
    riffNumbers.appendChild(noteBubble);
  }

  let trash = document.createElement('div');
  trash.classList.add('note-bubble');
  trash.textContent = 'Trash';
  trash.addEventListener('dragover', dragoverNoteBubble);
  trash.addEventListener('drop', trashNoteBubble);
  riffNumbers.appendChild(trash);

  for (let f = 0; f < frets.length; f++) {
    frets[f].addEventListener('dragover', dragoverNoteBubble);
    frets[f].addEventListener('dragleave', dragleaveNoteBubble);
    frets[f].addEventListener('drop', dropNoteBubble);
  }
}
