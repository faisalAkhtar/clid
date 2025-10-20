import React, { useState, useEffect } from 'react'
import { render, Text } from 'ink'
import useAuth from './hooks/useAuth.js'

import Welcome from './components/Welcome.jsx'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import Home from './components/Home.jsx'

const App = () => {
	const auth = useAuth()
	const [screen, setScreen] = useState('welcome')

	useEffect(() => {
		if (!auth.loading && auth.token) setScreen('home')
	}, [auth.loading, auth.token])

	if (auth.loading) return <Text>Loading...</Text>

	switch (screen) {
		case 'signin':
			return <SignIn setScreen={setScreen} auth={auth} />
		case 'signup':
			return <SignUp setScreen={setScreen} auth={auth} />
		case 'home':
			return <Home setScreen={setScreen} auth={auth} />
		default:
			return <Welcome setScreen={setScreen} />
	}
}

render(<App />)
