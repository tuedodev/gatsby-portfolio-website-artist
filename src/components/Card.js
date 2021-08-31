import React from 'react';
import { Card as MuiCard } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { convertToBgImage } from 'gbimage-bridge';
import BackgroundImage from 'gatsby-background-image';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Fab from '@material-ui/core/Fab';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import PhotoIcon from '@material-ui/icons/Photo';
import Collapse from '@material-ui/core/Collapse';
import PictureWrapper from './PictureWrapper';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import BlockText from './BlockText';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '1rem',
	},
	header: {
		margin: '0.8rem 0 1.2rem',
	},
	photo: {
		height: 0,
		width: '100%',
		paddingTop: '50%',
		display: 'block',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		zIndex: 1,
	},
	mainPhoto: {
		paddingTop: '67%',
	},
	media: {
		height: 0,
		paddingTop: '50%', // 16:9
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
	cardActions: {
		justifyContent: 'center',
	},
}));

const Card = (props) => {
	const classes = useStyles();
	const { title, imageArray, description, category, handler } = props;
	const bgImageArray = imageArray.map((img) => {
		return convertToBgImage(img.image);
	});
	const [expanded, setExpanded] = React.useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<MuiCard className={classes.root}>
			<div className={classes.header}>
				<Typography variant="h1" color="textPrimary">
					{title}
				</Typography>
				{category && category.length > 0 ? <Chip label={category} size="small" color="secondary" /> : null}
			</div>
			<PictureWrapper>
				<Fab
					size="large"
					color="secondary"
					aria-label="add"
					onClick={(event) =>
						handler({
							event,
							index: 0,
						})
					}
					style={{}}
				>
					<ZoomOutMapIcon />
				</Fab>
				<BackgroundImage
					className={clsx(classes.photo, classes.mainPhoto)}
					Tag="div"
					{...bgImageArray[0]}
					preserveStackingContext
				></BackgroundImage>
			</PictureWrapper>
			<CardContent>
				<BlockText rawContent={description} />
			</CardContent>
			{bgImageArray.length > 1 && (
				<>
					<CardActions className={classes.cardActions}>
						<Fab
							variant="extended"
							onClick={handleExpandClick}
							color="secondary"
							aria-expanded={expanded}
							aria-label="show more"
						>
							<PhotoIcon />
							{expanded ? 'Zuklappen' : 'Mehr Bilder'}
						</Fab>
					</CardActions>
					<Collapse in={expanded} timeout="auto" style={{ marginTop: '1rem' }}>
						{bgImageArray.map((img, index) => {
							const comp = (
								<PictureWrapper key={index}>
									<Fab
										size="medium"
										color="secondary"
										aria-label="add"
										onClick={(event) =>
											handler({
												event,
												index: index,
											})
										}
										style={{}}
									>
										<ZoomOutMapIcon />
									</Fab>
									<BackgroundImage
										key={index}
										className={classes.photo}
										Tag="div"
										{...img}
										preserveStackingContext
									></BackgroundImage>
								</PictureWrapper>
							);
							if (index > 0) {
								return comp;
							} else {
								return null;
							}
						})}
					</Collapse>
				</>
			)}
		</MuiCard>
	);
};

export default Card;
