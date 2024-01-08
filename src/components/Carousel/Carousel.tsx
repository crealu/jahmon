import * as React from 'react';
import './Carousel.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { theActiveStep, setActiveStep, setStepName, theStepName, theSteps, addStep } from '../../slices/sequence-slice';
import Diagram from '../Diagram/Diagram';

export const Carousel: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const steps = useAppSelector(theSteps);
	const [slideNum, setSlideNum] = useState(0);

	const leftArrow = '<';
	const rightArrow = '>';

	const slide = (direction) => {
		if (direction == 'left' && slideNum != 0) {
			setSlideNum(slideNum - 1);
		}		
		if (direction == 'right' && slideNum != steps.length - 1) {
			setSlideNum(slideNum + 1);
		}
		if (direction == 'right' && slideNum == steps.length - 1) {
			setSlideNum(0);
		}
		if (direction == 'left' && slideNum == 0) {
			setSlideNum(steps.length - 1);
		}
	}

	const renderSegment = (idx) => {
		return <div className={`segment 
			${slideNum > idx ? 'completed-segment':''}
			${slideNum == idx ? 'active-segment' : ''}
		`}></div>
	}

	return (
		<div className="carousel">
			<div className="caro-top">
				<div className="progression">
					{steps.map((step, i) => { return renderSegment(i) })}
				</div>
			</div>
			<div className="caro-inner">	
				<button className="prev caro-btn" onClick={() => slide('left')}>{leftArrow}</button>
				<div className="active-slide">
					<Diagram step={steps[slideNum]} id={0} />
				</div>
				<button className="next caro-btn" onClick={() => slide('right')}>{rightArrow}</button>
			</div>
		</div>
	)
}

export default Carousel;