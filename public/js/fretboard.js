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
}

function addFrets(stringRow, stringNum) {
  const fretQuantity = 20;
  for (let fretNum = 0; fretNum < fretQuantity; fretNum++) {
    let fret = document.createElement('div');
    let note = document.createElement('div');
    let noteID = 's' + (6 - stringNum) + 'f' + fretNum;
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
    if (noteID.includes('s3f' + num)) {
      return true
    }
    return false;
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
