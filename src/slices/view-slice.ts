import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface ViewState {
  saveSong: boolean;
  saveStep: boolean;
  settings: boolean;
  currentScreen: string;
  currentMenu: string;
}

export const viewInitialState: ViewState = {
  saveSong: false,
  saveStep: false,
  settings: false,
  currentScreen: 'base',
  currentMenu: 'Library',
};

export const viewSlice = createSlice({
  initialState: viewInitialState,
  name: 'view',
  reducers: {
    toggleSaveSequence(state, action: PayloadAction<boolean>) {
      return { ...state, saveSong: action.payload };
    },
    toggleSaveStep(state, action: PayloadAction<boolean>) {
      return { ...state, saveStep: action.payload };
    },
    toggleSettings(state, action: PayloadAction<boolean>) {
      return { ...state, settings: action.payload };
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
  setCurrentScreen,
  setCurrentMenu,
} = viewSlice.actions;

export const isSavingSong = ({ view: { saveSong }}: RootState): boolean => saveSong;
export const isSavingStep = ({ view: { saveStep }}: RootState): boolean => saveStep;
export const isSettings = ({ view: { settings }}: RootState): boolean => settings;
export const theScreen = ({ view: { currentScreen }}: RootState): boolean => currentScreen;
export const theMenu = ({ view: { currentMenu }}: RootState): string => currentMenu;

export default viewSlice.reducer;
