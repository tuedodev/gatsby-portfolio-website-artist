import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import CurvedCarousel from '../components/CurvedCarousel';

function Arbeiten(props) {
	const arbeiten = props.data.arbeiten.nodes;
	const imageDefaultUrl = props.data.img.nodes[0].defaultImage.asset.url;
	const mainImageUrl = arbeiten[0].mainImage.image.asset.url;
	const imageUrl = mainImageUrl || imageDefaultUrl;
	const metaData = {
		...arbeiten[0].metaData,
		...{ publishedAt: arbeiten[0].publishedAt },
		...{ image: imageUrl },
	};
	return (
		<Layout
			metaData={metaData}
			location={props.location}
			noScrollingPossible={true}
			mainStyle={{ minHeight: '100vh' }}
		>
			<CurvedCarousel pictureArray={arbeiten} />
		</Layout>
	);
}

export default Arbeiten;
export const query = graphql`
	query getAllArbeitenPics {
		arbeiten: allSanityArbeiten {
			nodes {
				id
				title
				slug {
					current
				}
				mainImage {
					image {
						asset {
							url
							gatsbyImageData(aspectRatio: 1.5)
						}
					}
				}
				publishedAt
				metaData {
					description
					keywords
					title
				}
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
