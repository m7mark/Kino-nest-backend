import { Readable } from 'stream'

export const bufferToStream = (buffer: Buffer) => {
	const readable = new Readable({
		read() {
			this.push(buffer)
			this.push(null)
		},
	})
	return readable
}
