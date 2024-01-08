import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface SongState {
  songs: object[];
  songTitle: string;
  isNew: boolean;
}

export const songInitialState: SongState = {
  songs: [],
  songTitle: '',
  isNew: true,
};

export const songSlice = createSlice({
  initialState: songInitialState,
  name: 'song',
  reducers: {
    setSongs(state, action: PayloadAction<object[]>) {
      return { ...state, songs: action.payload }
    },
    setSongTitle(state, action: PayloadAction<string>) {
      return { ...state, songTitle: action.payload }
    },
    setIsNew(state, action: PayloadAction<boolean>) {
      return { ...state, isNew: action.payload }
    },
  }
});

export const {
  setSongs,
  setSongTitle,
  setIsNew,
} = songSlice.actions;

export const theSongs = ({ song: { songs }}: RootState): object[] => songs;
export const theSongTitle = ({ song: { songTitle }}: RootState): string => songTitle;
export const newSong = ({ song: { isNew }}: RootState): boolean => isNew;

export default songSlice.reducer;
