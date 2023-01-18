import * as React from 'react';
import './DeleteBtn.css';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';
import { deleteLine } from '../../../../slices/lyrics-slice';

type DeleteButtonProps = {
  lineNumber: number;
  activeLine: number;
}

export const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { lineNumber, activeLine } = props;

  const deleteThisLine = (event) => {
    dispatch(deleteLine(event.target.previousSibling.value));
  }

  const classes = useMemo(() => {
    return `delete-lyric-btn
      ${activeLine == lineNumber ? 'delete-lyric-btn-active' : ''}`
  }, [activeLine]);

  return (
    <img
      className={classes}
      src="img/icons/seq-btn-gray/delete.png"
      onClick={(e) => deleteThisLine(e)}
    />
  )
}

export default DeleteButton;
