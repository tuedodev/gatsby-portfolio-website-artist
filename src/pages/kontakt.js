import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import StaticCard from '../components/StaticCard';
import ContactForm from '../components/ContactForm';
import { Container, Grid } from '@material-ui/core';
import { FORM_TEXTFIELDS } from '../lib/config';

function Kontakt(props) {
	const kontakt = props.data.kontakt;
	const imageDefaultUrl = props.data.img.nodes[0].defaultImage.asset.url;
	const mainImage = kontakt.mainImage.image.asset.gatsbyImageData;
	const mainImageUrl = kontakt.mainImage.image.asset.url;
	const imageUrl = mainImageUrl || imageDefaultUrl;
	const dialogBox = kontakt.dialogBox;
	const metaData = {
		...kontakt.metaData,
		...{ publishedAt: kontakt.publishedAt },
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
						<StaticCard title={kontakt.title} image={mainImage} imgStyle={imgStyle} intro={kontakt.intro}>
							<ContactForm formArray={FORM_TEXTFIELDS} dialogBox={dialogBox} />
						</StaticCard>
					</Grid>
				</Grid>
			</Container>
		</Layout>
	);
}

export default Kontakt;

export const query = graphql`
	query getKontakt {
		kontakt: sanityKontakt {
			title
			intro
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
