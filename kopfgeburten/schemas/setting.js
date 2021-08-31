export default {
	name: 'setting',
	title: 'Setting',
	type: 'document',

	fields: [
		{
			name: 'websiteTitle',
			title: 'Website-Titel',
			type: 'string',
			validation: (Rule) => Rule.required().error('description ist Pflichtfeld'),
		},
		{
			name: 'websiteSubtitle',
			title: 'Website-Subtitel',
			type: 'string',
			validation: (Rule) => Rule.required().error('description ist Pflichtfeld'),
		},
		{
			name: 'logo',
			title: 'Logo',
			type: 'image',
			options: {
				hotspot: false,
			},
		},
		{
			name: 'defaultImage',
			title: 'Default-Image (für SEO/Metatags)',
			type: 'image',
			description: 'Wird als Default benutzt, wenn auf Site kein anderes Foto herangezogen werden kann.',
			validation: (Rule) => Rule.required().error('Default Image ist Pflichtfeld.'),
		},
		{
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
		},
	],
};
