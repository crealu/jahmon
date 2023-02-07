import * as React from 'react';
import './Carousel.tsx';
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import SeqStep from '../Sequence/SeqStep/SeqStep';
import { theActiveStep, setActiveStep, setStepName, theStepName, theSteps, addStep } from '../../slices/sequence-slice';

export const Carousel: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const steps = useAppSelector(theSteps);
	const activeStep = useAppSelector(theActiveStep)

	const slide = (direction) => {
		if (direction == 'left' && activeStep != 0) {
			dispatch(setActiveStep(activeStep - 1));
		}		
		if (direction == 'right' && activeStep != steps.length - 1) {
			dispatch(setActiveStep(activeStep + 1));
		}
	}

	// const returnSlide = () => {
	// 	return 
	// }

	// const returnSteps = useCallback(() => {
  //   return steps.map((step, i) => { 
  //   	return (
  //   		<div>

  //   		</div>
  //   		<SeqStep step={step} idx={i} key={i} /> 
  //   })
  // }, [steps]);

	return (
		<div className="carousel">
			<img alt="<" onClick={() => slide('left')}/>
			<SeqStep step={steps[activeStep]} idx={i} key={i} /> 
			<img alt=">" onClick={() => slide('right')}/>
		</div>
	)
}

export default Carousel;