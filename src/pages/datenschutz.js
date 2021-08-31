import React, { useState } from 'react';
import Layout from '../components/layout';
import StaticCard from '../components/StaticCard';
import { graphql } from 'gatsby';
import { Container, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PortableText from 'react-portable-text';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
	list: {
		listStylePosition: 'inside',
	},
	header: {
		margin: '1.2rem 0',
		padding: '1rem 0',
	},
	subheader: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		'& h2, & h3, & h4': {
			padding: 0,
		},
	},
	subheaderTitle: {
		flex: 1,
		padding: 0,
	},
	paragraph: {
		padding: '0.6rem 0',
	},
	subheaderButton: {
		flex: 0,
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
}));

function Datenschutz(props) {
	const classes = useStyles();
	const datenschutz = props.data.datenschutz;
	const imageDefaultUrl = props.data.img.nodes[0].defaultImage.asset.url;
	const mainImageUrl = datenschutz.mainImage.image.asset.url;
	const mainImage = datenschutz.mainImage.image.asset.gatsbyImageData;
	const imageUrl = mainImageUrl || imageDefaultUrl;
	const metaData = {
		...datenschutz.metaData,
		...{ publishedAt: datenschutz.publishedAt },
		...{ image: imageUrl },
	};
	const [collapsed, setCollapsed] = useState(() => datenschutz.privacyBlocks.map((pb) => pb.isCollapsed));
	const handleExpandClick = (index) => {
		setCollapsed((prev) => {
			const newArray = [...prev];
			newArray[index] = !newArray[index];
			return newArray;
		});
	};
	const imgStyle = {
		paddingTop: '25%',
		backgroundColor: '#2b2a2f',
		mixBlendMode: 'multiply',
	};

	return (
		<Layout metaData={metaData} location={props.location}>
			<Container maxWidth="lg">
				<Grid container direction="row" justifyContent="center" alignItems="center">
					<Grid item sm={12} md={8} xl={6}>
						<StaticCard
							title={datenschutz.title}
							intro={datenschutz.intro}
							image={mainImage}
							imgStyle={imgStyle}
							className={classes.root}
						>
							{datenschutz.privacyBlocks.map((t, index, arr) => {
								return (
									<React.Fragment key={index}>
										<div className={classes.subheader}>
											<Typography variant="h3" className={clsx(classes.subheaderTitle, 'serif')}>
												{t.title}
											</Typography>
											<IconButton
												className={clsx(classes.subheaderButton, classes.expand, {
													[classes.expandOpen]: !collapsed[index],
												})}
												onClick={() => handleExpandClick(index)}
												aria-expanded={!collapsed[index]}
												aria-label="show more"
											>
												<ExpandMoreIcon />
											</IconButton>
										</div>
										<Collapse in={!collapsed[index]} timeout="auto" unmountOnExit>
											<PortableText
												// Pass in block content straight from Sanity.io

												content={t._rawContent}
												// Optionally override marks, decorators, blocks, etc. in a flat
												// structure without doing any gymnastics
												serializers={{
													li: ({ children }) => <li className={classes.list}>{children}</li>,
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
													normal: (props) => (
														<Typography
															className={classes.paragraph}
															variant="body2"
															color="textSecondary"
															{...props}
														></Typography>
													),
												}}
											/>
										</Collapse>
										{index !== arr.length - 1 && <Divider />}
									</React.Fragment>
								);
							})}
						</StaticCard>
					</Grid>
				</Grid>
			</Container>
		</Layout>
	);
}

export default Datenschutz;

export const query = graphql`
	query getDatenschutz {
		datenschutz: sanityDatenschutz {
			title
			intro
			privacyBlocks {
				_rawContent(resolveReferences: { maxDepth: 3 })
				title
				isCollapsed
			}
			publishedAt
			metaData {
				description
				keywords
				title
			}
			mainImage {
				image {
					asset {
						gatsbyImageData(width: 800, placeholder: BLURRED)
						url
					}
				}
				alt
			}
		}
		img: allSanitySetting(limit: 1) {
			nodes {
				defaultImage {
					asset {
						url
					}
				}
			}
		}
	}
`;
