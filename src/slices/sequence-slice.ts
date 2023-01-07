import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface SequenceState {
  steps: any[];
  title: string;
  activeStep: number;
  isNew: boolean;
  stepName: string;
  action: string;
  isFretsnap: boolean;
  sequences: object[];
}

export const sequenceInitialState: SequenceState = {
  steps: [],
  title: '',
  activeStep: null,
  isNew: true,
  stepName: '',
  action: '',
  isFretsnap: false,
  sequences: [],
};

export const sequenceSlice = createSlice({
  initialState: sequenceInitialState,
  name: 'sequence',
  reducers: {
    addStep(state, action: PayloadAction<object>) {
      return {...state, steps: [...state.steps, action.payload]}
      // state.steps = [...state.steps, action.payload];
    },
    deleteStep(state) {
      state.steps = state.steps.filter((s, i) => i != state.activeStep);
      state.activeStep = null;
      state.stepName = '';
    },
    updateStep(state, action: PayloadAction<object>) {
      state.steps[state.activeStep] = action.payload;
    },
    setActiveSequence(state, action: PayloadAction<object>) {
      state.title = action.payload.title;
      state.steps = action.payload.steps;
    },
    setCurrentTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setActiveStep(state, action: PayloadAction<number>) {
      // state.activeStep = action.payload;
      return {
        ...state,
        activeStep: action.payload
      }
    },
    setStepName(state, action: PayloadAction<string>) {
      state.stepName = action.payload;
    },
    resetStepName(state, action: PayloadAction<string>) {
      state.steps[state.activeStep].title = action.payload;
      state.stepName = action.payload;
    },
    clearSequence(state) {
      state.steps = [];
    },
    setIsNew(state, action: PayloadAction<boolean>) {
      state.isNew = action.payload;
    },
    setActionText(state, action: PayloadAction<string>) {
      state.action = action.payload;
    },
    toggleFretsnap(state, action: PayloadAction<boolean>) {
      state.isFretsnap = action.payload;
    },
    setAllSequences(state, action: PayloadAction<object[]>) {
      state.sequences = action.payload;
    },
  }
});

export const {
  addStep,
  deleteStep,
  updateStep,
  setActiveSequence,
  setActiveStep,
  clearSequence,
  setIsNew,
  setCurrentTitle,
  setStepName,
  resetStepName,
  setActionText,
  toggleFretsnap,
  setAllSequences,
 } = sequenceSlice.actions;

export const currentTitle = ({ sequence: { title }}: RootState): string => title;
export const currentSeq = ({ sequence: { steps }}: RootState): any[] => steps;
export const theActiveStep = ({ sequence: { activeStep }}: RootState): number => activeStep;
export const seqIsNew = ({ sequence: { isNew }}: RootState): boolean => isNew;
export const theStepName = ({ sequence: { stepName }}: RootState): string => stepName;
export const theAction = ({ sequence: { action }}: RootState): string => action;
export const seqIsFretsnap = ({ sequence: { isFretsnap }}: RootState): boolean => isFretsnap;
export const allSequences = ({ sequence: { sequences }}: RootState): object[] => sequences;

export default sequenceSlice.reducer;
