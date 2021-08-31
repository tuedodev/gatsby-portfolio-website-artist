import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import LogoHeader from './LogoHeader';
import AnimatedToggleIcon from './AnimatedToggleIcon';
import Menu from './Menu';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const height = '10rem';
const heightShrinked = '5rem';
const threshold = 80;

const useStyles = makeStyles((theme) => {
	return {
		appBar: {
			backgroundColor: '#424242',
			color: '#ffa500',
			zIndex: theme.zIndex.modal + 1000,
		},
		toolbar: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100%',
			height: height,
			transition: theme.transitions.create(['height'], {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeIN,
			}),
			'&.shrinked': {
				height: heightShrinked,
			},
		},

		logoWrapper: {
			flexGrow: 1,
			display: 'flex',
			justifyContent: 'center',
		},
		toggleButton: {
			flexGrow: 0,
			color: theme.palette.text.primary,
		},
		paper: {
			height: '100vh',
			backgroundColor: 'rgba(255,255,255,0.1)',
			marginTop: height,
			top: height,
		},
		navbarOffset: {
			minHeight: height,
			'&.shrinked': {
				minHeight: heightShrinked,
			},
		},
	};
});

function Header({ noScrollingPossible }) {
	const [open, setOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(noScrollingPossible);
	const trigger = useScrollTrigger({ threshold, disableHysteresis: true });

	if (trigger !== isScrolled && !noScrollingPossible) {
		setIsScrolled(() => trigger);
	}

	function toggleDrawer(event) {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setOpen((p) => !p);
	}

	const classes = useStyles();

	return (
		<>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={`${classes.toolbar}${isScrolled ? ' shrinked' : ''}`}>
					<div className={classes.logoWrapper}>
						<LogoHeader shrinked={isScrolled} />
					</div>
					<IconButton onClick={toggleDrawer} className={classes.toggleButton} edge="end">
						<AnimatedToggleIcon isChecked={open} />
					</IconButton>
				</Toolbar>
			</AppBar>
			<div className={`${classes.navbarOffset}${isScrolled ? ' shrinked' : ''}`} />
			<Slide direction="down" in={open} timeout={{ enter: 200, exit: 180 }}>
				<Menu shrinked={isScrolled} open={open} />
			</Slide>
		</>
	);
}

export default Header;

/*export const query = graphql`
	{
		query: allSanitySetting {
			nodes {
				metaDescription
				metaKeywords
				metaTitle
				publishedAt
				websiteSubtitle
				websiteTitle
				logo {
					asset {
						gatsbyImageData(width: 500)
					}
				}
			}
		}
	}
`;*/
