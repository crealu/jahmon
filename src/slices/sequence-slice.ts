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
}

export const sequenceInitialState: SequenceState = {
  steps: [],
  title: '',
  activeStep: null,
  save: false,
  isNew: true,
  settings: false,
  stepName: '',
};

export const sequenceSlice = createSlice({
  initialState: sequenceInitialState,
  name: 'sequence',
  reducers: {
    addStep(state, action: Payload<object>) {
      state.steps = [...state.steps, action.payload];
    },
    deleteStep(state) {
      console.log(state.activeStep);
      state.steps = state.steps.filter((s, i) => i != state.activeStep);
      state.activeStep = null;
      state.stepName = '';
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
    toggleSave(state, action: PayloadAction<boolean>) {
      state.save = action.payload;
    },
    setIsNew(state, action: Payload<boolean>) {
      state.isNew = action.payload;
    },
    toggleSettings(state, action: Payload<boolean>) {
      state.settings = action.payload;
    }
  }
});

export const {
  addStep,
  deleteStep,
  setActiveSequence,
  setActiveStep,
  clearSequence,
  toggleSave,
  toggleSettings,
  setIsNew,
  setCurrentTitle,
  setStepName,
  resetStepName
 } = sequenceSlice.actions;

export const currentTitle = ({ sequence: { title }}: RootState): string => title;
export const currentSeq = ({ sequence: { steps }}: RootState): any[] => steps;
export const theActiveStep = ({ sequence: { activeStep }}: RootState): number => activeStep;
export const isSaving = ({ sequence: { save }}: RootState): boolean => save;
export const isSettings = ({ sequence: { settings }}: RootState): boolean => settings;
export const seqIsNew = ({ sequence: { isNew }}: RootState): boolean => isNew;
export const theStepName = ({ sequence: { stepName }}: RootState): string => stepName;

export default sequenceSlice.reducer;
