import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface LibraryState {
  chords: any[];
  chordIds: string[];
  grabbed: object;
}

export const libraryInitialState: LibraryState = {
  chords: JSON.parse(localStorage.getItem('chords')),
  chordIds: localStorage.getItem('chordIds').split(',').map(id => { return parseInt(id) }),
  grabbed: {
    name: '',
    noteids: ''
  }
};

export const librarySlice = createSlice({
  initialState: libraryInitialState,
  name: 'library',
  reducers: {
    setLibraryChords(state, action: Payload<any>) {
      state.chords = action.payload;
    },
    setGrabbed(state,  action: PaloadAction<object>) {
      state.grabbed = action.payload;
    },
  }
});

export const { setLibraryChords, setGrabbed } = librarySlice.actions;
export const libraryChords = ({ library: { chords }}: RootState): any[] => chords;
export const theChordIds = ({ library: { chordIds }}: RootState): any[] => chordIds;
export const libChord = ({ library: { grabbed }}: RootState): object => grabbed;
export default librarySlice.reducer;
