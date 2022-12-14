import * as React from 'react';
import './app.css';
import { useAppSelector } from './hooks';
import { isPrinting } from './slices/view-slice';
import Base from './screens/base/base';
import Print from './screens/print/print';

export const App: React.FC = () => {
  const printing = useAppSelector(isPrinting);

  return (
    <div className="app">
      {printing ? <Print /> : <Base />}
    </div>
  )
}

export default App;
