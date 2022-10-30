import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

import sequenceReducer, { sequenceInitialState } from './slices/sequence-slice';
import libraryReducer, { libraryInitialState } from './slices/library-slice';

const store = configureStore({
  reducer: {
    sequence: sequenceReducer,
    library: libraryReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, null, AnyAction>;

export const RootInitialState: RootState = {
  sequence: sequenceInitialState,
  library: libraryInitialState,
};

export default store;
