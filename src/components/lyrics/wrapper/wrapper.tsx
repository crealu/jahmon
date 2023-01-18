import * as React from 'react';
import './Wrapper.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theActiveLine, deleteLine } from '../../../slices/lyrics-slice';
import { theScreen } from '../../../slices/view-slice';
import Line from '../Line/Line';
import Panel from '../Panel/Panel';
import DeleteButton from '../Buttons/Delete/DeleteBtn';

type WrapperProps<any> = {
  lines: object[];
}

const Wrapper: React.FC<WrapperProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const active = useAppSelector(theActiveLine);
  const screen = useAppSelector(theScreen);

  const { lines } = props;

  return (
    <div className="lyrics-wrapper">
      {lines.map((line, idx) => {
        return (
          <div className="line-group">
            <Panel steps={line.panel} lineNumber={idx} />
            <Line text={line.text} lineNumber={idx} />
            {screen != 'print' && <DeleteButton activeLine={active} lineNumber={idx} />}
          </div>
        )
      })}
    </div>
  )
}

export default Wrapper;
