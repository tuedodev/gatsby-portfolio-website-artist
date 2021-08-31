import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { NAVBAR } from '../../lib/config';
import AnimatedNavbarItem from '../AnimatedNavbarItem';
import { mainNavbar, mainNavbarCollapsed } from './styles.module.scss';

function Navbar(props) {
	const { collapsed } = props;
	const [bool, setIsBool] = useState(collapsed);
	const [translateY, setTranslateY] = useState(0);
	const amountOfItems = NAVBAR.length;
	const elementRef = useRef();

	const bgImageArray = imageArray.map((img) => {
		return convertToBgImage(img.image);
	});

	const isCheckedHandler = (value) => {
		setIsBool(() => value);
	};

	useEffect(() => {
		const domElement = elementRef.current;
		let height = domElement.getBoundingClientRect().height;
		let paddingTop = parseInt(getComputedStyle(domElement).getPropertyValue('padding-top')) || 0;
		let paddingBottom = parseInt(getComputedStyle(domElement).getPropertyValue('padding-bottom')) || 0;
		height = height - paddingTop - paddingBottom;
		height = bool ? height : 0;
		setTranslateY(() => height / amountOfItems);
	}, [amountOfItems, bool]);

	return (
		<nav className={bool ? mainNavbarCollapsed : mainNavbar}>
			<ul ref={elementRef}>
				{NAVBAR.map((n, index) => {
					return (
						<li key={index} style={{ transform: `translateY(${-translateY * index}px)` }}>
							<AnimatedNavbarItem href={n.routing} text={n.title} delay={200} />
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

export default Navbar;
