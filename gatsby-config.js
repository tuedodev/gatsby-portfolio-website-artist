require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
	siteMetadata: {
		title: process.env.GATSBY_SITEMETADATA_TITLE,
		description: process.env.GATSBY_SITEMETADATA_DESCRIPTION,
		author: process.env.GATSBY_SITEMETADATA_AUTHOR,
		siteUrl: process.env.GATSBY_SITEMETADATA_SITEURL,
	},
	plugins: [
		`gatsby-plugin-material-ui`,
		`gatsby-plugin-transition-link`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-s3`,
			options: {
				bucketName: 'kopfgeburten',
			},
		},
		{
			resolve: 'gatsby-plugin-robots-txt',
			options: {
				resolveEnv: () => process.env.GATSBY_ENV,
				env: {
					development: {
						policy: [{ userAgent: '*', disallow: ['/'] }],
					},
					production: {
						//policy: [{ userAgent: '*', allow: '/' }],
						policy: [{ userAgent: '*', disallow: ['/'] }],
					},
				},
			},
		},
		{
			resolve: 'gatsby-source-sanity',
			options: {
				projectId: process.env.GATSBY_SANITY_PROJECTID,
				dataset: process.env.GATSBY_SANITY_DATASET,
			},
		},
		'gatsby-plugin-sass',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sitemap',
		`gatsby-plugin-image`,
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				icon: 'src/images/icon.png',
			},
		},
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: './src/images/',
			},
			__key: 'images',
		},
	],
};
