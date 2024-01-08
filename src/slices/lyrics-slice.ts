import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface LyricsState {
  activeLine: number;
  activePanelStep: object;
  lines: any[];

}

export const lyricsInitialState: LyricsState = {
  activeLine: 0,
  activePanelStep: {},
  lines: [{
    text: '..lyrics..',
    panel: [{
      chord: '', offset: ''
    }]
  }],
};

export const lyricsSlice = createSlice({
  initialState:  lyricsInitialState,
  name: 'lyrics',
  reducers: {
    addLine(state, action: PayloadAction<any>) {
      return { ...state, lines: [ ...state.lines, action.payload ] }
    },
    deleteLine(state, action: PayloadAction<any>) {
      return {
        ...state,
        lines: state.lines.filter(line => line.text != action.payload)
      }
    },
    updateLine(state, action: PayloadAction<string>) {
      state.lines[state.activeLine].text = action.payload;
    },
    updateAllLines(state, action: PayloadAction<any>) {
      return { ...state, lines: action.payload }
    },
    activateLine(state, action: PayloadAction<number>) {
      return { ...state, activeLine: action.payload }
    },
    addPanelStep(state, action: PayloadAction<object>) {
      state.lines[action.payload.number].panel.push(action.payload.step);
    },
    updatePanelStep(state, action: PayloadAction<object>) {
      const panelNumber = action.payload.number;
      const stepNumber = action.payload.step.num;
      const offset = action.payload.step.offset;
      state.lines[panelNumber].panel[stepNumber].offset = offset;
    },
    deletePanelStep: (state, action: PayloadAction<object>) => {
      state.lines[action.payload.lineNumber].panel.splice(action.payload.chordNumber, 1);
    },
  }
});

export const {
  addLine,
  deleteLine,
  updateLine,
  updateAllLines,
  activateLine,
  addPanelStep,
  updatePanelStep,
  deletePanelStep,
} =  lyricsSlice.actions;

export const lyricLines = ({ lyrics: { lines }}: RootState): any[] => lines;
export const theActiveLine = ({ lyrics: { activeLine }}: RootState): any[] => activeLine;

export default lyricsSlice.reducer;
