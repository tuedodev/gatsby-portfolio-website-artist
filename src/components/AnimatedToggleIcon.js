import React from 'react';

function AnimatedToggleIcon(props) {
	return (
		<div className="toggle-icon">
			<div className={`label-class${props.isChecked ? ' checked' : ''}`}>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	);
}

export default AnimatedToggleIcon;
