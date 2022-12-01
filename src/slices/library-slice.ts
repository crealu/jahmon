import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface LibraryState {
  chordName: string;
  chords: any[];
  chordIds: string[];
  grabbed: object;
}

export const libraryInitialState: LibraryState = {
  chordName: '',
  chords: [],
  chordIds: [],
  grabbed: {
    name: '',
    noteids: ''
  }
};

export const librarySlice = createSlice({
  initialState: libraryInitialState,
  name: 'library',
  reducers: {
    setChordName(state,  action: PayloadAction<string>) {
      state.chordName = action.payload;
    },
    setLibraryChords(state, action: PayloadAction<any[]>) {
      state.chords = action.payload;
    },
    setChordIds(state, action: PayloadAction<string[]>) {
      state.chordIds = action.payload;
    },
    setGrabbed(state,  action: PayloadAction<object>) {
      state.grabbed = action.payload;
    },
  }
});

export const { setLibraryChords, setChordIds, setGrabbed, setChordName } = librarySlice.actions;
export const theChordName = ({ library: { chordName }}: RootState): string => chordName;
export const theChords = ({ library: { chords }}: RootState): any[] => chords;
export const theChordIds = ({ library: { chordIds }}: RootState): any[] => chordIds;
export const libChord = ({ library: { grabbed }}: RootState): object => grabbed;
export default librarySlice.reducer;
