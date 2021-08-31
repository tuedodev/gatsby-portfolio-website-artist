import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
		width: '100%',
		height: 'auto',
		'& .MuiFab-root': {
			position: 'absolute',
			right: '1rem',
			bottom: '1rem',
			opacity: 0.5,
			zIndex: 2,
			transition: theme.transitions.create('opacity', {
				duration: theme.transitions.duration.shortest,
			}),
		},
		'&:hover .MuiFab-root': {
			opacity: 1,
		},
	},
}));

function PictureWrapper(props) {
	const classes = useStyles();
	return <div className={classes.root}>{props.children}</div>;
}

export default PictureWrapper;
