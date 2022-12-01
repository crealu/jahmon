export class Step {
  constructor(title, mode, noteids, fretnums) {
    this.title = title;
    this.mode = mode;
    this.noteids = noteids;
    this.fretnums = fretnums;
  }
}

export class Button {
  constructor(uniqueClass, src, action, click) {
    this.classes = 'sequence-btn ' + uniqueClass;
    this.src = 'img/icons/seq-btn-gray/' + src + '.png';
    this.action = action;
    this.handleClick = click;
  }

  click() {
    this.handleClick()
  }
}
