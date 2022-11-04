import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface SequenceState {
  inputTest: string;
  steps: any[];
  title: string;
  activeStep: number;
  save: boolean;
  isNew: boolean;
}

export const sequenceInitialState: SequenceState = {
  inputTest: '',
  steps: [],
  title: '',
  activeStep: 0,
  save: false,
  isNew: false,
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
    removeStep(state) {
      state.steps.splice(state.activeStep, 1);
    },
    clearSequence(state) {
      state.steps = [];
    },
    toggleSave(state, action: PayloadAction<boolean>) {
      state.save = action.payload;
    },
    setIsNew(state, action: Payload<boolean>) {
      state.isNew = action.payload;
    },
    addStep(state, action: Payload<object>) {
      state.steps = [...state.steps, action.payload];
    },
  }
});

export const {
  changeSequenceName,
  setActiveSequence,
  setActiveStep,
  removeStep,
  clearSequence,
  toggleSave,
  addStep,
 } = sequenceSlice.actions;

export const inputTest = ({ sequence: { inputTest }}: RootState): string => inputTest;
export const currentTitle = ({ sequence: { title }}: RootState): string => title;
export const currentSeq = ({ sequence: { steps }}: RootState): any[] => steps;
export const theActiveStep = ({ sequence: { activeStep }}: RootState): number => activeStep;
export const isSaving = ({ sequence: { save }}: RootState): boolean => save;
export const seqIsNew = ({ sequence: { isNew }}: RootState): boolean => isNew;

export default sequenceSlice.reducer;
