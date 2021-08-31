export default {
	name: 'metaData',
	title: 'Metadata für Header (SEO)',
	description: 'Metadata im Header für SEO-freundliche Website.',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: '<title>',
			type: 'string',
			description:
				'<title>-Tag, optimal sind 50 bis 60 Zeichen, bleibt das Feld leer, wird automatisch der Seitentitel genutzt',
		},
		{
			name: 'description',
			title: '<meta name="description">',
			type: 'string',
			description: 'Beschreibung der individuellen Seite: Optimal 50 bis 160 Zeichen lang.',
			validation: (Rule) => Rule.required().error('description ist Pflichtfeld'),
		},
		{
			name: 'keywords',
			title: '<meta name="keywords">',
			type: 'string',
			description:
				"Maximal fünf bis zehn Wörter. Bitte mit Kommas 'keyword1, keyword2, ...' trennen. Keywords sind optional und werden laut Google nicht mehr ausgewertet. ",
		},
	],
};
