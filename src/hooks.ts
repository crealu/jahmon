import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from './store';
import { useEffect } from 'react';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useKeyPress = (key, action) => {
	const keyDown = (e) => { e.key == key ? action() : null }
	useEffect(() => {
		document.addEventListener("keydown", keyDown)
		return () => {
			document.removeEventListener('keydown', keyDown);
		}
	}, [keyDown]);
}
