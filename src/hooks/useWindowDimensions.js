// from https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
// with using ResizeObserve instead of resize event listener
import { useState, useEffect } from 'react';

export default function useWindowDimensions() {
	let initWidth, initHeight;
	if (typeof window !== 'undefined') {
		initWidth = window.innerWidth;
		initHeight = window.innerHeight;
	}
	const [windowDimensions, setWindowDimensions] = useState({
		width: initWidth,
		height: initHeight,
	});

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			if (Array.isArray(entries)) {
				let width = entries[0].contentRect.width;
				let height = entries[0].contentRect.height;
				setWindowDimensions(() => ({ width, height }));
			}
		});
		resizeObserver.observe(document.documentElement);

		return () => resizeObserver.unobserve(document.documentElement);
	}, []);

	return windowDimensions;
}
