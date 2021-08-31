import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { navigate } from 'gatsby';
import throttle from 'just-throttle';
import { makeStyles } from '@material-ui/core/styles';
import {
	pictureSliderClass,
	pictureSliderItems,
	pictureSliderControls,
	figclass,
	figclassActive,
	figclassOut,
	caption,
	captionActive,
	captionOut,
} from './styles.module.scss';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		color: theme.palette.text.primary,
	},
	buttonClass: {
		color: theme.palette.text.primary,
	},
	sliderImg: {
		'&:hover': {
			cursor: 'pointer',
		},
	},
	picControls: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
	},
	picControlsTitels: {
		flex: 1,
	},
	picControlsButton: {
		position: 'relative',
		flexBasis: 'auto',
	},
}));
function Index(props) {
	const classes = useStyles();
	let out, next;
	const { pictureArray, as = 'div' } = props;
	const containerElementRef = useRef(null);
	//const iconButtonRef = useRef(null);
	const timeoutRef = useRef(null);
	const throttleRef = useRef(throttle(handleClick, 500));

	function handleClick() {
		clearTimeout(timeoutRef.current);
		setCounter((prev) => (prev + 1) % len);
		//animationEndRef.current.call(null, iconButtonRef.current);
		//animationEnd(iconButtonRef.current);
	}

	const imageArray = pictureArray.map((p, index) => {
		const image = getImage(p.mainImage.image.asset.gatsbyImageData);
		return {
			id: p.id,
			index,
			image,
			title: p.title,
			description: p.description,
			to: `/arbeiten/${p.slug.current}/`,
			height: image.height,
			width: image.width,
		};
	});
	const len = imageArray.length;
	const [counter, setCounter] = useState(0);
	const [progress, setProgress] = useState(0);
	const [minHeight, setMinHeight] = useState(0);

	function calculateSliders(counter) {
		out = counter - 1;
		out = out < 0 ? len - 1 : out;
		next = counter + 1;
		next = next > len - 1 ? 0 : next;
	}

	function doubleClickHandler({ event, index }) {
		event.preventDefault();
		navigate(imageArray[index].to);
	}

	useEffect(() => {
		const root = document.querySelector(':root');
		const container = containerElementRef.current;
		const resizeObserver = new ResizeObserver((entries) => {
			if (Array.isArray(entries)) {
				const currentWidth = containerElementRef.current.getBoundingClientRect().width;
				const aspectRatio = getComputedStyle(document.querySelector(':root')).getPropertyValue(
					'--aspectRatio'
				);
				let calculatedHeight = currentWidth / aspectRatio;
				root.style.setProperty(`--minHeight`, `${calculatedHeight}px`);
				setMinHeight(() => calculatedHeight);
			}
		});
		resizeObserver.observe(container);

		return () => resizeObserver.unobserve(container);
	}, []);

	useEffect(() => {
		const duration = getComputedStyle(document.querySelector(':root')).getPropertyValue(
			'--picture-slider-timer'
		);
		const percent = Math.floor(((counter + 1) / len) * 100);
		if (percent !== progress) {
			setProgress(percent);
		}
		const timer = setTimeout(() => {
			setCounter((prev) => (prev + 1) % len);
		}, duration);

		return () => {
			clearTimeout(timer);
		};
	}, [counter, len, progress]);

	return (
		<>
			<div className={`${classes.root} ${pictureSliderClass}`} ref={containerElementRef}>
				<div className={pictureSliderItems} style={{ height: minHeight }}>
					{calculateSliders(counter)}
					{imageArray.map((img, index) => {
						let figClass = figclass;
						if (index === counter) {
							figClass = figclassActive;
						} else if (index === out) {
							figClass = figclassOut;
						}
						return (
							<figure key={img.id} className={figClass}>
								<GatsbyImage
									image={img.image}
									alt={img.title}
									as={as}
									className={classes.sliderImg}
									onDoubleClick={(event) => {
										doubleClickHandler({ event, index });
									}}
								/>
							</figure>
						);
					})}
				</div>
				<div className={pictureSliderControls}>
					<p>
						{imageArray.map((img, index) => {
							let captionClass = caption;
							if (index === counter) {
								captionClass = captionActive;
							} else if (index === out) {
								captionClass = captionOut;
							}
							return (
								<AniLink fade duration={0.5} to={img.to} className={captionClass} key={`${img.id}-link`}>
									{img.title}
								</AniLink>
							);
						})}
					</p>
					<div style={{ position: 'relative', height: '60px', width: '60px' }}>
						<CircularProgress
							variant="determinate"
							value={progress}
							style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
						></CircularProgress>
						<IconButton
							style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
							onClick={throttleRef.current}
							onKeyDown={throttleRef.current}
						>
							<ArrowForwardIcon fontSize="large" />
						</IconButton>
					</div>

					{/*<div
						ref={iconButtonRef}
						className={clsx('icon-button', classes.buttonClass)}
						role="button"
						tabIndex="-1"
						onClick={throttleRef.current}
						onKeyDown={throttleRef.current}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="64"
							height="64"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<circle
								className="progress-ring__circle"
								fill="transparent"
								strokeWidth="1.5"
								cx="12"
								cy="12"
								r="10"
							></circle>
							<polyline points="12 16 16 12 12 8"></polyline>
							<line x1="8" y1="12" x2="16" y2="12"></line>
						</svg>
					</div>*/}
				</div>
			</div>
		</>
	);
}

export default Index;
