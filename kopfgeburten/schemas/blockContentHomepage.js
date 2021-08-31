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
	title: 'Titelzeilen auf Homepage / Startseite',
	name: 'blockContentHomepage',
	type: 'array',
	of: [
		{
			title: 'Block',
			type: 'block',
			// Styles let you set what your user can mark up blocks with. These
			// correspond with HTML tags, but you can set any title or value
			// you want and decide how you want to deal with it where you want to
			// use your content.
			styles: [{ title: 'Header 1', value: 'h1' }],
			// Marks let you mark up inline text in the block editor.
		},
	],
};
