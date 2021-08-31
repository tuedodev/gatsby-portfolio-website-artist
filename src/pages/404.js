import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { Container } from '@material-ui/core';
import RedirectDialog from '../components/RedirectDialog';

const NotFoundPage = (props) => {
	const pageNotFound = props.data.pageNotFound;
	const imageDefaultUrl = props.data.img.nodes[0].defaultImage.asset.url;
	const dialogBox = pageNotFound.dialogBox;
	const metaData = {
		...pageNotFound.metaData,
		...{ publishedAt: pageNotFound.publishedAt },
		...{ image: imageDefaultUrl },
	};

	return (
		<Layout metaData={metaData} location={props.location}>
			<Container maxWidth="lg">
				<RedirectDialog dialogBox={dialogBox} open={true} />
			</Container>
		</Layout>
	);
};

export default NotFoundPage;

export const query = graphql`
	query getPageNotFound {
		pageNotFound: sanityPageNotFound {
			publishedAt
			metaData {
				description
				keywords
				title
			}
			dialogBox {
				slogan
				notifications
				callToAction
				buttonText
				to
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
