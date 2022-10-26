import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

import sequenceReducer, { sequenceInitialState } from './slices/sequence-slice';

const store = configureStore({
  reducer: {
    sequence: sequenceReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, null, AnyAction>;

export const RootInitialState: RootState = {
  sequence: sequenceInitialState,
};

export default store;
