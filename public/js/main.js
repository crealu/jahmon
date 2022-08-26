const fretboard = document.getElementsByClassName('fretboard')[0];
const topbar = document.getElementsByClassName('sequence-wrapper')[0];
const currentTitle = document.getElementsByClassName('current-title')[0];
const setBtn = document.getElementsByClassName('set-btn')[0];
const clearFretboardBtn = document.getElementsByClassName('clear-btn')[0];
const finishBtn = document.getElementsByClassName('finish-btn')[0];
const clearSequenceBtn = document.getElementsByClassName('topbar-clear-btn')[0];
const saveBtn = document.getElementsByClassName('topbar-save-btn')[0];
const fretNotes = document.getElementsByClassName('fret-note');
const sequences = document.getElementsByClassName('saved-sequence');
const newSequence = document.getElementsByClassName('new-sequence')[0];
const saveForm = document.getElementsByClassName('save-form')[0];
const chordBtn = document.getElementsByClassName('chord-btn')[0];
const riffBtn = document.getElementsByClassName('riff-btn')[0];
const cancelBtn = document.getElementsByClassName('cancel-btn')[0];

let numSteps = 0;
let mode = 'chord';
let activeStep = 0;
let stepSelected = false;
let isNew = true;
let oneBeingMoved;

function setActiveStep(step) {
  let steps = document.getElementsByClassName('seq-step');
  for (let s = 0; s < steps.length; s++) {
    steps[s].style.background = 'white';
  }
  if (activeStep == step.dataset.stepnum) {
    stepSelected = !stepSelected;
  } else {
    stepSelected = true;
    populateFretboard(step);
    step.style.background = 'green';
    activeStep = step.dataset.stepnum;
  }
}

function dragstartHandler(event) {
  oneBeingMoved = event.target;
  event.dataTransfer.dropEffect = 'move';
}

function dragoverHandler(event) {
  event.preventDefault();
}

function dropHandler(event) {
  event.preventDefault();
  let targetNum = event.target.dataset.stepnum;
  if (oneBeingMoved.dataset.stepnum < targetNum) {
    event.target.insertAdjacentElement('afterend', oneBeingMoved);
  } else {
    topbar.insertBefore(oneBeingMoved, event.target);
  }
  resetStepNumbers();
}

function resetStepNumbers() {
  const steps = document.getElementsByClassName('seq-step');
   for (let s = 1; s < steps.length; s++) {
     steps[s].setAttribute('data-stepnum', s);
   }
}

function addSeqStep() {
  let step = document.createElement('div');
  let data = collectNotes();
  setStepProps(step, data, numSteps + 1);
  topbar.appendChild(step);
  step.textContent = mode == 'chord' ? 'CH' + numSteps : 'R' + numSteps;
  numSteps++;
}

function setStepProps(step, data, num) {
  step.classList.add('seq-step');
  step.setAttribute('data-mode', mode);
  step.setAttribute('data-noteids', data[0]);
  step.setAttribute('data-fretnums', data[1]);
  step.setAttribute('data-stepnum', num);
  step.setAttribute('draggable', 'true');
  step.addEventListener('click', () => { setActiveStep(step) });
  step.addEventListener('dragstart', dragstartHandler);
}

function setStepPropsFromDB(step, data, num) {
  step.classList.add('seq-step');
  step.setAttribute('data-noteids', data[0]);
  step.setAttribute('data-fretnums', data[1]);
  step.setAttribute('data-mode', data[2]);
  step.setAttribute('data-stepnum', num);
  step.setAttribute('draggable', 'true');
  step.addEventListener('click', () => { setActiveStep(step) });
  step.addEventListener('dragstart', dragstartHandler);
}

function updateSeqStep() {
  let step = document.getElementsByClassName('seq-step')[activeStep - 1];
  let ids = collectChordNotes();
  step.dataset.noteids = ids;
}

function collectNotes() {
  let ids = [];
  let nums = [];
  if (mode == 'chord') {
    collectChordNotes(ids, nums);
  } else {
    collectRiffNotes(ids, nums);
  }
  return [ids.join(','), nums.join(',')];
}

function collectChordNotes(ids, nums) {
  for (let fn = 0; fn < fretNotes.length; fn++) {
    if (fretNotes[fn].style.display == 'block') {
      ids.push(fretNotes[fn].dataset.noteid);
      nums.push('');
    }
  }
}

function collectRiffNotes(ids, nums) {
  let riffNotes = document.getElementsByClassName('note-bubble-fret');
  for (let rn = 0; rn < riffNotes.length; rn++) {
    ids.push(riffNotes[rn].parentElement.children[0].dataset.noteid)
    nums.push(riffNotes[rn].textContent);
  }
}

function populateFretboard(step) {
  clearFretboard();
  toggleMode(step.dataset.mode);
  let steps = document.getElementsByClassName('seq-step');
  let noteIds = step.dataset.noteids.split(',');
  let fretnums, trueFretnums;

  if (step.dataset.mode == 'riff') {
    fretnums = step.dataset.fretnums.split(',');
    trueFretnums = fretnums.filter((fretnum) => fretnum != '');
  }

  for (let n = 0; n < noteIds.length; n++) {
    for (let fn = 0; fn < fretNotes.length; fn++) {
      if (noteIds[n] == fretNotes[fn].dataset.noteid) {
        if (step.dataset.mode == 'chord') {
          fretNotes[fn].style.display = 'block';
        } else {
          let noteBubble = document.createElement('div');
          noteBubble.classList.add('note-bubble');
          noteBubble.classList.add('note-bubble-fret');
          noteBubble.setAttribute('draggable', 'true');
          noteBubble.addEventListener('dragstart', dragFretBubble);
          noteBubble.textContent = trueFretnums[n];
          fretNotes[fn].parentElement.appendChild(noteBubble);
        }
      }
    }
  }
}

function tabulateRiff() {
  
}

let sequenceDS = {
  title: '',
  steps: [
    {
      name: '',
      mode: '',
      noteids: '',
      fretnums: ''
    }
  ]
};

function clearFretboard() {
  let noteBubbles = document.getElementsByClassName('note-bubble-fret');
  for (let fn = 0; fn < fretNotes.length; fn++) {
    fretNotes[fn].style.display = 'none';
  }

  for (let nb = 0; nb < noteBubbles.length; nb++) {
    noteBubbles[nb].remove();
  }

  for (let n = 0; n < noteBubbles.length; n++) {
    noteBubbles[n].remove();
  }
}

function startNewSequence() {
  clearSequence();
  clearFretboard();
  currentTitle.textContent = 'untitled';
  isNew = true;
  stepSelected = false;
}

function populateSequence(sequence) {
  clearSequence();
  clearFretboard();
  isNew = false;
  let noteids = sequence.dataset.noteids.split('.');
  let steps = sequence.dataset.steps.split('.');
  let fretnums = sequence.dataset.fretnums.split('.');
  let modes = sequence.dataset.modes.split('.');
  currentTitle.textContent = sequence.children[0].textContent;
  numSteps = steps.length;

  console.log('Note ids', noteids);
  console.log('Steps', steps);
  console.log('Fret nums', fretnums);

  // let data = [noteids, fretnums];
  for (let n = 0; n < noteids.length; n++) {
    let step = document.createElement('div');
    setStepPropsFromDB(step, [noteids[n], fretnums, modes[n]], n + 1);
    topbar.appendChild(step);
    step.innerHTML = steps[n];
  }
}

function clearSequence() {
  while (topbar.firstChild) { topbar.removeChild(topbar.firstChild) }
  numSteps = 0;
}

function finishSequence() {
  const steps = document.getElementsByClassName('seq-step');
  let allIds = [];
  let allSteps = [];
  let allFretnums = [];
  let allModes = [];
  for (let s = 0; s < steps.length; s++) {
    allIds.push(steps[s].dataset.noteids);
    allSteps.push(steps[s].textContent);
    allFretnums.push(steps[s].dataset.fretnums);
    allModes.push(steps[s].dataset.mode);
  }
  let savableIds = allIds.join('.');
  let savableSteps = allSteps.join('.');
  let savableFretnums = allFretnums.join('.');
  let savableModes = allModes.join('.');
  let noteidsInput = document.getElementsByClassName('noteids-input')[0];
  let stepsInput = document.getElementsByClassName('steps-input')[0];
  let fretnumsInput = document.getElementsByClassName('fretnums-input')[0];
  let modesInput = document.getElementsByClassName('modes-input')[0];
  noteidsInput.value = savableIds;
  stepsInput.value = savableSteps;
  fretnumsInput.value = savableFretnums;
  modesInput.value = savableModes;
  saveForm.style.display = 'block';

  if (!isNew) {
    saveForm.setAttribute('action', '/update');
    document.getElementsByClassName('title-input')[0].value = currentTitle.textContent;
  }
}

function setModeStyle(fretBorder, circleOpacity) {
  let frets = document.getElementsByClassName('fret');
  let fretCircles = document.getElementsByClassName('fret-circle');
  for (let f = 0; f < frets.length; f++) {
    frets[f].style.borderLeft = '1px solid ' + fretBorder;
    if (frets[f].children[0].dataset.noteid.includes('f0')) {
      frets[f].children[0].style.background = 'tan';
    }
  }
  for (let fc = 0; fc < fretCircles.length; fc++) {
    fretCircles[fc].style.opacity = circleOpacity;
  }
}

function toggleMode(newMode) {
  let riffNumbers = document.getElementsByClassName('riff-numbers')[0];
  if (newMode == 'riff') {
    setModeStyle('rgba(0, 0, 0, 0)', '0');
    riffNumbers.style.opacity = '1';
  } else if (newMode == 'chord') {
    setModeStyle('lightgray', '1');
    riffNumbers.style.opacity = '0';
  }
  mode = newMode;
}

setBtn.addEventListener('click', () => {
  // setSelected ? updateSeqStep() : addSeqStep();
  if (stepSelected) {
    updateSeqStep();
  } else {
    addSeqStep();
  }
});

chordBtn.addEventListener('click', () => { toggleMode('chord') });
riffBtn.addEventListener('click', () => { toggleMode('riff') });
clearFretboardBtn.addEventListener('click', () => { clearFretboard() });
clearSequenceBtn.addEventListener('click', () => { clearSequence() });
newSequence.addEventListener('click', () => { startNewSequence() });
saveBtn.addEventListener('click', () => { finishSequence() });
topbar.addEventListener('dragover', dragoverHandler);
topbar.addEventListener('drop', dropHandler);
cancelBtn.addEventListener('click', () => {
  document.getElementsByClassName('save-form')[0].style.display = 'none';
});

for (let z = 0; z < sequences.length; z++) {
  sequences[z].addEventListener('click', () => {
    populateSequence(sequences[z]);
  });
}

window.onload = createFretboard();

// function getClassElements(className) {
//   let elements = document.getElementsByClassName(className);
//   let elArr = [];
//   for (let e = 0; e < elements.length; e++) {
//     elArr.push(elements[e]);
//   }
//   return elArr;
// }
//
// function addNoteInputs() {
//   let fretNotes = document.getElementsByClassName('fret-note');
//   for (let fn = 0; fn < fretNotes.length; fn++) {
//     let noteInput = document.createElement('input');
//     noteInput.classList.add('note-input');
//     fretNotes[fn].appendChild(noteInput);
//   }
// }
