import React from 'react'
import { Box, Text, useInput } from 'ink'

const Home = ({ setScreen, auth }) => {
	useInput(async (input) => {
		const key = input.toLowerCase()
		if (key === 'o') {
			await auth.signOut()
			setScreen('welcome')
		}
	})

	return (
		<Box flexDirection="column" borderStyle="double" borderColor="greenBright" paddingX={2}>
			<Text> </Text>
			<Text color="greenBright" bold>                  CLID                  </Text>
			<Text>────────────────────────────────────────</Text>
			<Text> </Text>
			<Text>  [B] Browse Profiles</Text>
			<Text> </Text>
			<Text>  [M] Matches & Chats</Text>
			<Text> </Text>
			<Text>  [P] My Profile</Text>
			<Text> </Text>
			<Text>  [F] My Preferences</Text>
			<Text> </Text>
			<Text>  [O] Sign Out</Text>
			<Text> </Text>
			<Text color="gray">
				{'Choose from the menu above.'}
			</Text>
			<Text> </Text>
		</Box>
	)
}

export default Home
