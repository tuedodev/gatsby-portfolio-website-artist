import React, { useState } from 'react';
import CachedIcon from '@material-ui/icons/Cached';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'flex',
			flexDirection: 'rows',
			alignItems: 'center',
			marginBottom: '1rem',
			flexWrap: 'nowrap',
		},
		numbers: {
			color: theme.palette.text.primary,
		},
	};
});

const Captcha = (props) => {
	const classes = useStyles();
	const { callbackOnChange } = props;
	const numberVerbose = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

	const [state, setState] = useState(() => {
		let zahl1 = getRandomNumber();
		let zahl2 = getRandomNumber();
		if (typeof callbackOnChange === 'function') {
			callbackOnChange({ zahl1, zahl2 });
		}
		return {
			zahl1,
			zahl2,
			callbackOnChange,
		};
	});

	function handleOnChange(event) {
		let zahl1 = getRandomNumber();
		let zahl2 = getRandomNumber();
		setState((prev) => {
			return { ...prev, zahl1, zahl2 };
		});
		if (typeof state.callbackOnChange === 'function') {
			state.callbackOnChange({ zahl1, zahl2 });
		}
	}

	function getRandomNumber() {
		return Math.ceil(Math.random() * 9);
	}

	return (
		<div className={classes.root}>
			<IconButton onClick={handleOnChange} color="primary" aria-label="reload captcha">
				<CachedIcon />
			</IconButton>
			<p className={clsx('cpt-group', classes.numbers)}>
				<span className={numberVerbose[state.zahl1 - 1]}></span>
				<span className={'plus'}></span>
				<span className={numberVerbose[state.zahl2 - 1]}></span>
			</p>
		</div>
	);
};

export default Captcha;
