import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface SequenceState {
  name: string;
  steps: any[];
}

export const sequenceInitialState: SequenceState = {
  name: '',
  steps: [],
};

export const sequenceSlice = createSlice({
  initialState: sequenceInitialState,
  name: 'sequence',
  reducers: {
    changeSequenceName(state, action: PayloadAction<string>) {
      state.name = action.payload;
      console.log('name was changed');
    },
  }
});

export const { changeSequenceName } = sequenceSlice.actions;
export const sequenceName = ({ sequence: { name }}: RootState): string => name;
export default sequenceSlice.reducer;
