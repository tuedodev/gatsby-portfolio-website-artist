import React from 'react';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

const AnimatedLink = React.forwardRef((props, ref) => {
	const { duration = 0.5, to, className, value } = props;
	return (
		<div ref={ref} style={{ display: 'inline' }}>
			<AniLink fade duration={duration} to={`${to.length > 0 ? `/${to}/` : `/`}`} className={className}>
				{value}
			</AniLink>
		</div>
	);
});

export default AnimatedLink;
