export default {
	name: 'home',
	title: 'Homepage / Startseite',
	type: 'document',
	fields: [
		{
			name: 'titleLines',
			title: 'Titelzeilen auf Homepage',
			type: 'array',
			of: [{ type: 'string' }],
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
