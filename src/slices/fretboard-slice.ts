import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface FretboardState {
  mode: string;
  riffen: any;
  snapshot: string[];
  snapshotName: string;
  finVisible: boolean;
  finCoords: number[];
}

export const fretboardInitialState: FretboardState = {
  mode: 'chord',
  riffen: '',
  snapshot: [],
  snapshotName: '',
  finVisible: false,
  finCoords: [0, 0],
};

export const fretboardSlice = createSlice({
  initialState: fretboardInitialState,
  name: 'fretboard',
  reducers: {
    setRiffen(state, action: PayloadAction<object>) {
      return {...state, riffen: action.payload};
    },
    setMode(state, action: PayloadAction<string>) {
      return {...state, mode: action.payload};
    },
    addToSnapshot(state, action: PayloadAction<string>) {
      return {...state, snapshot: [...state.snapshot, action.payload]};
    },
    removeFromSnapshot(state, action: PayloadAction<string>) {
      return {
        ...state,
        snapshot: state.snapshot.filter(s => s != action.payload)
      }
    },
    clearSnapshot(state) {
      return {...state, snapshot: []};
    },
    setSnapshotName(state, action: PayloadAction<string>) {
      return {...state, snapshotName: action.payload};
    },
    toggleFin(state) {
      let visiblity = !state.finVisible;
      // state.finVisible = visiblity;
      // // console.log(visiblity);
      return { ...state, finVisible: visiblity };
    },
    setFinCoords(state, action: PayloadAction<number[]>) {
      return { ...state, finCoords: action.payload }
    }
  }
});

export const {
  setRiffen,
  setMode,
  addToSnapshot,
  removeFromSnapshot,
  setSnapshotName,
  clearSnapshot,
  toggleFin,
  setFinCoords
 } = fretboardSlice.actions;

export const theRiffen = ({ fretboard: { riffen }}: RootState): any => riffen;
export const theMode = ({ fretboard: { mode }}: RootState): string => mode;
export const theSnapshot = ({ fretboard: { snapshot }}: RootState): string[] => snapshot;
export const theSnapshotName = ({ fretboard: { snapshotName }}: RootState): string => snapshotName;
export const finIsVisible = ({ fretboard: { finVisible }}: RootState): boolean => finVisible;
export const theFinCoords = ({ fretboard: { finCoords }}: RootState): number[] => finCoords;

export default fretboardSlice.reducer;
