import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface SequenceState {
  inputTest: string;
  steps: any[];
  title: string;
  activeStep: number;
}

export const sequenceInitialState: SequenceState = {
  inputTest: '',
  steps: [],
  title: '',
  activeStep: 0,
};

export const sequenceSlice = createSlice({
  initialState: sequenceInitialState,
  name: 'sequence',
  reducers: {
    changeSequenceName(state, action: PayloadAction<string>) {
      state.inputTest = action.payload;
    },
    setActiveSequence(state, action: PayloadAction<object>) {
      state.title = action.payload.title;
      state.steps = action.payload.steps;
    },
    setActiveStep(state, action: PayloadAction<number>) {
      state.activeStep = action.payload;
    },
  }
});

export const {
  changeSequenceName,
  setActiveSequence,
  setActiveStep,
 } = sequenceSlice.actions;
export const inputTest = ({ sequence: { inputTest }}: RootState): string => inputTest;
export const currentTitle = ({ sequence: { title }}: RootState): string => title;
export const currentSeq = ({ sequence: { steps }}: RootState): any[] => steps;
export const theActiveStep = ({ sequence: { activeStep }}: RootState): number => activeStep;
export default sequenceSlice.reducer;
