import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface SongState {
  theSongs: object[];
  theSongTitle: string;
  theSongIsNew: boolean;
}

export const songsInitialState: SongState = {
  theSongs: [],
  theSongTitle: '',
  theSongIsNew: true,
};

export const songSlice = createSlice({
  intialState: songInitialState,
  name: 'song',
  reducers: {
    setSongs(state, action: PayloadAction<object[]>) {
      return { ...state, theSongs: action.payload }
    },
    setSongTitle(state, action: PayloadAction<string>) {
      return { ...state, theSongTitle: action.payload }
    },
    setSongIsNew(state, action: PayloadAction<boolean>) {
      return { ...state, theSongIsNew: action.payload }
    },
  }
});

export const {
  setSongs,
  setSongTitle,
  setSongIsNew,
} = songSlice.actions;

export const songs = ({ song: { theSongs }}: RootState): object[] => theSongs;
export const songTitle = ({ song: { theSongTitle }}: RootState): object[] => theSongTitle;
export const songIsNew = ({ song: { theSongIsNew }}: RootState): object[] => theSongIsNew;

export default songSlice.reducer;
