import fs from 'fs'
import os from 'os'
import path from 'path'

const TOKEN_PATH = path.join(os.homedir(), '.clid_token')

export default {
	saveToken(token) {
		fs.writeFileSync(TOKEN_PATH, token, 'utf8')
	},
	getToken() {
		try {
			return fs.readFileSync(TOKEN_PATH, 'utf8')
		} catch {
			return null
		}
	},
	clearToken() {
		if (fs.existsSync(TOKEN_PATH)) fs.unlinkSync(TOKEN_PATH)
	},
}
