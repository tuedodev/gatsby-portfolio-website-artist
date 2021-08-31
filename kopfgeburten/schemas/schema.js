// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import setting from './setting';
import home from './home';
import arbeiten from './arbeiten';
import ueber from './ueber';
import kontakt from './kontakt';
import datenschutz from './datenschutz';
import impressum from './impressum';
import pageNotFound from './pageNotFound';
import metadata from './metadata';
import figure from './figure';
import blockContent from './blockContent';
import blockContentDatenschutz from './blockContentDatenschutz';
import blockContentArbeiten from './blockContentArbeiten';
import dialogBox from './dialogBox';
// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
	// We name our schema
	name: 'default',
	// Then proceed to concatenate our document type
	// to the ones provided by any plugins that are installed
	types: schemaTypes.concat([
		/* Your types here! */
		setting,
		home,
		arbeiten,
		ueber,
		kontakt,
		datenschutz,
		impressum,
		pageNotFound,
		metadata,
		figure,
		blockContent,
		blockContentDatenschutz,
		blockContentArbeiten,
		dialogBox,
	]),
});
