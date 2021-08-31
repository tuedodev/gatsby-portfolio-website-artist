export default {
	name: 'figure',
	title: 'Figure',
	type: 'object',
	fields: [
		{
			name: 'image',
			type: 'image',
			title: 'Image',
			options: {
				hotspot: false,
			},
		},
		{
			name: 'caption',
			type: 'string',
			title: 'Beschriftung',
		},
		{
			name: 'showCaption',
			type: 'boolean',
			title: 'Beschriftung zeigen',
		},
		{
			name: 'alt',
			type: 'string',
			title: 'Alt-Tag',
			description: 'Alternativer Text im Browser, falls Bild nicht geladen werden kann.',
		},
		{
			name: 'imagePublishedAt',
			title: 'Published at',
			type: 'datetime',
		},
	],
};
