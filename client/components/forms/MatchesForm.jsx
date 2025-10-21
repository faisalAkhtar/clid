import React from 'react'
import { Box, Text } from 'ink'

const MatchesForm = ({ profiles, msg, loading}) => {
    return (
		<Box flexDirection="column" borderStyle="double" borderColor="yellowBright" paddingX={2}>
			<Text> </Text>
			<Text color="yellowBright" bold>                Matches                </Text>
			<Text> </Text>

            {loading ||
                !profiles &&
                <Text color="gray">Loading...</Text>}
            
            {profiles &&
                <>
                    <Box>
                        <Text color="yellowBright">{' '.padEnd(5)}</Text>
                        <Text color="yellowBright">{'Name'.padEnd(25)}</Text>
                        <Text color="yellowBright">{'Location'}</Text>
                    </Box>

                    <Text>──────────────────────────────────────────</Text>
                    <Text> </Text>
                </>}

            {profiles &&
                profiles.length === 0 &&
                <Text color="gray">No matches. Browse profiles and go swiping!</Text>}

			{profiles &&
                profiles.length !== 0 &&
                profiles.map((p,i) => (
				<Box flexDirection="column" key={p.id}>
    				<Box>
                        <Text>{(i+1).toString().padEnd(5)}</Text>
                        <Text>{p.name.padEnd(25)}</Text>
                        <Text>{p.location}</Text>
                    </Box>
                    <Text> </Text>
				</Box>
			))}

            <Text color="gray">[Esc] Exit</Text>
			{msg && <Text color={msg.includes('Match') ? 'magentaBright' : 'yellow'}>{msg}</Text>}
			<Text> </Text>
		</Box>
	)
}

export default MatchesForm
