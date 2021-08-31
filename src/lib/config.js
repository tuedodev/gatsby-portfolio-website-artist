export const NAVBAR = [
	{
		key: 1,
		title: 'home',
		routing: '',
		className: 'nav-link',
	},
	{
		key: 2,
		title: 'arbeiten',
		routing: 'arbeiten',
		className: 'nav-link',
	},
	{
		key: 3,
		title: 'über',
		routing: 'ueber',
		className: 'nav-link',
	},
	{
		key: 4,
		title: 'kontakt',
		routing: 'kontakt',
		className: 'nav-link',
	},
	{
		key: 5,
		title: 'datenschutz',
		routing: 'datenschutz',
		className: 'nav-link',
	},
	{
		key: 6,
		title: 'impressum',
		routing: 'impressum',
		className: 'nav-link',
	},
];

export const PICTURESLIDERARRAY = [
	{
		filename: '1.jpg',
		caption: 'Slider 1',
		alt: 'Slider 1',
		href: '#',
		clientHeight: 0,
		element: null,
		a: null,
	},
	{
		filename: '2.jpg',
		caption: 'Slider 2',
		alt: 'Slider 2',
		href: '#',
		clientHeight: 0,
		element: null,
		a: null,
	},
	{
		filename: 'orig-3.jpg',
		caption: 'Slider 3',
		alt: 'Slider 3',
		href: '#',
		clientHeight: 0,
		element: null,
		a: null,
	},
];

export const FORM_TEXTFIELDS = [
	{
		id: 'lastName',
		label: 'Name',
		type: 'text',
		required: false,
		props: {
			variant: 'outlined',
		},
	},
	{
		id: 'email',
		label: 'E-Mail',
		type: 'email',
		required: true,
		props: {
			variant: 'outlined',
		},
	},
	{
		id: 'message',
		label: 'Nachricht',
		type: 'text',
		multiline: true,
		required: true,
		props: {
			variant: 'outlined',
			minRows: 3,
			maxRows: 10,
		},
	},
	{
		id: 'privacyTermsChecked',
		label: [
			'Die ',
			{ privacyTerms: 'Hinweise zum Datenschutz' },
			' habe ich gelesen und stimme ihnen hiermit zu.',
		],
		type: 'checkboxPrivacyTerms',
		required: true,
		props: {},
	},
	{
		id: 'captcha',
		label: 'Captcha-Code',
		type: 'text',
		required: true,
		props: {
			variant: 'outlined',
		},
	},
];

export const FIELD_ERROR_MESSAGES = {
	valueMissing: 'Bitte tätigen Sie hier Ihre Eingabe.',
	typeMismatch: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
	patternMismatch: 'Ihre Eingabe entspricht nicht dem erforderlichen Muster.',
	tooLong: 'Ihre Eingabe ist zu lang.',
	tooShort: 'Ihre Eingabe ist zu kurz.',
	rangeUnderflow: 'Ihre Eingabe ist unterhalb eines erforderlichen Bereichs.',
	rangeOverflow: 'Ihre Eingabe ist über einem erforderlichen Bereichs.',
	stepMismatch: 'Ihre Eingabe ist nicht regelkonform.',
	badInput: 'Der Browser kann Ihre Eingabe nicht verarbeiten.',
	customError: 'Ein spezieller Fehler ist aufgetreten.',
	captchaCodeWrong: 'Der Sicherheitscode ist falsch.',
	tooEarly: 'Ein allgemeiner Fehler ist aufgetreten.',
};

export const METADATA_DEFAULT = {
	title: `${process.env.GATSBY_SITEMETADATA_TITLE}`,
	description: `${process.env.GATSBY_SITEMETADATA_DESCRIPTION}`,
};

export const WEBSITE_PATH = `${process.env.GATSBY_SITEMETADATA_SITEURL}`;
export const WEBSITE_OWNER = `${process.env.GATSBY_SITEMETADATA_OWNER}`;
export const SOCIAL_MEDIA_LINK_FB = `${process.env.GATSBY_SOCIAL_MEDIA_LINK_FB}`;
