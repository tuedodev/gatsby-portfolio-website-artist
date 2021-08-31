import React, { useState } from 'react';
import {
	Checkbox as MuiCheckbox,
	FormControl,
	FormGroup,
	FormHelperText,
	FormControlLabel,
	FormLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { convertCheckboxValues } from '../lib/utils';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			margin: '1rem 0',
			'& .MuiFormControlLabel-root': {
				marginRight: 0,
				'& .MuiFormControlLabel-label': {
					fontSize: '1.35rem',
					paddingLeft: '1rem',
				},
			},
		},
		formGroupRow: {
			display: 'flex',
			flexDirection: 'row',
			flexWrap: 'nowrap',
		},
		labelContainer: {
			display: 'inline',
			'& a': {
				textDecoration: 'none',
				color: 'blue',
				fontSize: '1.35rem',
			},
		},
		label: {
			whiteSpace: 'pre-line',
			fontSize: '1.35rem',
		},
		checkbox: {
			color: theme.palette.text.primary,
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

const PrivacyTermsCheckbox = React.forwardRef((props, ref) => {
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
				<FormGroup row className={classes.formGroupRow}>
					<FormControlLabel
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
					<div className={classes.labelContainer}>
						{label.map((item, i) => {
							if (typeof item === 'string') {
								return (
									<FormLabel key={i} className={classes.label}>
										{item}
									</FormLabel>
								);
							} else if (typeof item === 'object' && 'privacyTerms' in item) {
								return (
									<AniLink key={i} fade duration={0.5} to={`/datenschutz/`} style={{ whiteSpace: 'nowrap' }}>
										{item.privacyTerms}
									</AniLink>
								);
							} else {
								return null;
							}
						})}
					</div>
				</FormGroup>
				<FormHelperText className={classes.helper} id="checkbox-helper-text">
					{state.errorMsg}
				</FormHelperText>
			</FormControl>
		</>
	);
});

export default PrivacyTermsCheckbox;
