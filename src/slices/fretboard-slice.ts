import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface FretboardState {
  movedRiffNumber: string;
}

export const fretboardInitialState: FretboardState = {
  movedRiffNumber: '',
};

export const fretboardSlice = createSlice({
  initialState: fretboardInitialState,
  name: 'fretboard',
  reducers: {
    setMovedRiffNumber(state, action: PayloadAction<string>) {
      state.movedRiffNumber = action.payload;
    },
  }
});

export const { setMovedRiffNumber } = fretboardSlice.actions;
export const moved = ({ fretboard: { movedRiffNumber }}: RootState): string => movedRiffNumber;
export default fretboardSlice.reducer;
