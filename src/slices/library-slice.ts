import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface LibraryState {
  test: string;
  chords: any[];
}

export const libraryInitialState: LibraryState = {
  chords: [
    {
			name: "A",
			noteids: ["s6f0","s5f2","s4f2","s3f2","s2f0"]
		},
		{
			name: "Am",
			noteids: ["s6f0","s5f1","s4f2","s3f2","s2f0"]
		},
		{
			name: "Am7",
			noteids: ["s6f0","s5f1","s4f0","s3f2","s2f0"]
		},
		{
			name: "Asus4",
			noteids: ["s6f0","s5f3","s4f2","s3f2","s2f0"]
		}
  ],
  test: 'hey'
};

export const librarySlice = createSlice({
  initialState: libraryInitialState,
  name: 'library',
  reducers: {
    changeLibrary(state) {
      console.log('hi');
    },
  }
});

export const { changelibrary } = librarySlice.actions;
export const libraryChords = ({ library: { chords }}: RootState): any[] => chords;
export default librarySlice.reducer;
