export default {
	name: 'arbeiten',
	title: 'Arbeiten',
	type: 'document',
	initialValue: {
		isFeatured: false,
	},
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 250, // will be ignored if slugify is set
				slugify: (input) =>
					input
						.toLowerCase()
						.replace(/\s+/g, '-')
						.replace(/\u00e4/g, 'ae')
						.replace(/\u00f6/g, 'oe')
						.replace(/\u00fc/g, 'ue')
						.replace(/\u00df/g, 'ss')
						.replace(/[^a-zA-Z0-9\-]|\s+/g, '')
						.slice(0, 250),
			},
			validation: (Rule) => Rule.required().error('Slug ist Pflichtfeld'),
		},
		{
			name: 'description',
			title: 'Kurze Beschreibung',
			type: 'blockContentArbeiten',
		},

		{
			title: 'Kategorie',
			name: 'category',
			type: 'string',
			options: {
				list: [
					{ title: 'abstrakt', value: 'abstrakt' },
					{ title: 'figurativ', value: 'figurativ' },
					{ title: 'skulptural', value: 'skulptural' },
				],
			},
		},
		{
			name: 'mainImage',
			title: 'Main image',
			description:
				'Hinweis: Das Hauptfoto sollte eine größere Breite als Höhe einnehmen, um auf dem Picture Slider auf der Homepage besser dargestellt zu werden.',
			type: 'figure',
		},
		{
			name: 'additionalImages',
			title: 'Weitere Bilder',
			type: 'array',
			of: [{ type: 'figure' }],
		},
		{
			name: 'isFeatured',
			title: 'Gefeatured auf der Startseite?',
			type: 'boolean',
		},
		{
			name: 'isFeaturedPositions',
			title: 'Position auf der Startseite',
			description: 'Falls gefeatured auf der Startseite: Reihenfolge/Position',
			type: 'number',
		},
		{
			name: 'metaData',
			type: 'metaData',
			title: 'Metadata für Header (SEO)',
			description: 'Ausfüllen: Hilft, bessere Platzierungen bei Google & Co. zu erzielen.',
		},
		{
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
			validation: (Rule) => Rule.required().error('Datum ist Pflichtfeld'),
		},
	],
};
