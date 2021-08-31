import React, { useState } from 'react';
import { Checkbox as MuiCheckbox, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { convertCheckboxValues } from '../lib/utils';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			margin: '1rem 0',
			'& .MuiFormControlLabel-root': {
				'& .MuiFormControlLabel-label': {
					fontSize: '1.35rem',
					paddingLeft: '1rem',
				},
			},
		},
		checkbox: {
			color: theme.palette.text.primary,
			fontSize: '1.4rem',
			backgroundColor: 'rgba(255, 255, 255, 0.08)',
		},
		helper: {
			fontSize: '1rem',
			lineHeight: '1',
			color: theme.palette.error.main,
			whiteSpace: 'pre-wrap',
			minHeight: '1rem',
		},
	};
});

const Checkbox = React.forwardRef((props, ref) => {
	const { id, required, label, checked, errorMsg, onChangeHandler, index, ...rest } = props;
	const classes = useStyles();
	const [state, setState] = useState(() => {
		return {
			value: checked,
			errorMsg,
		};
	});
	if (state.value !== checked) {
		setState((prev) => ({ ...prev, value: checked }));
	}
	if (state.errorMsg !== errorMsg) {
		setState((prev) => ({ ...prev, errorMsg }));
	}
	return (
		<>
			<FormControl className={classes.root} ref={ref}>
				<FormControlLabel
					label={label}
					control={
						<MuiCheckbox
							className={classes.checkbox}
							checked={state.value}
							id={id}
							required
							error={state.errorMsg !== '' ? 'true' : 'false'}
							onChange={(event) => onChangeHandler({ ...convertCheckboxValues(event), index })}
							{...rest}
						/>
					}
				></FormControlLabel>
				<FormHelperText className={classes.helper} id="checkbox-helper-text">
					{state.errorMsg}
				</FormHelperText>
			</FormControl>
		</>
	);
});

export default Checkbox;
