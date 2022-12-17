import * as React from 'react';
import { useCallback } from 'react';
import './app.css';
import { useAppSelector } from './hooks';
import { theScreen } from './slices/view-slice';
import Base from './screens/base/base';
import Print from './screens/print/print';
import Gig from './screens/gig/gig';

export const App: React.FC = () => {
  const current: string = useAppSelector(theScreen);

  const returnScreen = useCallback(() => {
    return current == 'base' ? <Base />
         : current == 'print' ? <Print />
         : current == 'gig' ? <Gig />
         : '';
  }, [current])

  return (
    <div className="app">
      {returnScreen()}

    </div>
  )
}

export default App;

// { current == 'base' ? <Base /> : ''}
// { current == 'print' ? <Print /> : ''}
// { current == 'gig' ? <Gig /> : ''}