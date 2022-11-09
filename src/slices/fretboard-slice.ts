import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface FretboardState {
  riffen: any;
  mode: string;
  riffNums: number[];
}

export const fretboardInitialState: FretboardState = {
  riffen: '',
  mode: 'chord',
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

export const { setRiffen, setMode, updateRiffNotes, setActiveRiffNote, resetRiffNums } = fretboardSlice.actions;
export const theRiffen = ({ fretboard: { riffen }}: RootState): any => riffen;
export const theMode = ({ fretboard: { mode }}: RootState): string => mode;
export const theRiffNums = ({ fretboard: { riffNums }}: RootState): any[] => riffNums;
export default fretboardSlice.reducer;
