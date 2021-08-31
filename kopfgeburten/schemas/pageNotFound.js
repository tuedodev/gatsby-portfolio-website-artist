export default {
	name: 'pageNotFound',
	title: '404 Error: Page Not Found',
	description: '404 Fehler-Seite',
	type: 'document',
	fields: [
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
