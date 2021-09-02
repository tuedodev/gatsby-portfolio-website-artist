import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import { WEBSITE_OWNER, SOCIAL_MEDIA_LINK_FB } from '../lib/config';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			backgroundColor: '#424242',
			marginTop: '1rem',
			padding: '1rem 0',
		},
		socialMediaContainer: {
			display: 'flex',
			width: '100%',
			justifyContent: 'space-around',
			alignItems: 'center',
			overflow: 'hidden',
			flexGrow: 1,
			padding: '0.5rem 0',
		},
		socialMedia: {
			width: '80px',
			height: '80px',
			display: 'inline-block',
			cursor: 'pointer',
			color: theme.palette.text.primary,
			opacity: 0.6,
			//transition: `color ${navitemAnimation} ease-in-out, opacity ${navitemAnimation} ease-in-out`,
			transition: theme.transitions.create(['color', 'opacity'], {
				duration: theme.transitions.duration.short,
				easing: theme.transitions.easing.easeInOut,
			}),
			'&:hover': {
				opacity: 0.85,
				color: theme.palette.secondary.main,
			},
		},
		copyright: {
			flexBasis: 'auto',
			transformOrigin: 'top',
			color: theme.palette.text.primary,
			flexGrow: 0,
			display: 'flex',
			fontSize: '1.8rem',
		},
	};
});

function Footer() {
	const classes = useStyles();
	const today = new Date();
	const year = today.getFullYear();

	return (
		<>
			<footer className={classes.root}>
				<div className={classes.socialMediaContainer}>
					<a
						href={SOCIAL_MEDIA_LINK_FB}
						target="_blank"
						rel="noopener noreferrer"
						className={classes.socialMedia}
					>
						<FacebookIcon style={{ fontSize: '4rem' }} />
					</a>
				</div>
				<p className={classes.copyright}>
					&copy; {WEBSITE_OWNER.toLowerCase()} {year}
				</p>
			</footer>
		</>
	);
}

export default Footer;
