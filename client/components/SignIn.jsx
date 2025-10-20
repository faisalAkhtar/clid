import React, { useState } from 'react'
import { Box, Text, useInput } from 'ink'
import TextInput from 'ink-text-input'

const SignIn = ({ setScreen, auth }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [focus, setFocus] = useState('username') // 'username', 'password', or 'none'
	const [msg, setMsg] = useState('')

	useInput(async (input, key) => {
		if (key.escape) return setScreen('welcome')

		if (key.return) {
			if (focus === 'username') setFocus('password')
			else if (focus === 'password') setFocus('none')
			else if (focus === 'none') setMsg('Press Y to confirm login, or U/P to edit.')
		}

		if (!key.return && !key.escape) {
			if (input.toLowerCase() === 'u') setFocus('username')
			if (input.toLowerCase() === 'p') setFocus('password')

			if (input.toLowerCase() === 'y' && focus === 'none') {
				try {
					setMsg('Logging in...')
					await auth.signIn(username, password)
					setScreen('home')
				} catch (e) {
					try {
						let err = JSON.parse(e)
						setMsg('Login failed. Try again.\n' + err.error)
					} catch (err) {
						setMsg('Login failed. Try again.')
					}
				}
			}
		}
	})

	return (
		<Box flexDirection="column" borderStyle="double" borderColor="cyanBright" paddingX={2}>
			<Text> </Text>

			<Text color="cyanBright" bold>            Sign In              </Text>
			<Text>────────────────────────────────────────</Text>

			<Text> </Text>

			<Text>
				Username:{' '}
				<TextInput
					value={username}
					onChange={setUsername}
					placeholder="Enter username"
					focus={focus === 'username'}
				/>
			</Text>

			<Text> </Text>

			<Text>
				Password:{' '}
				<TextInput
					value={password}
					onChange={setPassword}
					mask="*"
					placeholder="Enter password"
					focus={focus === 'password'}
				/>
			</Text>

			<Text> </Text>
			<Text color="gray">
				{focus === 'username' && '<Enter> Next | <Esc> Back'}
				{focus === 'password' && '<Enter> Done | <Esc> Back'}
				{focus === 'none' && '<U> Edit Username  <P> Edit Password  <Y> Submit'}
			</Text>

			{msg && <>
				<Text> </Text>
				<Text color="yellow">{msg}</Text>
				</>}

			<Text> </Text>
		</Box>
	)
}

export default SignIn
