import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
const useStyles = makeStyles((theme) => ({
	logopictureWrapper: {
		width: '70vw',
		maxWidth: '320px',
		transition: theme.transitions.create(['width', 'max-width'], {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut,
		}),
		margin: 0,
		padding: 0,
		//marginRight: '-32px',
		'& img': {
			width: '100%',
			height: 'auto',
		},
		'&.shrinked': {
			maxWidth: '240px',
		},
	},
}));

const query = graphql`
	{
		logo: allSanitySetting(limit: 1) {
			nodes {
				logo {
					asset {
						gatsbyImageData(width: 500, placeholder: BLURRED)
					}
				}
			}
		}
	}
`;

const LogoHeader = ({ shrinked }) => {
	const { logo } = useStaticQuery(query);
	const logopic = getImage(logo.nodes[0].logo.asset.gatsbyImageData);
	const classes = useStyles();
	return (
		<div className={clsx(classes.logopictureWrapper, shrinked && 'shrinked')}>
			<GatsbyImage image={logopic} alt="marion piller kopfgeburten logo" as="div" />
		</div>
	);
};

export default LogoHeader;
