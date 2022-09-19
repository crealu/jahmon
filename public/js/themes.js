const themes = [
  {
    name: 'skel',
    sequence: {
      textColor: '606060',
      backgroundColor: 'FFFFFF',
      selectedColor: 'D6D6D6'
    }
  },
  {
    name: 'dark',
    sequence: {
      textColor: 'E2E2E2',
      backgroundColor: '3F3F3F',
      selectedColor: '1E1E1E'
    }
  },
  {
    name: 'pastel'
  }
];

// const themes = {
//   skel: {
//     changes: [
//       {
//         element: 'saved-sequences',
//         color: ''
//       }
//     ]
//     sequence: {
//       textColor: '606060',
//       backgroundColor: 'FFFFFF',
//       selectedColor: 'D6D6D6'
//     }
//   },
//   dark: {
//     sequence: {
//       textColor: 'E2E2E2',
//       backgroundColor: '3F3F3F',
//       selectedColor: '1E1E1E'
//     }
//   },
//   pastel: {
//     sequence: {
//       textColor: '606060',
//       backgroundColor: 'FFFFFF',
//       selectedColor: 'D6D6D6'
//     }
//   }
// }

const themeSelect = document.getElementsByClassName('theme-select')[0];

function changeTheme(option) {
  for (theme in themes) {

    console.log(themes[theme]);
  }
}

themeSelect.addEventListener('change', (e) => {
  changeTheme(e.target.value)
});
