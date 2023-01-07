import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

import sequenceReducer, { sequenceInitialState } from './slices/sequence-slice';
import libraryReducer, { libraryInitialState } from './slices/library-slice';
import fretboardReducer, { fretboardInitialState } from './slices/fretboard-slice';
import lyricsReducer, { lyricsInitialState } from './slices/lyrics-slice';
import viewReducer, { viewInitialState } from './slices/view-slice';
import songRecuder, { songInitialState } from './slices/song-slice';

const store = configureStore({
  reducer: {
    sequence: sequenceReducer,
    library: libraryReducer,
    fretboard: fretboardReducer,
    lyrics: lyricsReducer,
    view: viewReducer,
    song: songReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, null, AnyAction>;

export const RootInitialState: RootState = {
  sequence: sequenceInitialState,
  library: libraryInitialState,
  fretboard: fretboardInitialState,
  lyrics: lyricsInitialState,
  view: viewInitialState,
  song: songIntialState,
};

export default store;
