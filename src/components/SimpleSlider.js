import React, { useReducer, useRef, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GatsbyImage } from 'gatsby-plugin-image';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseIcon from '@material-ui/icons/Close';
import { getPositionX } from '../lib/utils';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
		overflow: 'hidden',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: 'rgba(0,0,0,0.2)',
		//width: '100%',
		//height: '100%',
		justifyContent: 'center',
	},
	animatedWrapper: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		transition: 'transform 0.3s ease-in-out',
	},
	imgWrapper: {
		width: '70%',
		maxHeight: '80vh',
		flex: '1 0 auto',
		margin: '0 15%',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		cursor: 'pointer',
		'& img': {
			cursor: 'grab',
		},
		'&.grabbing': {
			'& img': {
				cursor: 'grabbing',
			},
		},
	},
	captionWrapper: {
		width: '100%',
		overflow: 'hidden',
		flex: '1 0 auto',
		margin: 0,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		'& span': {
			fontSize: 'clamp(0.85rem, calc(0.6rem + 1vw), 2.2rem)',
			color: 'white',
			padding: '0.8rem 1.4rem',
		},
	},
	iconButtons: {
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%) scale(2.5)',
		'&.left': {
			left: '2.5rem',
		},
		'&.right': {
			right: '2.5rem',
			transform: 'translateY(-50%) rotate(180deg) scale(2.5)',
		},
	},
	modalCloseButton: {
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: 2000,
		transform: 'scale(2.5)',
	},
}));

const SimpleSlider = (props) => {
	const classes = useStyles();
	const { imageArray, init = 0, modalCloseHandler } = props;
	const [state, dispatch] = useReducer(reducer, {
		currentImage: init,
		grabbing: false,
		movedBy: 0,
	});
	const numberItems = imageArray.length;

	// Refs
	const startPosRef = useRef(0);
	const wheelCounterRef = useRef(0);

	// Hooks
	useEffect(() => {}, []);

	// Event Handlers
	const grabStartHandler = useCallback(
		(obj) => {
			const { event, index } = obj;
			event.preventDefault();
			dispatch({ type: 'grabbing', payload: { id: index } });
			startPosRef.current = getPositionX(event);
			dispatch({ type: 'resetMovedBy', payload: {} });
		},
		[startPosRef]
	);

	const grabEndHandler = useCallback(
		(event) => {
			let absMovedBy = Math.abs(state.movedBy);
			let sign = Math.sign(state.movedBy);
			dispatch({ type: 'dropping', payload: { id: null } });
			startPosRef.current = 0;
			if (absMovedBy > 50) {
				sign > 0 ? dispatch({ type: 'decrease' }) : dispatch({ type: 'increase' });
			}
		},
		[startPosRef, state.movedBy]
	);

	const updateMovedBy = useCallback(
		(event) => {
			let currentX = getPositionX(event);
			let newMovedBy = (currentX - startPosRef.current) * 0.85;
			newMovedBy = state.grabbing ? newMovedBy : 0;
			newMovedBy = state.currentImage === 0 && newMovedBy > 0 ? 0 : newMovedBy;
			newMovedBy = state.currentImage === numberItems - 1 && newMovedBy < 0 ? 0 : newMovedBy;
			newMovedBy = newMovedBy > 250 ? 250 : newMovedBy;
			newMovedBy = newMovedBy < -250 ? -250 : newMovedBy;
			if (state.movedBy !== newMovedBy) {
				dispatch({ type: 'updateMovedBy', payload: { movedBy: newMovedBy } });
			}
		},
		[startPosRef, numberItems, state]
	);

	function onWheelHandler(event) {
		let sign = Math.sign(event.deltaY);
		event.preventDefault();
		if ((sign > 0 && wheelCounterRef.current < 0) || (sign < 0 && wheelCounterRef.current > 0))
			wheelCounterRef.current = 0;
		wheelCounterRef.current += sign * 0.2;
		wheelCounterRef.current =
			state.currentImage === 0 && wheelCounterRef.current < 0 ? 0 : wheelCounterRef.current;
		wheelCounterRef.current =
			state.currentImage === numberItems - 1 && wheelCounterRef.current > 0 ? 0 : wheelCounterRef.current;
		if (Math.abs(wheelCounterRef.current) > 1) {
			Math.sign(wheelCounterRef.current) > 0
				? dispatch({ type: 'increase' })
				: dispatch({ type: 'decrease' });
			wheelCounterRef.current = 0;
		}
	}

	function reducer(state, action) {
		let newCurrentImage = state.currentImage;
		switch (action.type) {
			case 'increase':
				newCurrentImage += 1;
				newCurrentImage = newCurrentImage >= numberItems ? numberItems - 1 : newCurrentImage;
				return { ...state, grabbing: false, movedBy: 0, currentImage: newCurrentImage };
			case 'decrease':
				newCurrentImage -= 1;
				newCurrentImage = newCurrentImage < 0 ? 0 : newCurrentImage;
				return { ...state, grabbing: false, movedBy: 0, currentImage: newCurrentImage };
			// additional functionality 20.08.2021
			case 'grabbing':
				return { ...state, grabbing: true, movedBy: 0, id: action.payload.id };
			case 'dropping':
				return { ...state, grabbing: false, movedBy: 0, id: null };
			case 'resetMovedBy':
				return { ...state, movedBy: 0 };
			case 'updateMovedBy':
				return { ...state, movedBy: action.payload.movedBy };
			default:
				throw new Error();
		}
	}

	return (
		<div
			className={classes.root}
			onMouseUp={grabEndHandler}
			onTouchEnd={grabEndHandler}
			onWheel={onWheelHandler}
			role="presentation"
		>
			<div
				className={classes.animatedWrapper}
				style={{ transform: `translateX(calc(-${state.currentImage * 100}% + ${state.movedBy}px))` }}
			>
				{imageArray.map((img, index) => {
					return (
						<div
							className={`${classes.imgWrapper}${
								state.grabbing && state.currentImage === index ? ' grabbing' : ''
							}`}
							key={index}
						>
							<GatsbyImage
								image={img.image}
								imgStyle={{ height: '100%', width: 'auto', margin: '0 auto' }}
								alt={img.caption || 'Picture'}
								onMouseDown={(event) => {
									grabStartHandler({
										event,
										index,
									});
								}}
								onTouchStart={(event) => {
									grabStartHandler({
										event,
										index,
									});
								}}
								onMouseMove={updateMovedBy}
								onTouchMove={updateMovedBy}
							/>
						</div>
					);
				})}
			</div>
			<div
				className={classes.animatedWrapper}
				style={{
					transform: `translateX(calc(${(state.currentImage - numberItems + 1) * 100}% - ${
						state.movedBy
					}px))`,
				}}
			>
				{imageArray.map((_, index, arr) => {
					const reversedIndex = arr.length - index - 1;
					return (
						<div key={index} className={classes.captionWrapper}>
							<span>{arr[reversedIndex].caption}</span>
						</div>
					);
				})}
			</div>
			<IconButton className={classes.modalCloseButton} onClick={modalCloseHandler}>
				<CloseIcon />
			</IconButton>
			{state.currentImage > 0 && (
				<IconButton onClick={(e) => dispatch({ type: 'decrease' })} className={`${classes.iconButtons} left`}>
					<ArrowBackIosIcon />
				</IconButton>
			)}
			{state.currentImage < numberItems - 1 && (
				<IconButton
					onClick={(e) => dispatch({ type: 'increase' })}
					className={`${classes.iconButtons} right`}
				>
					<ArrowBackIosIcon />
				</IconButton>
			)}
		</div>
	);
};

export default SimpleSlider;
