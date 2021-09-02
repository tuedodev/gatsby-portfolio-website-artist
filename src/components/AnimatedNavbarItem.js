import React from 'react';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
//import { navbarItemClass } from './styles/styles.module.scss';
import SplittedText from './SplittedText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		color: 'currentColor',
		fontSize: 'clamp(1rem, calc(1rem + 1.5vw + 0.8vh), 3.2rem)', // 3rem
		textDecoration: 'none',
		display: 'inline-block',
		position: 'relative',
		margin: 0,
		padding: 0,
		'& span': {
			whiteSpace: 'pre',
			display: 'inline-block',
			'& > span': {
				letterSpacing: 'normal',
				transition: 'visibility 0.7s linear, transform 0.7s cubic-bezier(0.19, 1, 0.22, 1),',
			},
		},
		'& > span:nth-child(1)': {
			'& > span': {
				visibility: 'visible',
				opacity: 1,
				transform: 'rotate3d(1, -0.3, 0, 0deg) translateX(0)',
			},
		},
		'& > span:nth-child(2)': {
			textTransform: 'uppercase',
			fontFamily: 'IM Fell French Canon, serif',
			position: 'absolute',
			top: 0,
			left: 0,
			'& > span': {
				visibility: 'hidden',
				opacity: 0,
				transform: 'rotate3d(1, -0.3, 0, 90deg) translateX(0)',
			},
			'&:hover': {
				color: theme.palette.secondary.main,
				'& > span:nth-child(1)': {
					'& > span': {
						visibility: 'hidden',
						opacity: 0,
						transform: 'rotate3d(1, -0.3, 0, 90deg) translateX(3rem)',
						letterSpacing: '10px',
					},
				},
				'& > span:nth-child(2)': {
					'& > span': {
						visibility: 'visible',
						opacity: 1,
						transform: 'rotate3d(1, -0.3, 0, 0deg) translateX(3rem)',
						letterSpacing: '10px',
					},
				},
			},
		},
	},
}));

// Transition delay in milliseconds ms
function AnimatedNavbarItem({ text, delay = 0, href }) {
	const classes = useStyles();
	let delayPerItemInMilliseconds = 0;
	if (text.length > 0) {
		delayPerItemInMilliseconds = delay / text.length;
	}

	return (
		<>
			<AniLink fade duration={0.5} to={`${href.length > 0 ? `/${href}/` : `/`}`} className={classes.root}>
				<SplittedText as="span" delayPerItemInMilliseconds={delayPerItemInMilliseconds}>
					{text}
				</SplittedText>
				<SplittedText as="span" delayPerItemInMilliseconds={delayPerItemInMilliseconds}>
					{text}
				</SplittedText>
			</AniLink>
		</>
	);
}

export default AnimatedNavbarItem;
