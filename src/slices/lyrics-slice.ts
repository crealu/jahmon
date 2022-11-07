import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface LyricsState {
  lines: any[];
}

export const lyricsInitialState: LyricsState = {
  lines: [],
};

export const lyricsSlice = createSlice({
  initialState:  lyricsInitialState,
  name: 'lyrics',
  reducers: {
    addLine(state, action: PayloadAction<any>) {
      state.lines = [...state.lines, action.payload]
    },
    updateLines(state, action: PayloadAction<any>) {
      state.lines = action.payload
    },
  }
});

export const { addLine, updateLines } =  lyricsSlice.actions;
export const lyricLines = ({ lyrics: { lines }}: RootState): any[] => lines;
export default lyricsSlice.reducer;
