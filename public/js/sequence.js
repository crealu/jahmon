const finishBtn = document.getElementsByClassName('finish-btn')[0];
const clearSequenceBtn = document.getElementsByClassName('topbar-clear-btn')[0];
const saveBtn = document.getElementsByClassName('topbar-save-btn')[0];

let oneBeingMoved;

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
     steps[s].addEventListener('dragstart', dragstartHandler);
   }
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

function clearSequence() {
  while (topbar.firstChild) { topbar.removeChild(topbar.firstChild) }
  numSteps = 0;
}

clearSequenceBtn.addEventListener('click', () => { clearSequence() });
saveBtn.addEventListener('click', () => { finishSequence() });
topbar.addEventListener('dragover', dragoverHandler);
topbar.addEventListener('drop', dropHandler);
