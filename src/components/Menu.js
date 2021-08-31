import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { NAVBAR } from '../lib/config';
import AnimatedNavbarItem from './AnimatedNavbarItem';

const Menu = React.forwardRef((props, ref) => {
	const [open, setOpen] = useState(props.open);
	const [translateY, setTranslateY] = useState(0);
	const ulElement = useRef(null);
	const amountOfItems = NAVBAR.length;

	if (props.open !== open) {
		setOpen(() => props.open);
	}

	useEffect(() => {
		const element = ulElement.current;
		if (element) {
			let height = element.getBoundingClientRect().height;
			let paddingTop = parseInt(getComputedStyle(element).getPropertyValue('padding-top')) || 0;
			let paddingBottom = parseInt(getComputedStyle(element).getPropertyValue('padding-bottom')) || 0;
			height = open ? 0 : height - paddingTop - paddingBottom;
			setTranslateY(() => height / amountOfItems);
		}
	}, [amountOfItems, open]);

	return (
		<nav className={`main-navbar${props.shrinked ? ' shrinked' : ''}${open ? ' open' : ''}`} ref={ref}>
			<ul ref={ulElement}>
				{NAVBAR.map((n, index) => {
					return (
						<li
							key={index}
							style={{
								transitionDelay: `${index * 0.02}s`,
								transform: `translate(0px, ${-index * translateY}px)`,
							}}
						>
							<AnimatedNavbarItem href={n.routing} text={n.title} delay={200} />
						</li>
					);
				})}
			</ul>
		</nav>
	);
});

export default Menu;
