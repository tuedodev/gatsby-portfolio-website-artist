import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import { navigate } from 'gatsby';

const useStyles = makeStyles((theme) => {
	return {
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

const RedirectDialog = ({ dialogBox, open }) => {
	const classes = useStyles();
	const [dialogOpen, setDialogOpen] = useState(false);

	useEffect(() => {
		if (open !== dialogOpen) {
			setDialogOpen(() => open);
		}
	}, [open, dialogOpen]);

	const Transition = React.forwardRef(function Transition(props, ref) {
		return <Slide direction="up" ref={ref} {...props} />;
	});
	const handleClose = () => {
		setDialogOpen(() => false);
		navigate(dialogBox.to);
	};
	return (
		<Dialog
			open={dialogOpen}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-labelledby="dialog-confirmation-title"
			aria-describedby="dialog-confirmation-description"
		>
			<div id="dialog-confirmation-title" className={classes.dialogHeader}>
				<Typography variant="h2">{dialogBox.slogan}</Typography>
			</div>

			<DialogContent>
				<div id="dialog-confirmation-description">
					<Divider variant="middle" className={classes.divider} />
					{dialogBox.notifications.map((item, index) => {
						return (
							<Typography key={index} variant="body2">
								{item}
							</Typography>
						);
					})}
					<Divider variant="middle" className={classes.divider} />
					<Typography variant="body2">{dialogBox.callToAction}</Typography>
					<Divider variant="middle" className={classes.divider} />
				</div>
			</DialogContent>
			<DialogActions>
				<Button size="large" onClick={handleClose} color="secondary" variant="contained">
					{dialogBox.buttonText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default RedirectDialog;
