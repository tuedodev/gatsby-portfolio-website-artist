export default {
	name: 'dialogBox',
	title: 'Dialogbox',
	description: 'Pop-up-Dialogbox zur Information',
	type: 'object',
	fields: [
		{
			name: 'slogan',
			title: 'Überschrift / Slogan ',
			type: 'string',
		},
		{
			name: 'notifications',
			title: 'Meldungsparagraphen',
			type: 'array',
			of: [{ type: 'string' }],
		},
		{
			name: 'callToAction',
			title: 'Was wird als Nächstes gemacht?',
			type: 'string',
		},
		{
			name: 'buttonText',
			title: 'Schriftzug auf Button',
			type: 'string',
		},
		{
			name: 'to',
			title: 'relativer Pfad',
			description: 'Relativer Weiterleitungspfad. Wenn leer erfolgt keine Weiterleitung.',
			type: 'string',
		},
	],
};
