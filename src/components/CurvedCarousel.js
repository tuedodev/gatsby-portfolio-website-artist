import React from 'react';
import { useEffect, useRef, useReducer } from 'react';
import { navigate } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import useWindowDimensions from '../hooks/useWindowDimensions';
import AnimatedLink from './AnimatedLink';
import { getPositionX } from '../lib/utils';
import throttle from 'just-throttle';

function CurvedCarousel(props) {
	// Variables, Contants

	const { height: vh, width: vw } = useWindowDimensions();

	const imageArray = useRef(
		props.pictureArray.map((img, index) => {
			const image = getImage(img.mainImage.image.asset.gatsbyImageData);
			return {
				id: img.id,
				title: img.title,
				to: `/arbeiten/${img.slug.current}/`,
				slug: img.slug.current,
				description: img.description,
				image,
				href: '#',
			};
		})
	);
	const numberOfSlides = imageArray.current.length;

	// Reducer
	const [state, dispatch] = useReducer(reducer, {
		currentIndex: 0,
		grabbing: false,
		id: null,
		movedBy: 0,
		slideWidt: 0,
		isHover: Array.from({ length: numberOfSlides }, (_) => false),
		captionClass: Array.from({ length: numberOfSlides }, (_) => ''),
	});

	const slidesContainerRef = useRef(null);
	const figureRef = useRef([]);
	const figcaptionRef = useRef([]);
	const startPosRef = useRef(0);
	const oldSlideCenter = useRef(null);
	const oldCaptionIndex = useRef(null);
	const wheelCounterRef = useRef(0);
	const renderProofFunctionsRef = useRef({
		backwards: throttle(dispatch.bind(null, { type: 'updateIndex', payload: { add: -1 } }), 500),
		forwards: throttle(dispatch.bind(null, { type: 'updateIndex', payload: { add: 1 } }), 500),
	});

	function reducer(state, action) {
		switch (action.type) {
			case 'grabbing':
				return { ...state, grabbing: true, id: action.payload.id };
			case 'dropping':
				return { ...state, grabbing: false, id: null };
			case 'resetMovedBy':
				return { ...state, movedBy: 0 };
			case 'updateMovedBy':
				return { ...state, movedBy: action.payload.movedBy };
			//case 'updateHoverStatus':
			//	return { ...state, isHover: action.payload.isHoverArray };
			case 'updateIndex':
				let newIndex = state.currentIndex + action.payload.add;
				newIndex = newIndex >= numberOfSlides ? 0 : newIndex;
				newIndex = newIndex < 0 ? numberOfSlides - 1 : newIndex;
				return { ...state, currentIndex: newIndex };
			case 'updateCaptionClass':
				return { ...state, captionClass: action.payload.captionClass };
			case 'updateSlideWidth':
				return { ...state, slideWidth: action.payload.slideWidth };
			default:
				throw new Error();
		}
	}

	// Event Handlers
	function grabStartHandler(obj) {
		const { event, index } = obj;
		event.preventDefault();
		dispatch({ type: 'grabbing', payload: { id: index } });
		startPosRef.current = getPositionX(event);
		dispatch({ type: 'resetMovedBy', payload: {} });
	}

	function grabEndHandler(event) {
		let ratio = calculateRelativeMouseMovement(state.movedBy, 0.9);
		dispatch({ type: 'dropping', payload: { id: null } });
		if (Math.abs(ratio) >= 0.18) {
			let add = Math.sign(ratio) * -1;
			dispatch({ type: 'updateIndex', payload: { add } });
		}
		dispatch({ type: 'resetMovedBy', payload: {} });
	}

	function doubleClickHandler({ event, index }) {
		event.preventDefault();
		navigate(imageArray.current[index].to);
	}

	// Hooks
	useEffect(() => {
		const body = document.querySelector('body');
		body.addEventListener('wheel', onWheelHandler);

		function onWheelHandler(event) {
			let sign = Math.sign(event.deltaY);
			if ((sign > 0 && wheelCounterRef.current < 0) || (sign < 0 && wheelCounterRef.current > 0))
				wheelCounterRef.current = 0;
			wheelCounterRef.current += sign * 0.2;
			if (Math.abs(wheelCounterRef.current) > 1) {
				dispatch({ type: 'updateIndex', payload: { add: Math.sign(wheelCounterRef.current) } });
				wheelCounterRef.current = 0;
				dispatch({ type: 'resetMovedBy', payload: {} });
			}
		}
		return () => {
			body.removeEventListener('wheel', onWheelHandler);
		};
	}, []);

	useEffect(() => {
		displaySlides();
		//displaySlidesRef.current.call(null, currentIndex, movedBy, slideWidth);

		function displaySlides() {
			let newOrderArray =
				state.currentIndex > 0 ? Array.from({ length: state.currentIndex }, (_, i) => i) : [];
			newOrderArray = [
				...Array.from(
					{ length: imageArray.current.length - state.currentIndex },
					(_, i) => state.currentIndex + i
				),
				...newOrderArray,
			];
			let medium = getMediumOfXAxis(imageArray.current);
			let slideCenter = (medium + state.currentIndex) % imageArray.current.length;
			if (slideCenter !== oldSlideCenter.current) {
				flipBothEndsWithoutTransition(newOrderArray);
				updateCaptionClass(slideCenter);
			}
			newOrderArray.forEach((slidenumber, index) => {
				let slide = figureRef.current[slidenumber];
				let currentPositionOnXAxis = index - medium;
				const { xpos, ypos, rotate } = calculateSlidePosition(
					currentPositionOnXAxis + (state.movedBy / state.slideWidth) * 0.9
				);
				/*const additionalStylingObject =
					state.isHover[slidenumber] && slideCenter === slidenumber
						? { transformString: ' scale3d(1.06, 1.06, 1)', zIndex: index + 25 } // 50
						: { transformString: ' scale3d(1, 1, 1)', zIndex: index + 5 };*/
				slide.style.transform = `translate(${xpos}px, ${ypos}px) rotate(${-rotate}deg)`;
				//slide.style.zIndex = additionalStylingObject.zIndex;
			});
			oldSlideCenter.current = slideCenter;
		}

		function flipBothEndsWithoutTransition(array) {
			let duration =
				parseInt(
					getComputedStyle(document.querySelector(':root')).getPropertyValue('--carousel-animation')
				) || 300;
			let firstItem = array[0];
			let lastItem = array[array.length - 1];
			let medium = getMediumOfXAxis(array);
			positionSlideWithoutTransition(figureRef.current[firstItem], array.length - 1);
			positionSlideWithoutTransition(figureRef.current[lastItem], -medium);

			function positionSlideWithoutTransition(slide, newPosition) {
				slide.classList.add('notransition');
				slide.style.visibility = 'hidden';
				const { xpos, ypos, rotate } = calculateSlidePosition(newPosition);
				slide.style.transform = `translate(${xpos}px, ${ypos}px) rotate(${-rotate}deg)`;
				// eslint-disable-next-line
				let dummy = getComputedStyle(slide).transform;
				setTimeout(function () {
					slide.classList.remove('notransition');
					slide.style.visibility = 'visible';
				}, duration / 2);
			}
		}

		function calculateSlidePosition(currentPositionOnXAxis) {
			//const { vw, vh } = getDimensions();
			//const slideWidth = vw / divider;
			let rotate = angle(currentPositionOnXAxis);
			let xpos = currentPositionOnXAxis * state.slideWidth * 0.9; // (vw / 2) - slideWidth / 2???
			let yCurve = graph(currentPositionOnXAxis) * (vh / 1.5);
			let ypos = -yCurve;
			return { xpos, ypos, rotate };
		}
		function updateCaptionClass(newCaptionIndex) {
			const animationDuration = parseInt(
				getComputedStyle(document.querySelector(':root')).getPropertyValue('--carousel-animation')
			);
			let newArray = Array.from({ length: imageArray.current.length }, (_) => '');
			let noTransitAfterOut = null;
			if (newCaptionIndex !== oldCaptionIndex.current) {
				if (oldCaptionIndex.current || oldCaptionIndex.current === 0) {
					newArray[oldCaptionIndex.current] = 'out';
					noTransitAfterOut = oldCaptionIndex.current;
				}
				newArray[newCaptionIndex] = 'active';
				dispatch({ type: 'updateCaptionClass', payload: { captionClass: newArray } });
				if (noTransitAfterOut || noTransitAfterOut === 0) {
					setTimeout(function () {
						if (figcaptionRef.current) {
							figcaptionRef.current[noTransitAfterOut].classList.remove('out');
						}
					}, animationDuration);
				}
				oldCaptionIndex.current = newCaptionIndex;
			}
		}
		// Slide Width
		const divider = vw >= 960 ? 2.3 : 1.4;
		let newSlideWidth = vw / divider;
		if (newSlideWidth !== state.slideWidth) {
			dispatch({ type: 'updateSlideWidth', payload: { slideWidth: newSlideWidth } });
		}
		// Functions for graph
		function graph(x) {
			return -((Math.pow(x, 2) - 36) / 18) - 2;
		}
		function derivation(x) {
			return -x / 9;
		}
		function angle(x) {
			return (180 / Math.PI) * Math.atan(derivation(x));
		}
	}, [state, vh, vw]);

	// Helper functions

	function getMediumOfXAxis(array) {
		let len = array.length;
		let medium = len % 2 === 0 ? Math.floor(len / 2) : Math.ceil(len / 2);
		return medium;
	}

	const updateMovedBy = (event) => {
		let currentX = getPositionX(event);
		let newMovedBy = currentX - startPosRef.current;
		newMovedBy = state.grabbing ? newMovedBy : 0;

		if (state.movedBy !== newMovedBy) {
			dispatch({ type: 'updateMovedBy', payload: { movedBy: newMovedBy } });
		}
	};

	function calculateRelativeMouseMovement(movedByVar, factor = 1) {
		//const { slideWidth } = getDimensions();
		return (movedByVar / state.slideWidth) * factor;
	}

	console.log('RENDER CURVEDCAROUSEL Parent');
	return (
		<div
			className="slides-container"
			ref={slidesContainerRef}
			style={{ backgroundColor: 'rgba(0,0,0,.2)' }}
			onMouseUp={grabEndHandler}
			onTouchEnd={grabEndHandler}
			role="navigation"
		>
			<div className="slides-wrapper">
				{imageArray.current.map((img, index, array) => {
					return (
						<div className={`slide`} key={img.id} id={`i${index}`}>
							<figure
								className={`${state.grabbing && state.id === index ? 'grabbing' : ''}`}
								ref={(elem) => (figureRef.current[index] = elem)}
								style={{
									width: `${state.slideWidth}px`,
								}}
							>
								<GatsbyImage
									image={img.image}
									alt={img.title}
									as="div"
									onDoubleClick={(event) => {
										doubleClickHandler({ event, index });
									}}
									onMouseDown={(event) => {
										grabStartHandler({
											event,
											index,
										});
									}}
									onMouseMove={updateMovedBy}
									onTouchStart={(event) => {
										grabStartHandler({
											event,
											index,
										});
									}}
									onTouchMove={updateMovedBy}
								/>
							</figure>
						</div>
					);
				})}
				<div className="figcaption-wrapper">
					<div className="figcaption">
						{imageArray.current.map((img, index) => {
							return (
								<AnimatedLink
									key={img.id}
									className={state.captionClass[index]}
									to={`arbeiten/${img.slug}`}
									value={img.title}
									ref={(elem) => (figcaptionRef.current[index] = elem)}
								/>
							);
						})}
					</div>
				</div>
				<div className="slogan-wrapper serif">
					<p>Meine Projekte</p>
				</div>
				<IconButton
					arial-label="back"
					onClick={renderProofFunctionsRef.current.backwards}
					style={{
						position: 'absolute',
						left: 0,
						top: '50%',
						zIndex: 20000,
						color: 'white',
						padding: '1rem',
					}}
				>
					<ArrowForwardIosIcon style={{ transform: 'rotate(-180deg)', fontSize: '5rem' }} />
				</IconButton>
				<IconButton
					arial-label="forward"
					onClick={renderProofFunctionsRef.current.forwards}
					style={{
						position: 'absolute',
						right: 0,
						top: '50%',
						zIndex: 20000,
						color: 'white',
						padding: '1rem',
					}}
				>
					<ArrowForwardIosIcon style={{ fontSize: '5rem' }} />
				</IconButton>
			</div>
		</div>
	);
}

export default CurvedCarousel;
