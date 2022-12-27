import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface LyricsState {
  lines: any[];
  activeLine: number;
}

export const lyricsInitialState: LyricsState = {
  lines: [{ text: '..lyrics..', panel: [{ chord: '', offset: ''}]}],
  activeLine: 0,
};

export const lyricsSlice = createSlice({
  initialState:  lyricsInitialState,
  name: 'lyrics',
  reducers: {
    addLine(state, action: PayloadAction<any>) {
      // state.lines = [...state.lines, action.payload]
      return {
        ...state,
        lines: [ ...state.lines, action.payload ]
      }
    },
    deleteLine(state, action: PayloadAction<any>) {
      // state.lines = state.lines.filter(line => line.text != action.payload )
      return {
        ...state,
        lines: state.lines.filter(line => line.text != action.payload)
      }
    },
    updateLine(state, action: PayloadAction<string>) {
      state.lines[state.activeLine].text = action.payload;
      // let updatedLines = state.lines;
      // updatedLines[state.activeLine].text = action.payload;
      // return {
      //   ...state,
      //   lines: updatedLines
      // }
    },
    updateAllLines(state, action: PayloadAction<any>) {
      return {
        ...state,
        lines: action.payload
      }
    },
    activateLine(state, action: PayloadAction<number>) {
      return {
        ...state,
        activeLine: action.payload
      }
    },
    addPanelStep(state, action: PayloadAction<object>) {
      state.lines[action.payload.number].panel.push(action.payload.step);
    },
    updatePanelStep(state, action: PayloadAction<object>) {
      state.lines[action.payload.number].panel[action.payload.step.num].offset = action.payload.step.offset
    },
    deletePanelStep(state, action: PayloadAction<any>) {
      state.lines[state.activeLine].panel.filter(p => p.chord != action.payload);
    }
  }
});

export const {
  addLine,
  deleteLine,
  updateLine,
  updateAllLines,
  activateLine,
  addPanelStep,
  updatePanelStep,
  deletePanelStep,
} =  lyricsSlice.actions;
export const lyricLines = ({ lyrics: { lines }}: RootState): any[] => lines;
export const theActiveLine = ({ lyrics: { activeLine }}: RootState): any[] => activeLine;
export default lyricsSlice.reducer;
