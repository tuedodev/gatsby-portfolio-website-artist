import React from 'react';
import { Helmet } from 'react-helmet';
import useSiteMetadata from '../hooks/useSiteMetadata';
import { METADATA_DEFAULT, WEBSITE_OWNER, WEBSITE_PATH } from '../lib/config';
import LogoHeader from './LogoHeader';

const getSchemaOrgJSONLD = ({ isBlogPost, url, title, image, description, datePublished }) => {
	const schemaOrgJSONLD = [
		{
			'@context': 'http://schema.org',
			'@type': 'WebSite',
			url,
			name: title,
			alternateName: METADATA_DEFAULT.title,
		},
	];
	return isBlogPost
		? [
				...schemaOrgJSONLD,
				{
					'@context': url,
					'@type': 'BreadcrumbList',
					itemListElement: [
						{
							'@type': 'ListItem',
							position: 1,
							item: {
								'@id': url,
								name: title,
								image,
							},
						},
					],
				},
				{
					'@context': WEBSITE_PATH,
					'@type': 'BlogPosting',
					url,
					name: title,
					alternateName: METADATA_DEFAULT.title,
					headline: title,
					image: {
						'@type': 'ImageObject',
						url: image,
					},
					description,
					author: {
						'@type': 'Person',
						name: WEBSITE_OWNER,
					},
					publisher: {
						'@type': 'Organization',
						url: WEBSITE_PATH,
						logo: LogoHeader,
						name: WEBSITE_OWNER,
					},
					mainEntityOfPage: {
						'@type': 'WebSite',
						'@id': WEBSITE_OWNER,
					},
					datePublished,
				},
		  ]
		: schemaOrgJSONLD;
};

const Seo = ({ isBlogPost, metaData, location }) => {
	const title = metaData.title || METADATA_DEFAULT.title;
	const description = metaData.description || metaData.intro || METADATA_DEFAULT.description;
	const { keywords } = metaData;
	const { siteUrl } = useSiteMetadata();
	const url = `${siteUrl}${location.pathname}`;
	let image = metaData.image || null;

	const datePublished = isBlogPost ? metaData.publishedAt : false;
	const schemaOrgJSONLD = getSchemaOrgJSONLD({
		isBlogPost,
		url,
		title,
		image,
		description,
		datePublished,
	});

	return (
		<Helmet>
			{/* General tags */}
			<meta charSet="utf-8" />
			<title>{title}</title>
			<link rel="canonical" href={url} />
			<meta name="description" content={description} />
			{keywords && <meta name="keywords" content={keywords} />}
			{image && <meta name="image" content={image} />}

			{/* Schema.org tags */}
			<script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>

			{/* OpenGraph tags */}
			<meta property="og:url" content={url} />
			{isBlogPost ? <meta property="og:type" content="article" /> : null}
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />

			{/* Twitter Card tags */}
			<meta name="twitter:card" content="summary_large_image" />

			{/*<meta name="twitter:creator" content={config.twitter} />*/}
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />

			{/* Javascript Embedding of external scripts - not used currently */}
			{/*<script src={withPrefix('js/main.js')} type="text/javascript" /> Error Warning !!!!!!!*/}
		</Helmet>
	);
};

export default Seo;
