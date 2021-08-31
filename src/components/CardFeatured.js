import React from 'react';
import Card from '@material-ui/core/Card';
import BackgroundImage from 'gatsby-background-image';
import { getImage } from 'gatsby-plugin-image';
import { convertToBgImage } from 'gbimage-bridge';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		transition: theme.transitions.create(['transform'], {
			duration: theme.transitions.duration.standard,
			easing: theme.transitions.easing.easeInOut,
			delay: theme.transitions.duration.shortest,
		}),
		'&:hover': {
			transition: theme.transitions.create(['transform'], {
				duration: theme.transitions.duration.shorter,
				easing: theme.transitions.easing.easeInOut,
			}),
			transform: 'translate(0, -5px)',
		},
	},
	featuredCard: {
		width: '100%',
		height: 0,
		paddingTop: '67%',
		display: 'block',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		zIndex: 1,
	},
	featuredImageWrapper: {
		position: 'relative',
		width: '100%',
		height: '100%',
	},
	featuredImageHeader: {
		position: 'absolute',
		fontSize: '1.4rem',
		zIndex: 2,
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		color: theme.palette.text.primary,
		padding: '0.8rem 1.6rem',
		border: `3px solid ${theme.palette.text.primary}`,
		borderRadius: '4px',
	},
}));
const CardFeatured = ({ gatsbyImageData, category }) => {
	const image = getImage(gatsbyImageData);
	const bgImage = convertToBgImage(image);
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<div className={classes.featuredImageWrapper}>
				<BackgroundImage
					Tag="div"
					{...bgImage}
					preserveStackingContext
					className={classes.featuredCard}
				></BackgroundImage>
				<span className={classes.featuredImageHeader}>{category}</span>
			</div>
		</Card>
	);
};

export default CardFeatured;
