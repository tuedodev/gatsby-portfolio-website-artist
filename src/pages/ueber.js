import React from 'react';
import Layout from '../components/layout';
import BlockText from '../components/BlockText';
import StaticCard from '../components/StaticCard';
import { graphql } from 'gatsby';
import { Container, Grid } from '@material-ui/core';

function Ueber(props) {
	const ueber = props.data.ueber;
	const rawContent = ueber._rawContent;
	const imageDefaultUrl = props.data.img.nodes[0].defaultImage.asset.url;
	const mainImage = props.data.ueber.mainImage.image.asset.gatsbyImageData;
	const mainImageUrl = props.data.ueber.mainImage.image.asset.url;
	const imageUrl = mainImageUrl || imageDefaultUrl;
	const metaData = { ...ueber.metaData, ...{ publishedAt: ueber.publishedAt }, ...{ image: imageUrl } };

	return (
		<Layout metaData={metaData} location={props.location}>
			<Container maxWidth="lg">
				<Grid container direction="row" justifyContent="center" alignItems="center">
					<Grid item sm={12} md={8} xl={6}>
						<StaticCard image={mainImage} title={ueber.title} intro={ueber.intro}>
							<BlockText rawContent={rawContent} />
						</StaticCard>
					</Grid>
				</Grid>
			</Container>
		</Layout>
	);
}

export default Ueber;

export const query = graphql`
	query getUeber {
		ueber: sanityUeber {
			_rawContent(resolveReferences: { maxDepth: 3 })
			title
			intro
			publishedAt
			metaData {
				description
				keywords
				title
			}
			mainImage {
				image {
					asset {
						gatsbyImageData
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
