import * as React from 'react';
import './App.css';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { useAppSelector, useKeyPress } from './hooks';
import { theScreen, setCurrentScreen } from './slices/view-slice';
import Base from './screens/base/base';
import Print from './screens/print/print';
import Gig from './screens/gig/gig';
import ChordBook from './screens/chordbook/chordbook';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const screen: string = useAppSelector(theScreen);

  useKeyPress('Tab', () => {
    let newScreen = 'base';
    dispatch(setCurrentScreen(newScreen));
  });

  const returnScreen = useCallback(() => {
    return screen == 'base' ? <Base />
         : screen == 'print' ? <Print />
         : screen == 'gig' ? <Gig />
         : screen == 'chordbook' ? <ChordBook />
         : '';
  }, [screen])

  return (
    <div className="app">
      {returnScreen()}
    </div>
  )
}

export default App;
