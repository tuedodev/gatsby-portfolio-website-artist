import React, { useRef, useEffect } from 'react';
import { splitTextIntoSpans } from '../lib/utils';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
//import { calculateImageSizes } from 'gatsby-plugin-image/dist/src/image-utils';

const useStyles = makeStyles((theme, props) => ({
	root: (props) => {
		const {
			animationName = 'none',
			whiteSpace = 'normal',
			letterSpacing = 'normal',
			letterSpacingMobile = 'normal',
		} = props;

		return {
			whiteSpace: whiteSpace,
			display: 'inline-block',
			overflowWrap: 'break-word',
			letterSpacing: letterSpacing,
			[theme.breakpoints.down('sm')]: {
				letterSpacing: letterSpacingMobile,
			},
			animationName: animationName,
			animationDuration: '1s',
			animationDelay: '0s',
			animationTimingFunction: 'ease-in-out', //'cubic-bezier(0.19, 1, 0.22, 1)',
			animationIterationCount: 1,
			animationFillMode: 'forwards',
			position: 'relative',
			zIndex: 10,
			'& > span': {
				display: 'inline-block',
				transformOrigin: 'center center 0.4em',
				animationName: `charAnim`,
				animationDuration: '1s',
				animationTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
				animationIterationCount: 1,
				animationFillMode: 'forwards',

				'&.space': {
					width: '1rem',
				},
			},
		};
	},
}));

function AnimatedText(props) {
	const classes = useStyles(props);
	let { text = '', delimiter = '', delayPerItemInMilliseconds = 0, startDelay = 0, className = '' } = props;
	const elementRef = useRef(null);

	useEffect(() => {
		//elementRef.current.classList.add('animation1');
	}, []);
	return (
		<span className={clsx(className, classes.root)} ref={elementRef}>
			{splitTextIntoSpans({ delayPerItemInMilliseconds, text, delimiter, startDelay })}
		</span>
	);
}

export default AnimatedText;
