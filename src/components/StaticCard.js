import React from 'react';
import { Card as MuiCard } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { convertToBgImage } from 'gbimage-bridge';
import BackgroundImage from 'gatsby-background-image';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import PictureWrapper from './PictureWrapper';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';

const useStyles = makeStyles((theme, props) => ({
	root: {
		color: theme.palette.text.primary,
		padding: '1rem',
	},
	header: {
		margin: '1.2rem 0',
		padding: '1rem 0',
	},
	photo: (props) => {
		return {
			height: 0,
			width: '100%',
			paddingTop: '50%',
			display: 'block',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			zIndex: 1,
			...props.imgStyle,
		};
	},
	mainPhoto: {
		paddingTop: '67%',
	},
	intro: {
		marginTop: '1rem',
	},
}));

const StaticCard = (props) => {
	const classes = useStyles(props);
	const { title, intro, image } = props;
	const bgImage = convertToBgImage(image);

	return (
		<MuiCard className={classes.root}>
			<div className={classes.header}>
				<Typography variant="h1" className={clsx(classes.header, 'serif')}>
					{title}
				</Typography>
				{intro && (
					<>
						<Divider variant="middle" />
						<Typography variant="body2" className={classes.intro}>
							{intro}
						</Typography>
					</>
				)}
			</div>
			<PictureWrapper className={classes.pictureWrapper}>
				<BackgroundImage
					className={clsx(classes.photo, classes.mainPhoto)}
					Tag="div"
					{...bgImage}
					preserveStackingContext
				></BackgroundImage>
			</PictureWrapper>
			<CardContent>{props.children}</CardContent>
		</MuiCard>
	);
};

export default StaticCard;
