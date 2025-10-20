import React, { useState } from 'react'
import { Box, Text, useInput } from 'ink'
import TextInput from 'ink-text-input'

const SignUp = ({ setScreen, auth }) => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [focus, setFocus] = useState('username') // 'username' | 'email' | 'password' | 'none'
	const [msg, setMsg] = useState('')

	useInput(async (input, key) => {
		if (key.escape) return setScreen('welcome')

		if (key.return) {
			if (focus === 'username') setFocus('email')
			else if (focus === 'email') setFocus('password')
			else if (focus === 'password') setFocus('none')
			else if (focus === 'none') setMsg('Press Y to confirm signup, or U/E/P to edit fields.')
		}

		if (!key.return && !key.escape) {
			const i = input.toLowerCase()

			if (i === 'u') setFocus('username')
			if (i === 'e') setFocus('email')
			if (i === 'p') setFocus('password')

			if (i === 'y' && focus === 'none') {
				try {
					setMsg('Signing up...')
					await auth.signUp(username, email, password)
					setMsg('Signup successful! Redirecting to Sign In...')
					setTimeout(() => setScreen('signin'), 1000)
				} catch (e) {
					try {
						let err = JSON.parse(e)
						setMsg('Signup failed. Try again.\n' + err.error)
					} catch (err) {
						setMsg('Signup failed. Try again.')
					}
				}
			}
		}
	})

	return (
		<Box flexDirection="column" borderStyle="double" borderColor="magentaBright" paddingX={2}>
			<Text> </Text>

			<Text color="magentaBright" bold>             Sign Up              </Text>
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
				Email:{' '}
				<TextInput
					value={email}
					onChange={setEmail}
					placeholder="Enter email"
					focus={focus === 'email'}
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
				{focus === 'email' && '<Enter> Next | <Esc> Back'}
				{focus === 'password' && '<Enter> Done | <Esc> Back'}
				{focus === 'none' && '<U> Edit Username  <E> Edit Email  <P> Edit Password  <Y> Submit'}
			</Text>

			{msg && <>
				<Text> </Text>
				<Text color={msg.includes('failed') ? 'red' : 'yellow'}>{msg}</Text>
				</>}

			<Text> </Text>
		</Box>
	)
}

export default SignUp
