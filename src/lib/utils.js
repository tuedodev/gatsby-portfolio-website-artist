import React from 'react';

export function splitTextIntoSpans({
	text = '',
	delayPerItemInMilliseconds = 0,
	startDelay = 0,
	delimiter = '',
}) {
	const textArray = text.split(delimiter);
	return textArray.map((char, index) => {
		const delay = startDelay + index * delayPerItemInMilliseconds;
		const cl = char === ' ' ? 'space' : null;
		return (
			<span
				key={index}
				index={index}
				className={cl}
				style={{
					transitionDelay: `${delay}ms`,
					animationDelay: `${delay}ms`,
				}}
			>
				{char}
			</span>
		);
	});
}

export function getPositionX(event) {
	return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

export function convertCheckboxValues(event) {
	return {
		event,
		id: event.target.id,
		value: event.target.checked,
	};
}
