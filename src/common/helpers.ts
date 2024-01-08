export const clearFretboard = () => {
  const fretNotes = document.getElementsByClassName('fret-note');
  for (let fn = 0; fn < fretNotes.length; fn++) {
    fretNotes[fn].style.display = 'none';
    fretNotes[fn].style.background = 'red';
  }
}

export const clearRiffs = () => {
  const allRiffs = document.getElementsByClassName('riff-note');
  while (allRiffs.length > 0) {
    for (let ar = 0; ar < allRiffs.length; ar++) {
      allRiffs[ar].remove();
    }
  }
}

export const toggleRiffs = (displayValue) => {
  const allRiffs = document.getElementsByClassName('riff-note');
  for (let ar = 0; ar < allRiffs.length; ar++) {
    allRiffs[ar].style.display = displayValue;
  }
}

export const restyleSteps = (step) => {
  const steps = document.getElementsByClassName('seq-step');
  for (let s = 0; s < steps.length; s++) {
    steps[s].classList.remove('active-step');
  }
  step.classList.add('active-step');
}

export const unstyleActive = () => {
  const steps = document.getElementsByClassName('seq-step');
  for (let s = 0; s < steps.length; s++) {
    steps[s].classList.remove('active-step');
  }
}

export const collectChordNotes = () => {
  let notes = document.getElementsByClassName('fret-note');
  let noteids = [];
  for (let n = 0; n < notes.length; n++) {
    if (notes[n].style.display == 'block') {
      noteids.push(notes[n].dataset.noteid);
    }
  }
  return [noteids.join(','), '']
}

export const collectRiffNotes = () => {
  let notes = document.getElementsByClassName('riff-note');
  let noteids = [];
  let fretnums = [];
  for (let n = 0; n < notes.length; n++) {
    console.log(notes[n])
    noteids.push(notes[n].dataset.noteid);
    fretnums.push(notes[n].textContent);
  }
  return [noteids.join(','), fretnums.join(',')]
}

export const codifySnapshot = (snapshot) => {
  let arr = [], strArr = [];
  snapshot.forEach(id => {
    arr.push(parseInt(id.replace('s', '').replace('f', '')));
  });
  strArr = arr.sort().map(id => { return id.toString() });
  return parseInt(strArr.join(''));
}

export const convertChordIds = (tchords) => {
  let chordIds = [];
  let arr = [], strArr = [];
  tchords.forEach(chord => {
    arr = [];
    chord.noteids.forEach(noteid => {
      arr.push(parseInt(noteid.replace('s', '').replace('f', '')))
    })
    strArr = arr.sort().map(id => { return id.toString() })
    chordIds.push(parseInt(strArr.join('')));
  })
  return chordIds.join(',');
}

// steps
export const scrollSteps = (event) => {
  if (event.deltaY > 0) {
    event.target.parentNode.parentNode.scrollLeft += 40;
  } else {
    event.target.parentNode.parentNode.scrollLeft -= 40;
  }
}

export const refresh = () => { location.reload() }

// fret.tsx
export const checkNoteID = (noteID) => {
  const markedFrets = ['3', '5', '7', '9', '12', '15', '17'];
  return markedFrets.some(num => {
    return noteID.includes('s3f' + num) ? true : false;
  });
}

export const targetIsDetail = (target) => {
  if (
    target.classList[0] == 'fret-circle-12_1' ||
    target.classList[0] == 'fret-circle-12_2' ||
    target.classList[0] == 'fret-circle'
  ) {
    return true;
  } else {
    return false;
  }
}

export const returnChordIds = () => {
  return '2032425260,2032425360,2032425262,2031405260,2032425162,2032405260,2032445263,203242,2034445260,15243553,2035445262,2032445260,2032405160,2032425160,15243342,15263445,2133435261,2133435361,20314251,2133425361,2133415261,2133415461,2133435363,2133435461,2133415361,2133405263,213343,2130415161,2130405161,16253654,1636475868,1625384556,16243645,2130425161,1524364455,2132435260,2032445163,2234445462,2234435462,2234445362,2234425362,2234445562,1726364857,2232425062,2230415062,2231425262,2234425462,2231415262,2231425260,223444,2231425464,2230425262,1726394657,2233415361,22314352,17263544,22334453,2332405160,2335455463,2335435463,2333405161,2332405060,2335435663,1827374958,2331425163,2332435160,2332435363,233545,16253443,2132405260,2332435365,18263847,2332405363,23344254,2433415261,23344554,2332415160,2332435161,2332425363,384655,2436465564,2436455664,2432435264,2436465764,24344464,19283841059,24365566,24334452,2433445464,243646,2433435464,2433445262,2332435365,24334154,19273948,24334655,24334252,24354655,2435435563,30425362,30425361,30425262,30425161,30425363,30425163,30425062,304261,30425162,2534455565,304253,2534445565,2534455363,2534455567,25344255,25334555,25344655,25344353,30415061,30415361,2635435463,31435462,2635435363,2638465766,26364354,31435264,31435163,2634455466,26354654,2635465666,263848,315161,2635465464,2635465668,26354356,26344656,26354756,26354454,31425162,31425462,102232415060,102232405060,102231415060,102232405360,102232425060,102230425060,102232415260,102232405260,102230415360,10223041536062,102232,32415262,2736475565,102230415262,102232415062,102232405362,102231415062,102736455560,32435263,10213240,33425161,112333415161,33425160,112333415461,112133435161,112331435161,112030425161,112333415361,112331425161,33425463,112333,112030405161,2837485666,112031425363,33425163,112331415163,112032405160,33425261,33445364,33415061,34435262,122434425262,2938465666,34465565,122234445262,122432445262,1221314352,122434425462,122432435262,34435564,122434,122131415262,13223345,1232435464,34435264,122432425264,1221334152,34435362,34455465,34425162,132230405363,132535435363,35445362,35475666,1330405163,132330405161,132230405060,210384958610,132230405061,35445766,132535,132232425363,132230425161,1333445565,1330425063,13213342,1322344253,35445463,35465566,35435263,142636455464,142636445464,14354554,36485767,14243141,142634465464,1423334554,14334454,142634455464,36455766,142636,142333435464,14233451,1434455666,1431435164,142634445466,1423354354,14233241,36475667,1422304150';
}

// const resetFretNotes = () => {
//   const riffFretNotes = document.getElementsByClassName('riff-note');
//   for (let n = 0; n < riffFretNotes.length; n++) {
//     riffFretNotes[n].addEventListener('dragstart', (event) => {
//       dispatch(setRiffen(event.target));
//     });
//   }
// }
