import * as React from 'react';
import { useCallback } from 'react';
import './app.css';
import { useAppSelector } from './hooks';
import { theScreen } from './slices/view-slice';
import Base from './screens/base/base';
import Print from './screens/print/print';
import Gig from './screens/gig/gig';

export const App: React.FC = () => {
  const screen: string = useAppSelector(theScreen);

  const returnScreen = useCallback(() => {
    return screen == 'base' ? <Base />
         : screen == 'print' ? <Print />
         : screen == 'gig' ? <Gig />
         : '';
  }, [screen])

  return (
    <div className="app">
      {returnScreen()}
    </div>
  )
}

export default App;
