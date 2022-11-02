import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface FretboardState {
  riffen: string;
  mode: string;
}

export const fretboardInitialState: FretboardState = {
  riffen: '',
  mode: 'chord',
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
export const theRiffen = ({ fretboard: { riffen }}: RootState): string => riffen;
export const theMode = ({ fretboard: { mode }}: RootState): string => mode;
export default fretboardSlice.reducer;
