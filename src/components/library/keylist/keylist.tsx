import * as React from 'react';
import './Keylist.css';

const musicKeys = [ 'A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯'];

export const KeyList: React.FC = () => {
  const scroll = (event) => {
    const wrapper = document.getElementsByClassName('lib-chord-wrapper')[0];
    const allChords = document.getElementsByClassName('lib-chord');

    for (let i = 0; i < allChords.length; i++) {
      if (allChords[i].textContent == event.target.textContent) {
        console.log(allChords[i].scrollTop);
      }
    }

    wrapper.scrollTo({
      top: 40 * 19 * event.target.tabIndex,
      behavior: 'smooth'
    })
  }

  const toggleKeyList = () => {
    const nav = document.getElementsByClassName('nav-keys')[0];
    if (nav.style.display == 'none') {
      nav.style.display = 'block';
    } else {
      nav.style.display = 'none';
    }
  }

  return (
    <div className="key-list">
      <div className="nav-keys">
        {musicKeys.map((key, idx) => {
          return (
            <div
              className="nav-key"
              onClick={(e) => scroll(e)}
              tabIndex={idx}
            >
              {key}
            </div>
          )
        })}
      </div>
    </div>
  )
}


export default KeyList;
