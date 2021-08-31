import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import PictureSlider from '../components/PictureSlider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import AnimatedText from '../components/AnimatedText';
import CardFeatured from '../components/CardFeatured';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	hero: {
		height: '100%',
	},
	itemVerticallyCentered: {
		display: 'flex',
		alignItems: 'center',
	},
}));

function IndexPage(props) {
	const home = props.data.home;
	const titleLines = home.titleLines;
	const arbeiten = props.data.arbeiten.nodes;
	const featured = props.data.featured.nodes;
	const imageDefaultUrl = props.data.img.nodes[0].defaultImage.asset.url;
	const mainImageUrl = arbeiten[0].mainImage.image.asset.url;
	const imageUrl = mainImageUrl || imageDefaultUrl;
	const metaData = { ...home.metaData, ...{ publishedAt: home.publishedAt }, ...{ image: imageUrl } };
	const classes = useStyles();

	return (
		<Layout metaData={metaData} location={props.location}>
			<Grid container spacing={1}>
				<Grid item sm={12} md={6}>
					<Grid container spacing={2} className={classes.hero}>
						{titleLines[0] && (
							<Grid item xs={12} key={1} className={classes.itemVerticallyCentered}>
								<Typography color="textPrimary" variant="h1">
									<AnimatedText
										text={titleLines[0]}
										delayPerItemInMilliseconds={30}
										delimiter=""
										startDelay={0}
										whiteSpace="pre"
										letterSpacing={'2.2rem'}
										letterSpacingMobile="0.8rem"
										animationName="wordAnimation1"
									/>
								</Typography>
							</Grid>
						)}
						{titleLines[1] && (
							<Grid item xs={12} key={2} className={classes.itemVerticallyCentered}>
								<Typography color="textSecondary" variant="h2">
									<AnimatedText
										text={titleLines[1]}
										delayPerItemInMilliseconds={30}
										delimiter=""
										startDelay={200}
										whiteSpace="pre"
										className="serif"
										letterSpacing="1.2rem"
										letterSpacingMobile="0.4rem"
										animationName="wordAnimation2"
									/>
								</Typography>
							</Grid>
						)}
						{titleLines[2] && (
							<Grid item xs={12} key={3} className={classes.itemVerticallyCentered}>
								<Typography color="textSecondary" variant="h3">
									<AnimatedText
										text={titleLines[2]}
										delayPerItemInMilliseconds={30}
										delimiter=""
										startDelay={400}
										whiteSpace="pre"
										letterSpacing="0.6rem"
										letterSpacingMobile="normal"
										animationName="wordAnimation3"
									/>
								</Typography>
							</Grid>
						)}
					</Grid>
				</Grid>
				<Grid item xs={12} md={6}>
					<Hidden mdUp>
						<Grid item sm={2} />
					</Hidden>
					<PictureSlider pictureArray={arbeiten} as="div" />
					<Hidden mdUp>
						<Grid item sm={2} />
					</Hidden>
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				{featured.map((f, index) => {
					return (
						<React.Fragment key={index}>
							<Hidden mdUp>
								<Grid item xs={2} />
							</Hidden>
							<Grid item xs={8} md={4}>
								<AniLink fade duration={0.5} to={`/arbeiten/${f.slug.current}/`}>
									<CardFeatured
										gatsbyImageData={f.mainImage.image.asset.gatsbyImageData}
										category={f.category}
									/>
								</AniLink>
							</Grid>
							<Hidden mdUp>
								<Grid item xs={2} />
							</Hidden>
						</React.Fragment>
					);
				})}
			</Grid>
		</Layout>
	);
}

export default IndexPage;
export const query = graphql`
	query getAllArbeiten {
		home: sanityHome {
			metaData {
				description
				keywords
				title
			}
			publishedAt
			titleLines
		}
		arbeiten: allSanityArbeiten {
			nodes {
				id
				title
				mainImage {
					image {
						asset {
							url
							gatsbyImageData(aspectRatio: 1.5)
						}
					}
				}
				slug {
					current
				}
			}
		}
		featured: allSanityArbeiten(limit: 3, sort: { fields: isFeaturedPositions, order: ASC }) {
			nodes {
				id
				title
				mainImage {
					image {
						asset {
							url
							gatsbyImageData(aspectRatio: 1.5)
						}
					}
				}
				slug {
					current
				}
				publishedAt
				isFeatured
				isFeaturedPositions
				category
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
