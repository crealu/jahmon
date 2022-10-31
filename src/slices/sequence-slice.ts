import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface SequenceState {
  inputTest: string;
  steps: any[];
  title: string;
}

export const sequenceInitialState: SequenceState = {
  inputTest: '',
  steps: [],
  title: '',
};

export const sequenceSlice = createSlice({
  initialState: sequenceInitialState,
  name: 'sequence',
  reducers: {
    changeSequenceName(state, action: PayloadAction<string>) {
      state.inputTest = action.payload;
    },
    setCurrentSequence(state, action: PayloadAction<object>) {
      state.title = action.payload.title;
      state.steps = action.payload.steps;
    }
  }
});

export const {
  changeSequenceName,
  setCurrentSequence
 } = sequenceSlice.actions;
export const inputTest = ({ sequence: { inputTest }}: RootState): string => inputTest;
export const currentTitle = ({ sequence: { title }}: RootState): string => title;
export const currentSeq = ({ sequence: { steps }}: RootState): any[] => steps;
export default sequenceSlice.reducer;
