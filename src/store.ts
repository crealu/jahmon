import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

import sequenceReducer, { sequenceInitialState } from './slices/sequence-slice';
import libraryReducer, { libraryInitialState } from './slices/library-slice';
import fretboardReducer, { fretboardInitialState } from './slices/fretboard-slice';

const store = configureStore({
  reducer: {
    sequence: sequenceReducer,
    library: libraryReducer,
    fretboard: fretboardReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, null, AnyAction>;

export const RootInitialState: RootState = {
  sequence: sequenceInitialState,
  library: libraryInitialState,
  fretboard: fretboardInitialState,
};

export default store;
