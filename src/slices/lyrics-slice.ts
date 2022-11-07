import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface LyricsState {
  lines: any[];
  activeLine: number;
}

export const lyricsInitialState: LyricsState = {
  lines: [],
  activeLine: 0,
};

export const lyricsSlice = createSlice({
  initialState:  lyricsInitialState,
  name: 'lyrics',
  reducers: {
    addLine(state, action: PayloadAction<any>) {
      state.lines = [...state.lines, action.payload]
    },
    updateLine(state, action: PayloadAction<string>) {
      state.lines[state.activeLine].text = action.payload;
    },
    updateAllLines(state, action: PayloadAction<any>) {
      state.lines = action.payload;
    },
    activateLine(state, action: PayloadAction<number>) {
      state.activeLine = action.payload;
    },
    addStepToPanel(state, action: PayloadAction<object>) {
      state.lines[state.activeLine].panel.push(action.payload);
    },
    updatePanelStep(state, action: PayloadAction<any>) {
      state.lines[state.activeLine].panel[action.payload.num].offset = action.payload.offset
    },
  }
});

export const {
  addLine,
  updateLine,
  updateAllLines,
  activateLine,
  addStepToPanel,
  updatePanelStep,
} =  lyricsSlice.actions;
export const lyricLines = ({ lyrics: { lines }}: RootState): any[] => lines;
export const theActiveLine = ({ lyrics: { activeLine }}: RootState): any[] => activeLine;
export default lyricsSlice.reducer;
