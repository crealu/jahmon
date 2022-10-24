const fretboard = document.getElementsByClassName('fretboard')[0];
const topbar = document.getElementsByClassName('sequence-wrapper')[0];
const currentTitle = document.getElementsByClassName('current-title')[0];
const setBtn = document.getElementsByClassName('set-btn')[0];
const clearFretboardBtn = document.getElementsByClassName('clear-btn')[0];
const fretNotes = document.getElementsByClassName('fret-note');
const sequences = document.getElementsByClassName('saved-sequence');
const newSequence = document.getElementsByClassName('new-sequence-btn')[0];
const saveForm = document.getElementsByClassName('save-form')[0];
const chordBtn = document.getElementsByClassName('chord-btn')[0];
const riffBtn = document.getElementsByClassName('riff-btn')[0];
const cancelBtn = document.getElementsByClassName('cancel-btn')[0];
const sidebarTabBtn = document.getElementsByClassName('tab-btn')[0];
const settingsBtn = document.getElementsByClassName('settings-btn')[0];
const closeModalBtn = document.getElementsByClassName('close-modal-btn')[0];
const deleteBtn = document.getElementsByClassName('topbar-delete-btn')[0];

let numSteps = 0;
let mode = 'chord';
let activeStep = 0;
let stepSelected = false;
let isNew = true;

let oneBeingMoved;

function dragstartHandler(event) {
  oneBeingMoved = event.target;
  event.dataTransfer.dropEffect = 'move';
  console.log(event.target);
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
     steps[s].addEventListener('dragstart', dragstartHandler);
   }
}

function setActiveStep(step) {
  let steps = document.getElementsByClassName('seq-step');
  for (let s = 0; s < steps.length; s++) {
    steps[s].style.background = 'white';
  }
  if (activeStep == step.dataset.stepnum) {
    stepSelected = !stepSelected;
  } else {
    stepSelected = true;
    clearFretboard();
    populateFretboard(step);
    step.style.background = '#D6D6D6';
    activeStep = step.dataset.stepnum;
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

function updateSeqStep() {
  let step = document.getElementsByClassName('seq-step')[activeStep - 1];
  let ids = collectNotes();
  step.dataset.noteids = ids;
  console.log(activeStep, ids);
}

function setStepProps(step, data, num) {
  step.classList.add('seq-step');
  step.setAttribute('data-mode', mode);
  step.setAttribute('data-noteids', data[0]);
  step.setAttribute('data-fretnums', data[1]);
  step.setAttribute('data-stepnum', num);
  step.setAttribute('draggable', 'true');
  step.addEventListener('click', () => { setActiveStep(step) });
  step.addEventListener('dragstart', (e) => { dragstartHandler(e) });
}

function setStepPropsFromDB(step, data, num) {
  step.classList.add('seq-step');
  step.setAttribute('data-noteids', data[0]);
  step.setAttribute('data-fretnums', data[1]);
  step.setAttribute('data-mode', data[2]);
  step.setAttribute('data-stepnum', num);
  step.setAttribute('draggable', 'true');
  step.addEventListener('click', () => { setActiveStep(step) });
  step.addEventListener('dragstart', (e) => { dragstartHandler(e) });
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

function placeNotes(step, noteIds, trueFretnums) {
  for (let n = 0; n < noteIds.length; n++) {
    for (let fn = 0; fn < fretNotes.length; fn++) {
      if (noteIds[n] == fretNotes[fn].dataset.noteid) {
        if (step.dataset.mode == 'chord') {
          fretNotes[fn].style.display = 'block';
        } else {
          tabulateRiff(trueFretnums, n, fn);
        }
      }
    }
  }
}

function populateFretboard(step) {
  toggleMode(step.dataset.mode);
  let noteIds = step.dataset.noteids.split(',');
  let fretnums, trueFretnums;

  if (step.dataset.mode == 'riff') {
    fretnums = step.dataset.fretnums.split(',');
    trueFretnums = fretnums.filter((fretnum) => fretnum != '');
  }

  placeNotes(step, noteIds, trueFretnums);
}

function tabulateRiff(trueFretnums, n, fn) {
  let noteBubble = document.createElement('div');
  noteBubble.classList.add('note-bubble');
  noteBubble.classList.add('note-bubble-fret');
  noteBubble.setAttribute('draggable', 'true');
  noteBubble.addEventListener('dragstart', dragFretBubble);
  noteBubble.textContent = trueFretnums[n] != null ? trueFretnums[n] : '';
  fretNotes[fn].parentElement.appendChild(noteBubble);
}

function clearFretboard() {
  let noteBubbles = document.getElementsByClassName('note-bubble-fret');
  for (let fn = 0; fn < fretNotes.length; fn++) {
    fretNotes[fn].style.display = 'none';
  }

  for (let nb = 0; nb < noteBubbles.length; nb++) {
    noteBubbles[nb].style.display = 'none';
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
  let noteids = sequence.dataset.noteids.split('.').filter(d => d != '');
  let steps = sequence.dataset.steps.split('.').filter(d => d != '');
  let fretnums = sequence.dataset.fretnums.split('.').filter(d => d != '');
  let modes = sequence.dataset.modes.split('.').filter(d => d != '');
  currentTitle.textContent = sequence.children[0].textContent;
  numSteps = steps.length;

  // let data = [noteids, fretnums];
  for (let n = 0; n < noteids.length; n++) {
    let step = document.createElement('div');
    setStepPropsFromDB(step, [noteids[n], fretnums, modes[n]], n + 1);
    topbar.appendChild(step);
    step.innerHTML = steps[n];
  }
}

function setModeStyle(fretBorder, circleOpacity) {
  let frets = document.getElementsByClassName('fret');
  let fretCircles = document.getElementsByClassName('fret-circle');
  for (let f = 0; f < frets.length; f++) {
    frets[f].style.borderLeft = '1px solid ' + fretBorder;
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
    chordBtn.style.background = 'var(--skel_sel_color)';
    riffBtn.style.background = 'var(--skel_bg_color)';
  } else if (newMode == 'chord') {
    setModeStyle('lightgray', '1');
    riffNumbers.style.opacity = '0';
    chordBtn.style.background = 'var(--skel_bg_color)';
    riffBtn.style.background = 'var(--skel_sel_color)';
  }
  mode = newMode;
}

function toggleSidebar() {
  const sidebar = document.getElementsByClassName('sidebar')[0];
  const arrow = document.getElementsByClassName('arrow-left')[0];
  if (sidebar.style.left == '0px') {
    sidebar.style.left = '-200px';
    arrow.style.borderLeft = '8px solid var(--skel_sel_color)';
    arrow.style.borderRight = 'none';
  } else {
    sidebar.style.left = '0px';
    arrow.style.borderLeft = 'none';
    arrow.style.borderRight = '8px solid var(--skel_sel_color)';
  }
}

function toggleModal() {
  const modal = document.getElementsByClassName('settings-modal')[0];
  modal.style.display = modal.style.display == 'block' ? 'none' : 'block';
}

setBtn.addEventListener('click', () => {
  // stepSelected ? updateSeqStep() : addSeqStep();
  if (stepSelected) {
    updateSeqStep();
  } else {
    addSeqStep();
  }
});

function deleteStep() {
  const stepToDelete = document.getElementsByClassName('seq-step')[activeStep - 1];
  topbar.removeChild(stepToDelete);
  console.log(activeStep);
}

closeModalBtn.addEventListener('click', () => { toggleModal() });
settingsBtn.addEventListener('click', () => { toggleModal() });
sidebarTabBtn.addEventListener('click', () => { toggleSidebar() });
chordBtn.addEventListener('click', () => { toggleMode('chord') });
riffBtn.addEventListener('click', () => { toggleMode('riff') });
clearFretboardBtn.addEventListener('click', () => { clearFretboard() });
newSequence.addEventListener('click', () => { startNewSequence() });
cancelBtn.addEventListener('click', () => {
  document.getElementsByClassName('save-form')[0].style.display = 'none';
});
deleteBtn.addEventListener('click', () => { deleteStep() });

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
// let sequenceDS = {
//   title: '',
//   steps: [
//     {
//       name: '',
//       mode: '',
//       noteids: '',
//       fretnums: ''
//     }
//   ]
// };
