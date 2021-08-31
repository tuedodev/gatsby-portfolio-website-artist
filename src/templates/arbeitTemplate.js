import React, { useState } from 'react';
import Layout from '../components/layout';
import SimpleSlider from '../components/SimpleSlider';
import Grid from '@material-ui/core/Grid';
import { getImage } from 'gatsby-plugin-image';
import { makeStyles } from '@material-ui/core/styles';
import Card from '../components/Card';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100vw',
		height: '100vh',
	},
	paper: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
	},
	backdrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.85)',
	},
}));
function getImageData(data) {
	return {
		caption: data.caption,
		showCaption: data.showCaption,
		image: getImage(data.image.asset.gatsbyImageData),
	};
}
function ArbeitenTemplate(props) {
	const classes = useStyles();
	const [modalOpen, setModalOpen] = useState(false);
	const [initPicture, setInitPicture] = useState(0);

	const { arbeit, img } = props.pageContext;
	const rawContent = arbeit._rawContent;
	const mainImage = getImageData(arbeit.mainImage);
	const mainImageSmall = [
		{ ...mainImage, image: getImage(arbeit.mainImage.image.asset.gatsbyImageData1000) },
	];
	const additionalImages =
		arbeit.additionalImages.length > 0
			? arbeit.additionalImages.map((img) => {
					return getImageData(img);
			  })
			: [];
	const imageArray = [mainImage, ...additionalImages];
	const imageArraySmall = [...mainImageSmall, ...additionalImages];
	const imageDefaultUrl = img.nodes[0].defaultImage.asset.url;
	const mainImageUrl = arbeit.mainImage.image.asset.url;
	const imageUrl = mainImageUrl || imageDefaultUrl;
	const metaData = { ...arbeit.metaData, ...{ publishedAt: arbeit.publishedAt }, ...{ image: imageUrl } };
	const modalCloseHandler = () => setModalOpen(false);

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};

	const eventHandlerModal = ({ index }) => {
		if (index !== initPicture) {
			setInitPicture(() => index);
		}
		handleModalOpen();
	};

	return (
		<Layout metaData={metaData} location={props.location}>
			<Grid container spacing={2} justifyContent="center">
				<Grid item xs={12} sm={8} md={6}>
					<Card
						title={arbeit.title}
						imageArray={imageArray}
						description={rawContent}
						category={arbeit.category}
						handler={eventHandlerModal}
					/>
				</Grid>
				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					className={classes.modal}
					open={modalOpen}
					onClose={handleModalClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						transitionDuration: 500,
						className: classes.backdrop,
					}}
				>
					<Fade in={modalOpen}>
						<div className={classes.paper}>
							<SimpleSlider
								imageArray={imageArraySmall}
								init={initPicture}
								modalCloseHandler={modalCloseHandler}
							/>
						</div>
					</Fade>
				</Modal>
			</Grid>
		</Layout>
	);
}

export default ArbeitenTemplate;
