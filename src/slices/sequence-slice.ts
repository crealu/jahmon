import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface SequenceState {
  steps: any[];
  title: string;
  activeStep: number;
  save: boolean;
  isNew: boolean;
  settings: boolean;
  stepName: string;
  action: string;
  print: boolean;
}

export const sequenceInitialState: SequenceState = {
  steps: [],
  title: '',
  activeStep: null,
  save: false,
  isNew: true,
  settings: false,
  print: false,
  stepName: '',
  action: '',
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
    toggleSave(state, action: PayloadAction<boolean>) {
      state.save = action.payload;
    },
    toggleSettings(state, action: PayloadAction<boolean>) {
      state.settings = action.payload;
    },
    togglePrint(state, action: Payload<boolean>) {
      state.print = action.payload;
    },
    setActiveSequence(state, action: PayloadAction<object>) {
      state.title = action.payload.title;
      state.steps = action.payload.steps;
    },
    setCurrentTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setActiveStep(state, action: PayloadAction<number>) {
      state.activeStep = action.payload;
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
    }
  }
});

export const {
  addStep,
  deleteStep,
  updateStep,
  setActiveSequence,
  setActiveStep,
  clearSequence,
  toggleSave,
  toggleSettings,
  setIsNew,
  setCurrentTitle,
  setStepName,
  resetStepName,
  setActionText,
  togglePrint
 } = sequenceSlice.actions;

export const currentTitle = ({ sequence: { title }}: RootState): string => title;
export const currentSeq = ({ sequence: { steps }}: RootState): any[] => steps;
export const theActiveStep = ({ sequence: { activeStep }}: RootState): number => activeStep;
export const isSaving = ({ sequence: { save }}: RootState): boolean => save;
export const isSettings = ({ sequence: { settings }}: RootState): boolean => settings;
export const isPrinting = ({ sequence: { print }}: RootState): boolean => print;
export const seqIsNew = ({ sequence: { isNew }}: RootState): boolean => isNew;
export const theStepName = ({ sequence: { stepName }}: RootState): string => stepName;
export const theAction = ({ sequence: { action }}: RootState): string => action;

export default sequenceSlice.reducer;
