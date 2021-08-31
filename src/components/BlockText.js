import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PortableText from 'react-portable-text';

const useStyles = makeStyles((theme) => ({
	header: {
		margin: '1.2rem 0',
		padding: '1rem 0',
	},
}));

const BlockText = ({ rawContent }) => {
	const classes = useStyles();
	return (
		<PortableText
			// Pass in block content straight from Sanity.io
			content={rawContent}
			// Optionally override marks, decorators, blocks, etc. in a flat
			// structure without doing any gymnastics
			serializers={{
				h1: (props) => (
					<Typography variant="h1" className={clsx(classes.header, 'serif')} {...props}></Typography>
				),
				h2: (props) => (
					<Typography variant="h2" className={clsx(classes.header, 'serif')} {...props}></Typography>
				),
				h3: (props) => (
					<Typography variant="h3" className={clsx(classes.header, 'serif')} {...props}></Typography>
				),
				h4: (props) => (
					<Typography variant="h4" className={clsx(classes.header, 'serif')} {...props}></Typography>
				),
				h5: (props) => (
					<Typography variant="h5" className={clsx(classes.header, 'serif')} {...props}></Typography>
				),
				h6: (props) => (
					<Typography variant="h6" className={clsx(classes.header, 'serif')} {...props}></Typography>
				),
				li: ({ children }) => <li>{children}</li>,
				link: (props) => {
					return props.targetBlank ? (
						<a
							style={{ textDecoration: 'none', color: 'lightblue' }}
							href={props.href}
							target="_blank"
							rel="noopener noreferrer"
						>
							{props.children}
						</a>
					) : (
						<a style={{ textDecoration: 'none', color: 'lightblue' }} href={props.href}>
							{props.children}
						</a>
					);
				},
				normal: (props) => <Typography variant="body2" color="textSecondary" {...props}></Typography>,
			}}
		/>
	);
};

export default BlockText;
