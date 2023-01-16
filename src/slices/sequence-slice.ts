import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface SequenceState {
  steps: object[];
  activeStep: number;
  stepName: string;
  stepTitles: string[];
  action: string;
  isDiagram: boolean;
}

export const sequenceInitialState: SequenceState = {
  steps: [],
  activeStep: null,
  stepName: '',
  stepTitles: [],
  action: '',
  isDiagram: false,
};

export const sequenceSlice = createSlice({
  initialState: sequenceInitialState,
  name: 'sequence',
  reducers: {
    setSteps(state, action: PayloadAction<object[]>) {
      console.log(action.payload.map(step => { return step.title }));
      return {
        ...state,
        steps: action.payload,
        stepTitles: action.payload.map(step => { return step.title }),
        activeStep: null
      }
    },
    addStep(state, action: PayloadAction<object>) {
      if (!state.stepTitles.includes(action.payload.title)) {
        return { 
          ...state, 
          steps: [...state.steps, action.payload],
          stepTitles: [...state.stepTitles, action.payload.title]
        }
      }
    },
    deleteStep(state) {
      return {
        ...state,
        steps: state.steps.filter((s, i) => i != state.activeStep),
        stepTitle: state.stepTitles.filter((s, i) => i != state.activeStep),
        stepName: '',
        activeStep: null
      }
      // state.steps = state.steps.filter((s, i) => i != state.activeStep);
      // state.activeStep = null;
      // state.stepName = '';
    },
    updateStep(state, action: PayloadAction<object>) {
      state.steps[state.activeStep] = action.payload;
    },
    setActiveStep(state, action: PayloadAction<number>) {
      return { ...state, activeStep: action.payload }
    },
    setStepName(state, action: PayloadAction<string>) {
      state.stepName = action.payload;
    },
    resetStepName(state, action: PayloadAction<string>) {
      state.steps[state.activeStep].title = action.payload;
      state.stepName = action.payload;
    },
    setActionText(state, action: PayloadAction<string>) {
      state.action = action.payload;
    },
    toggleStepStyle(state, action: PayloadAction<boolean>) {
      return { ...state, isDiagram: action.payload }
    },
    clearSequence(state) {
      state.steps = [];
    },
  }
});

export const {
  setSteps,
  addStep,
  deleteStep,
  updateStep,
  setActiveStep,
  setStepName,
  resetStepName,
  setActionText,
  toggleStepStyle,
  clearSequence,
 } = sequenceSlice.actions;

export const theSteps = ({ sequence: { steps }}: RootState): object[] => steps;
export const theActiveStep = ({ sequence: { activeStep }}: RootState): number => activeStep;
export const theStepName = ({ sequence: { stepName }}: RootState): string => stepName;
export const theAction = ({ sequence: { action }}: RootState): string => action;
export const stepIsDiagram = ({ sequence: { isDiagram }}: RootState): boolean => isDiagram;

export default sequenceSlice.reducer;
