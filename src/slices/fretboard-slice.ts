import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface FretboardState {
  frets: number[];
  strings: number[];
  mode: string;
  riffen: any;
  riffNums: number[];
  snapshot: string[];
  snapshotName: string;
}

export const fretboardInitialState: FretboardState = {
  frets: new Array(22).fill(0),
  strings: new Array(6).fill(0),
  mode: 'chord',
  riffen: '',
  riffNums: new Array(21).fill(0).map((n, i) => { return i }),
  snapshot: [],
  snapshotName: '',
};

export const fretboardSlice = createSlice({
  initialState: fretboardInitialState,
  name: 'fretboard',
  reducers: {
    setRiffen(state, action: PayloadAction<object>) {
      // return {...state, riffen: action.payload };
      state.riffen = action.payload;
    },
    setMode(state, action: PayloadAction<string>) {
      // return {...state, mode: action.payload };
      state.mode = action.payload;
    },
    addToSnapshot(state, action: PayloadAction<string>) {
      state.snapshot = [...state.snapshot, action.payload];
    },
    removeFromSnapshot(state, action: PayloadAction<string>) {
      state.snapshot = state.snapshot.filter(s => s != action.payload);
    },
    clearSnapshot(state) {
      state.snapshot = [];
    },
    setSnapshotName(state, action: PayloadAction<string>) {
      state.snapshotName = action.payload;
    },
  }
});

export const {
  setRiffen,
  setMode,
  addToSnapshot,
  removeFromSnapshot,
  setSnapshotName,
  clearSnapshot,
 } = fretboardSlice.actions;

export const theRiffen = ({ fretboard: { riffen }}: RootState): any => riffen;
export const theMode = ({ fretboard: { mode }}: RootState): string => mode;
export const theRiffNums = ({ fretboard: { riffNums }}: RootState): any[] => riffNums;
export const theStrings = ({ fretboard: { strings }}: RootState): number[] => strings;
export const theFrets = ({ fretboard: { frets }}: RootState): any[] => frets;
export const theSnapshot = ({ fretboard: { snapshot }}: RootState): string[] => snapshot;
export const theSnapshotName = ({ fretboard: { snapshotName }}: RootState): string => snapshotName;

export default fretboardSlice.reducer;
