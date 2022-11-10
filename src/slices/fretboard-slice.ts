import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface FretboardState {
  frets: number[];
  strings: number[];
  mode: string;
  riffen: any;
  riffNums: number[];
}

export const fretboardInitialState: FretboardState = {
  frets: new Array(22).fill(0),
  strings: new Array(6).fill(0),
  mode: 'chord',
  riffen: '',
  riffNums: new Array(17).fill(0).map((n, i) => { return i })
};

export const fretboardSlice = createSlice({
  initialState: fretboardInitialState,
  name: 'fretboard',
  reducers: {
    setRiffen(state, action: PayloadAction<string>) {
      state.riffen = action.payload;
    },
    setMode(state, action: PayloadAction<string>) {
      state.mode = action.payload;
    },
  }
});

export const { setRiffen, setMode } = fretboardSlice.actions;
export const theRiffen = ({ fretboard: { riffen }}: RootState): any => riffen;
export const theMode = ({ fretboard: { mode }}: RootState): string => mode;
export const theRiffNums = ({ fretboard: { riffNums }}: RootState): any[] => riffNums;
export const theStrings = ({ fretboard: { strings }}: RootState): number[] => strings;
export const theFrets = ({ fretboard: { frets }}: RootState): any[] => frets;
export default fretboardSlice.reducer;
