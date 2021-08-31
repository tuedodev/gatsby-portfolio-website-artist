import React from 'react';
import '../scss/main.scss';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core';
import Header from './Header';
import Footer from './Footer';
import Seo from './Seo.js';

const theme = createTheme({
	palette: {
		type: 'dark',
		primary: {
			main: 'rgba(255, 255, 255, 0.82)',
		},
		secondary: {
			main: '#ffa500',
		},
		text: {
			primary: 'rgba(255, 255, 255, 0.82)',
			secondary: 'rgba(255, 255, 255, 0.72)',
		},
		error: {
			main: '#ff474c',
		},
		warning: {
			main: '#ff474c',
		},
		background: {
			default: '#121212',
		},
	},
	typography: {
		fontFamily: ['Quicksand', 'sans-serif'].join(','),
		fontSize: 16,
		fontWeightLight: 300,
		fontWeightRegular: 300,
		fontWeightMedium: 300,
		fontWeightBold: 300,
		h1: {
			fontSize: 'clamp(2rem, calc(1.5rem + 2vw + 1vh), 5rem)',
		},
		h2: {
			fontSize: 'clamp(1rem, calc(0.8rem + 1.5vw + 0.8vh), 4rem)',
		},
		h3: {
			fontSize: 'clamp(0.6rem, calc(0.5rem + 1vw + 0.5vh), 3.6rem)',
		},
		h4: {
			fontSize: 'clamp(0.6rem, calc(0.4rem + 0.8vw + 0.4vh), 3.2rem)',
		},
		h5: {
			fontSize: 'clamp(0.6rem, calc(0.3rem + 0.7vw + 0.35vh), 3rem)',
		},
		body1: {
			fontSize: '1.8rem',
		},
		body2: {
			fontSize: '1.4rem',
		},
	},
	transitions: {
		duration: {
			enteringScreen: 4000,
			leavingScreen: 4000,
		},
	},
});

export default function Layout({
	children,
	metaData,
	location,
	noScrollingPossible = false,
	mainStyle = {},
}) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{/**/}
			<div id="kopfgeburten">
				<Seo metaData={metaData} location={location} />
				<Header noScrollingPossible={noScrollingPossible} />
				<main style={mainStyle}>
					<Container maxWidth="lg">{children}</Container>
				</main>
				<Footer />
			</div>
		</ThemeProvider>
	);
}
