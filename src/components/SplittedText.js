import React from 'react';
import { splitTextIntoSpans } from '../lib/utils';

function SplittedText(props) {
	const text = props.children;
	let { as, divider = '' } = props;
	as = ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(as) ? as : 'div';
	const splittedText = splitTextIntoSpans({
		text,
		delayPerItemInMilliseconds: props.delayPerItemInMilliseconds,
		divider,
	});
	return React.createElement(as, {}, splittedText);
}

export default SplittedText;
