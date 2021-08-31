import React, { useState, useRef } from 'react';
import { Button } from '@material-ui/core';
import { FIELD_ERROR_MESSAGES } from '../lib/config';
import Controls from '../controls/Controls';
import { makeStyles } from '@material-ui/core/styles';
import Captcha from './Captcha';
import RedirectDialog from './RedirectDialog';

const useStyles = makeStyles((theme) => {
	return {
		captcha: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			flexWrap: 'nowrap',
			[theme.breakpoints.down('xs')]: {
				flexWrap: 'wrap',
			},
		},
		button: {
			'&.Mui-disabled': {
				color: 'rgba(0, 0, 0, 0.87)',
				backgroundColor: '#ffa500',
				opacity: 0.35,
			},
		},
		dialogHeader: {
			'& h1, & h2, & h3, & h4, & h5, & h6': {
				padding: theme.spacing(3, 3, 1),
			},
		},
		divider: {
			margin: theme.spacing(1, 0),
		},
	};
});

function ContactForm(props) {
	const { formArray, dialogBox = {} } = props;
	const classes = useStyles();
	const fieldNodesRef = useRef([]);
	const captchaRef = useRef({
		zahl1: null,
		zahl2: null,
	});
	const timeRef = useRef(Date.now());
	const formRef = useRef(null);
	const initValues = formArray.map((f) => {
		let value = ['checkbox', 'checkboxPrivacyTerms'].includes(f.type) ? false : '';
		const validationFunc = f.id === 'captcha' && f.type === 'text' ? validateCaptcha : validate;
		return {
			id: f.id,
			value,
			errorMsg: '',
			validationFunc,
		};
	});
	const [fieldItems, setFieldItems] = useState(() => initValues);
	const [dialogOpen, setDialogOpen] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		const errArray = fieldNodesRef.current.map((f, index) => {
			const input = f.querySelector('input, textarea');
			let errMsg;
			if (fieldItems[index].id === 'captcha') {
				errMsg = fieldItems[index].validationFunc.call(null, input.value, true);
			} else {
				errMsg = fieldItems[index].validationFunc.call(null, input);
			}
			return errMsg;
		});
		setFieldItems((prev) => {
			let newArray = prev.map((item, index) => {
				item.errorMsg = errArray[index];
				return item;
			});
			return newArray;
		});
		const isValid = errArray.filter((f) => f.length > 0).length === 0;
		if (isValid) {
			const result = fieldItems.map((f) => {
				return {
					id: f.id,
					value: ['checkbox', 'checkboxPrivacyTerms'].includes(f.type) ? f.checked : f.value,
				};
			});
			result.push({ date: new Date() });
			setDialogOpen(() => true);
		}
	}
	function handleChange(obj) {
		const { event, id, index, value } = obj;
		const argument = id === 'captcha' ? value : event.target;
		const errorMsg = fieldItems[index].validationFunc.call(null, argument);
		setFieldItems((prev) => {
			let newArray = [...prev];
			let newItem = prev[index];
			newItem = { ...newItem, value, errorMsg };
			newArray[index] = newItem;
			return newArray;
		});
	}
	function validate(node) {
		let validityState = node.validity;
		let errorArray = [];
		for (var key in validityState) {
			if (validityState[key]) {
				errorArray.push(key);
			}
		}
		errorArray = errorArray.filter((node) => node !== 'valid');
		let errorMsg = errorArray.length > 0 ? errorArray[0] : '';
		errorMsg = FIELD_ERROR_MESSAGES.hasOwnProperty(errorMsg) ? FIELD_ERROR_MESSAGES[errorMsg] : '';
		return errorMsg;
	}

	function validateCaptcha(zahl, timechecking = false) {
		const result = captchaRef.current.zahl1 + captchaRef.current.zahl2;
		let errorMsg = parseInt(zahl) === parseInt(result) ? '' : FIELD_ERROR_MESSAGES.captchaCodeWrong;
		if (timechecking && errorMsg.length === 0) {
			errorMsg = validateTime();
		}
		return errorMsg;
	}

	function validateTime() {
		let errorMsg = Date.now() - timeRef.current > 7000 ? '' : FIELD_ERROR_MESSAGES.tooEarly;
		return errorMsg;
	}

	return (
		<>
			<form action="#" method="POST" noValidate autoComplete="off" onSubmit={handleSubmit} ref={formRef}>
				{formArray.map((item, index) => {
					if (item.type === 'checkbox') {
						return (
							<Controls.Checkbox
								key={index}
								ref={(elem) => (fieldNodesRef.current[index] = elem)}
								id={item.id}
								index={index}
								checked={fieldItems[index].value}
								onChangeHandler={handleChange}
								label={item.label}
								required={item.required}
								errorMsg={fieldItems[index].errorMsg}
								{...item.props}
							/>
						);
					} else if (item.type === 'checkboxPrivacyTerms') {
						return (
							<Controls.PrivacyTermsCheckbox
								key={index}
								ref={(elem) => (fieldNodesRef.current[index] = elem)}
								id={item.id}
								index={index}
								checked={fieldItems[index].value}
								onChangeHandler={handleChange}
								label={item.label}
								required={item.required}
								errorMsg={fieldItems[index].errorMsg}
								{...item.props}
							/>
						);
					} else {
						return (
							<div key={index} className={classes.captcha}>
								{item.type === 'text' && item.id === 'captcha' && (
									<Captcha
										callbackOnChange={(props) =>
											(captchaRef.current = {
												zahl1: props.zahl1,
												zahl2: props.zahl2,
												created: props.created,
											})
										}
									/>
								)}
								<Controls.Input
									ref={(elem) => (fieldNodesRef.current[index] = elem)}
									key={index}
									id={item.id}
									index={index}
									value={fieldItems[index].value}
									type={item.type}
									label={item.label}
									errorMsg={fieldItems[index].errorMsg}
									onChangeHandler={handleChange}
									required={item.required}
									multiline={item.multiline}
									{...item.props}
								/>
							</div>
						);
					}
				})}
				<div>
					<Button size="large" className={classes.button} type="submit" color="secondary" variant="contained">
						Senden
					</Button>
				</div>
			</form>
			<RedirectDialog dialogBox={dialogBox} open={dialogOpen} />
		</>
	);
}

export default ContactForm;
