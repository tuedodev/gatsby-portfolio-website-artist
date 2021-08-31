/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default {
	title: 'Block Content Datenschutz',
	name: 'blockContentDatenschutz',
	type: 'object',
	initialValue: {
		isCollapsed: true,
	},
	fields: [
		{
			name: 'title',
			title: 'Überschrift',
			type: 'string',
		},
		{
			name: 'content',
			title: 'Inhalt',
			type: 'array',
			of: [
				{
					title: 'Block',
					type: 'block',
					// Styles let you set what your user can mark up blocks with. These
					// correspond with HTML tags, but you can set any title or value
					// you want and decide how you want to deal with it where you want to
					// use your content.
					styles: [{ title: 'Normal', value: 'normal' }],
					lists: [{ title: 'Bullet', value: 'bullet' }],
					// Marks let you mark up inline text in the block editor.
					marks: {
						// Decorators usually describe a single property – e.g. a typographic
						// preference or highlighting by editors.
						decorators: [
							{ title: 'Strong', value: 'strong' },
							{ title: 'Emphasis', value: 'em' },
							{ title: 'Underline', value: 'underline' },
							{ title: 'Strike', value: 'strike-through' },
						],
						// Annotations can be any object structure – e.g. a link or a footnote.
						annotations: [
							{
								title: 'URL',
								name: 'link',
								type: 'object',
								fields: [
									{
										title: 'URL',
										name: 'href',
										type: 'url',
									},
									{
										title: 'Open in new window',
										name: 'targetBlank',
										type: 'boolean',
									},
								],
							},
						],
					},
				},
			],
		},
		{
			name: 'isCollapsed',
			type: 'boolean',
			title: 'Content Collapsed?',
			description: 'Anzeige nur der Überschrift nach dem Laden der Seite',
		},
	],
};
