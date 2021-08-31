import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import BlockText from '../components/BlockText';
import StaticCard from '../components/StaticCard';
import { Container, Grid } from '@material-ui/core';

function Impressum(props) {
	const impressum = props.data.impressum;
	const rawContent = impressum._rawContent;
	const imageDefaultUrl = props.data.img.nodes[0].defaultImage.asset.url;
	const mainImage = impressum.mainImage.image.asset.gatsbyImageData;
	const mainImageUrl = impressum.mainImage.image.asset.url;
	const imageUrl = mainImageUrl || imageDefaultUrl;
	const metaData = {
		...impressum.metaData,
		...{ publishedAt: impressum.publishedAt },
		...{ image: imageUrl },
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
						<StaticCard title={impressum.title} image={mainImage} imgStyle={imgStyle} intro={impressum.intro}>
							<BlockText rawContent={rawContent} />
						</StaticCard>
					</Grid>
				</Grid>
			</Container>
		</Layout>
	);
}

export default Impressum;

export const query = graphql`
	query getImpressum {
		impressum: sanityImpressum {
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
