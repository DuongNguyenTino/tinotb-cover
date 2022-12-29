import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { useAppSelector } from './hooks/redux';
import themeConfigs from './configs/themeMode.config';
import { ToastContainer } from 'react-toastify';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import PageWrapper from './components/common/PageWrapper';
import routes from './routes';

function App() {
	const { themeMode } = useAppSelector((state) => state.themeMode)
	return (
		<ThemeProvider theme={themeConfigs.custom({ mode: themeMode })} >
			{/*Toastify */}
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme={themeMode === 'dark' ? 'dark' : 'light'}
			/>
			{/* Toastify */}

			{/* Reset Css */}
			<CssBaseline />
			{/* Reset Css */}

			{/* Routes */}
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<MainLayout />}>
						{
							routes.map((route, i) => (
								route.index ? (
									<Route
										index
										key={i}
										element={route.state ? (
											<PageWrapper state={route.state}>
												{route.element}
											</PageWrapper>
										) : route.element}
									/>
								) : (
									<Route
										key={i}
										path={route.path}
										element={route.state ? (
											<PageWrapper state={route.state}>
												{route.element}
											</PageWrapper>
										) : route.element}
									/>
								)
							))
						}
					</Route>
				</Routes>
			</BrowserRouter>
			{/* Routes */}
		</ThemeProvider>
	);
}

export default App;
