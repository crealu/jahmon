import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface LibraryState {
  chordName: string;
  chords: any[];
  chordIds: string[];
  trueIds: string[];
  grabbed: object;
  diagramNotes: string[];
  diagramName: string;
  diagramMode: string;
}

export const libraryInitialState: LibraryState = {
  chordName: '',
  chords: [],
  chordIds: [],
  trueIds: [],
  grabbed: { name: '', noteids: '' },
  diagramNotes: [],
  diagramName: '...',
  diagramMode: 'chord'
};

export const librarySlice = createSlice({
  initialState: libraryInitialState,
  name: 'library',
  reducers: {
    setChordName(state,  action: PayloadAction<string>) {
      return { ...state, chordName: action.payload }
    },
    setLibraryChords(state, action: PayloadAction<any[]>) {
      return { ...state, chords: action.payload }
    },
    setChordIds(state, action: PayloadAction<string[]>) {
      return {
        ...state,
        chordIds: action.payload,
        trueIds: action.payload.toString().split(',').map(id => { return parseInt(id) })
      }
    },
    setGrabbed(state, action: PayloadAction<object>) {
      return { ...state, grabbed: action.payload }
    },
    setDiagramNotes(state, action: PayloadAction<string[]>) {
      return { ...state, diagramNotes: action.payload }
    },
    setDiagramName(state, action: PayloadAction<string>) {
      return { ...state, diagramName: action.payload }
    },
    setDiagramMode(state, action: PayloadAction<string>) {
      return { ...state, diagramMode: action.payload }
    },
  }
});

export const {
  setLibraryChords,
  setChordIds,
  setGrabbed,
  setChordName,
  addToDiagram,
  setDiagramNotes,
  setDiagramName,
  setDiagramMode,
} = librarySlice.actions;

export const theChordName = ({ library: { chordName }}: RootState): string => chordName;
export const theChords = ({ library: { chords }}: RootState): any[] => chords;
export const theChordIds = ({ library: { chordIds }}: RootState): any[] => chordIds;
export const theTrueIds = ({ library: { trueIds }}: RootState): string[] => trueIds;
export const libChord = ({ library: { grabbed }}: RootState): object => grabbed;
export const theDiagramNotes = ({ library: { diagramNotes }}: RootState): string[] => diagramNotes;
export const theDiagramName = ({ library: { diagramName }}: RootState): string => diagramName;
export const theDiagramMode = ({ library: { diagramMode }}: RootState): string => diagramMode;

export default librarySlice.reducer;
