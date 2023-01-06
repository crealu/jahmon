import * as React from 'react';
import './wrapper.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theActiveLine, deleteLine } from '../../../slices/lyrics-slice';
import { isPrinting } from '../../../slices/view-slice';
import Line from '../line/line';
import Panel from '../panel/panel';
import DeleteButton from '../buttons/delete/deletebtn';

type WrapperProps<any> = {
  lines: object[];
}

const Wrapper: React.FC<WrapperProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const active = useAppSelector(theActiveLine);
  const printing = useAppSelector(isPrinting);

  const { lines } = props;

  return (
    <div className="lyrics-wrapper">
      {lines.map((line, idx) => {
        return (
          <div className="line-group">
            <Panel steps={line.panel} lineNumber={idx} />
            <Line text={line.text} lineNumber={idx} />
            {!printing && <DeleteButton activeLine={active} lineNumber={idx} />}
          </div>
        )
      })}
    </div>
  )
}

export default Wrapper;
