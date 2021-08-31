import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			margin: '1rem 0',
			width: '100%',
		},
		input: {
			color: theme.palette.text.primary,
			//fontSize: '1.4rem',
			backgroundColor: 'rgba(255, 255, 255, 0.08)',
			'&.Mui-error': {
				backgroundColor: 'rgba(255, 0, 0, 0.08)',
				color: theme.palette.text.primary,
			},
			'&.Mui-focused': {
				backgroundColor: 'rgba(255, 255, 255, 0.18)',
			},

			'&.Mui-focused.Mui-error': {
				backgroundColor: 'rgba(255, 0, 0, 0.18)',
			},
		},
		label: {
			color: theme.palette.text.primary,
			'&.MuiInputLabel-outlined.MuiInputLabel-shrink': {
				transform: 'translate(14px, -12px) scale(0.75)',
			},
		},
		helper: {
			fontSize: '1rem',
			lineHeight: '1',
			color: theme.palette.text.primary,
			whiteSpace: 'pre-wrap',
			minHeight: '1rem',
		},
	};
});

const Input = React.forwardRef((props, ref) => {
	const { id, required, label, type, value, errorMsg, onChangeHandler, index, ...rest } = props;
	const [state, setState] = useState(() => {
		return {
			value,
			errorMsg,
		};
	});
	if (state.value !== value) {
		setState((prev) => ({ ...prev, value }));
	}
	if (state.errorMsg !== errorMsg) {
		setState((prev) => ({ ...prev, errorMsg }));
	}
	const classes = useStyles(props);

	return (
		<>
			<TextField
				id={id}
				ref={ref}
				className={classes.root}
				required={required}
				label={label}
				type={type}
				index={index}
				value={state.value}
				error={state.errorMsg !== ''}
				helperText={state.errorMsg || ' '}
				InputLabelProps={{
					required: false,
					className: classes.label,
				}}
				InputProps={{ className: classes.input }}
				FormHelperTextProps={{ className: classes.helper }}
				onChange={(event) =>
					onChangeHandler({
						event,
						id: event.target.id,
						index,
						value: event.target.value,
					})
				}
				{...rest}
			/>
		</>
	);
});

export default Input;
