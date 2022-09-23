const themes = {
  skel: {
    changes: [
      {
        class: 'sidebar',
        textColor: '#606060',
        bgColor: '#FFFFFF'
      },
      {
        all: true,
        class: 'sequence-title',
        textColor: '#606060',
        bgColor: '#FFFFFF'
      },
      {
        class: 'topbar',
        textColor: '#606060',
        bgColor: '#FFFFFF'
      },
      {
        all: true,
        class: 'ui-btn',
        textColor: '#606060',
        bgColor: '#D6D6D6'
      },
      {
        all: true,
        class: 'seq-step',
        textColor: '#606060',
        bgColor: '#FFFFFF'
      },
      {
        class: 'tablature',
        textColor: '#606060',
        bgColor: '#FFFFFF'
      },
      {
        all: true,
        class: 'fret-note',
        textColor: 'none',
        bgColor: 'black'
      },
      {
        class: 'library',
        textColor: '#606060',
        bgColor: '#FFFFFF'
      },
      {
        all: true,
        class: 'lib-chord',
        textColor: '#606060',
        bgColor: '#FFFFFF'
      }
    ]
  },
  falcon: {
    changes: [
      {
        class: 'sidebar',
        textColor: '#E2E2E2',
        bgColor: '#3F3F3F'
      },
      {
        all: true,
        class: 'sequence-title',
        textColor: '#E2E2E2',
        bgColor: 'none'
      },
      {
        all: true,
        class: 'seq-step',
        textColor: '#E2E2E2',
        bgColor: '#565656'
      },
      {
        class: 'topbar',
        textColor: '#E2E2E2',
        bgColor: '#494949'
      },
      {
        all: true,
        class: 'ui-btn',
        textColor: '#E2E2E2',
        bgColor: 'linear-gradient(180deg, #616161 0%, #2E2E2E 100%)'
      },
      {
        class: 'tablature',
        textColor: '#E2E2E2',
        bgColor: '#212121'
      },
      {
        all: true,
        class: 'fret-note',
        textColor: 'none',
        bgColor: '#ff4949'
      },
      {
        class: 'library',
        textColor: '#E2E2E2',
        bgColor: '#494949'
      },
      {
        all: true,
        class: 'lib-chord',
        textColor: '#E2E2E2',
        bgColor: '#565656'
      }
    ]
  },
  pastel: {
    changes: [
      {
        class: 'sidebar',
        textColor: '#E2E2E2',
        bgColor: '#FDACAC'
      },
      {
        all: true,
        class: 'sequence-title',
        textColor: '#E2E2E2',
        bgColor: 'none'
      },
      {
        class: 'topbar',
        textColor: '#E2E2E2',
        bgColor: '#87F5B3'
      },
      {
        all: true,
        class: 'ui-btn',
        textColor: '#E2E2E2',
        bgColor: 'linear-gradient(180deg, #616161 0%, #2E2E2E 100%)'
      },
      {
        all: true,
        class: 'seq-step',
        textColor: '#E2E2E2',
        bgColor: '#494949'
      },
      {
        class: 'tablature',
        textColor: '#E2E2E2',
        bgColor: '#F9F5A1'
      },
      {
        all: true,
        class: 'lib-chord',
        textColor: '#E2E2E2',
        bgColor: '#565656'
      },
      {
        class: 'library',
        textColor: '#E2E2E2',
        bgColor: '#D8B2EF'
      }
    ]
  }
}

const themeSelect = document.getElementsByClassName('theme-select')[0];

function changeTheme(option) {
  themes[option].changes.forEach(change => {
    change.all ? changeAll(change) : changeOne(change);
  });
  console.log(themes[option].changes[0]);
}

function changeAll(theChange) {
  let els = document.getElementsByClassName(theChange.class);
  for (let e = 0; e < els.length; e++) {
    els[e].style.color = theChange.textColor;
    els[e].style.background = theChange.bgColor;
  }
}

function changeOne(theChange) {
  let el = document.getElementsByClassName(theChange.class)[0];
  el.style.color = theChange.textColor;
  el.style.background = theChange.bgColor;
}

themeSelect.addEventListener('change', (e) => {
  changeTheme(e.target.value)
});
