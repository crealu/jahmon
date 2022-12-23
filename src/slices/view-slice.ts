import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface ViewState {
  saveSequence: boolean;
  saveStep: boolean;
  settings: boolean;
  print: boolean;
  currentScreen: string;
  currentBook: string;
  currentMenu: string;
}

export const viewInitialState: ViewState = {
  saveSequence: false,
  saveStep: false,
  settings: false,
  print: false,
  currentScreen: 'base',
  currentBook: 'songs',
  currentMenu: 'Library',
};

export const viewSlice = createSlice({
  initialState: viewInitialState,
  name: 'view',
  reducers: {
    toggleSaveSequence(state, action: PayloadAction<boolean>) {
      return { ...state, saveSequence: action.payload };
    },
    toggleSaveStep(state, action: PayloadAction<boolean>) {
      return { ...state, saveStep: action.payload };
    },
    toggleSettings(state, action: PayloadAction<boolean>) {
      return { ...state, settings: action.payload };
    },
    togglePrint(state, action: PayloadAction<boolean>) {
      return { ...state, print: action.payload };
    },
    setCurrentScreen(state, action: PayloadAction<string>) {
      return { ...state, currentScreen: action.payload }
    },
    setCurrentMenu(state, action: PayloadAction<string>) {
      return { ...state, currentMenu: action.payload }
    },
  }
});

export const {
  toggleSaveSequence,
  toggleSaveStep,
  toggleSettings,
  togglePrint,
  setCurrentScreen,
  setCurrentMenu,
} = viewSlice.actions;

export const isSavingSeq = ({ view: { saveSequence }}: RootState): boolean => saveSequence;
export const isSavingStep = ({ view: { saveStep }}: RootState): boolean => saveStep;
export const isSettings = ({ view: { settings }}: RootState): boolean => settings;
export const isPrinting = ({ view: { print }}: RootState): boolean => print;
export const theScreen = ({ view: { currentScreen }}: RootState): boolean => currentScreen;
export const theBook = ({ view: { currentBook }}: RootState): boolean => currentBook;
export const theMenu = ({ view: { currentMenu }}: RootState): string => currentMenu;

export default viewSlice.reducer;
