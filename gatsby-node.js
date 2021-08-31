exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;
	const result = await graphql(`
		{
			allSlugs: allSanityArbeiten(filter: { slug: { current: { ne: null } } }) {
				nodes {
					mainImage {
						image {
							asset {
								gatsbyImageData
								url
								gatsbyImageData1000: gatsbyImageData(width: 1000, placeholder: BLURRED)
							}
						}
						caption
						showCaption
					}
					additionalImages {
						image {
							asset {
								gatsbyImageData(width: 1000, placeholder: BLURRED)
								url
							}
						}
						caption
						showCaption
					}
					title
					category
					id
					_rawContent: _rawDescription(resolveReferences: { maxDepth: 3 })
					publishedAt
					metaData {
						description
						keywords
						title
					}
					slug {
						current
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
	`);
	if (result.errors) {
		throw result.errors;
	}
	const arbeiten = result.data.allSlugs.nodes || [];
	const img = result.data.img || {};
	arbeiten.forEach((arbeit, index) => {
		const path = `/arbeiten/${arbeit.slug.current}`;
		createPage({
			path,
			component: require.resolve('./src/templates/arbeitTemplate.js'),
			context: { arbeit: arbeit, img: img },
		});
	});
};
