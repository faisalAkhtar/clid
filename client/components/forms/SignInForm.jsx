import React from 'react'
import { Box, Text } from 'ink'
import TextInput from 'ink-text-input'

const SignInForm = ({ username, password, focus, onChange, msg }) => {
	return (
		<Box flexDirection="column" borderStyle="double" borderColor="cyanBright" paddingX={2}>
			<Text> </Text>
			<Text color="cyanBright" bold>            Sign In              </Text>
			<Text>───────────────────────────────────</Text>

			<Text> </Text>
			<Text>
				Username{' '}:{' '}
				<TextInput
					value={username}
					onChange={(val) => onChange('username', val)}
					placeholder="Enter username"
					focus={focus === 'username'}
				/>
			</Text>

			<Text> </Text>
			<Text>
				Password{' '}:{' '}
				<TextInput
					value={password}
					onChange={(val) => onChange('password', val)}
					mask="*"
					placeholder="Enter password"
					focus={focus === 'password'}
				/>
			</Text>

			<Text> </Text>
			<Text color="gray">
				{focus === 'username' && '<Enter> Next | <Esc> Back'}
				{focus === 'password' && '<Enter> Done | <Esc> Back'}
				{focus === 'none' && '<U> Edit Email  <P> Edit Password  <Y> Submit  <Esc> Exit'}
			</Text>

			{msg && <Text color={msg.includes('failed') ? 'red' : 'yellow'}>{msg}</Text>}
			<Text> </Text>
		</Box>
	)
}

export default SignInForm
