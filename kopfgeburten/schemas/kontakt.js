export default {
	name: 'kontakt',
	title: 'Kontakt',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'intro',
			title: 'Intro',
			type: 'text',
		},
		{
			name: 'mainImage',
			title: 'Teaser Photo',
			type: 'figure',
		},
		{
			name: 'dialogBox',
			title: 'Dialogbox',
			description: 'Erscheint nach Absenden der Kontaktdaten und vor Weiterleitung auf Startseite',
			type: 'dialogBox',
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
