import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface LibraryState {
  test: string;
  chords: any[];
  grabbed: object;
}

export const libraryInitialState: LibraryState = {
  chords: [],
  test: 'hey',
  grabbed: {
    name: '',
    noteids: ''
  }
};

export const librarySlice = createSlice({
  initialState: libraryInitialState,
  name: 'library',
  reducers: {
    changeLibrary(state) {
      console.log('hi');
    },
    setLibraryChords(state, action: Payload<any>) {
      state.chords = action.payload;
    },
    setGrabbed(state,  action: PaloadAction<object>) {
      state.grabbed = action.payload;
    },
  }
});

export const { changelibrary, setLibraryChords, setGrabbed } = librarySlice.actions;
export const libraryChords = ({ library: { chords }}: RootState): any[] => chords;
export const libChord = ({ library: { grabbed }}: RootState): object => grabbed;
export default librarySlice.reducer;
