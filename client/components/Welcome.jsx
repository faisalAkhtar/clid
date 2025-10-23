import React from 'react'
import { Box, Text, useInput, useApp } from 'ink'

const Welcome = ({ setScreen }) => {
	const { exit } = useApp()

	useInput((input) => {
		if (input.toLowerCase() === 's') setScreen('signin')
		if (input.toLowerCase() === 'u') setScreen('signup')
		if (input.toLowerCase() === 'q') exit()
	})

	return (
		<Box flexDirection="column" borderStyle="double" borderColor="cyanBright" paddingX={2}>
			<Text> </Text>
			<Text color="cyanBright" bold>            Welcome to CLID             </Text>
			<Text>────────────────────────────────────────</Text>
			<Text> </Text>
			<Text>  [S] Sign In</Text>
			<Text> </Text>
			<Text>  [U] Sign Up</Text>
			<Text>  </Text>
			<Text>  [Q] Quit</Text>
			<Text> </Text>
			<Text color="gray">
				{'Please sign-in to continue.'}
			</Text>
			<Text> </Text>
			<Text color="gray">
				{'Made with love by Faisal (https://faisalakhtar.github.io)'}
			</Text>
			<Text> </Text>
		</Box>
	)
}

export default Welcome
