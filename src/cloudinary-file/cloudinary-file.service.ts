import { Injectable, NotFoundException } from '@nestjs/common'
import { UploadApiResponse, v2 } from 'cloudinary'
import { getCloudinaryUploadOptions } from 'src/config/cloudinary.config'
import { CloudinaryFileResponse } from './dto/cloudinary-file.response'
import { bufferToStream } from './utils/buffer'

@Injectable()
export class CloudinaryFileService {
	async uploadFile(
		file: Express.Multer.File,
		folder: string = 'kino'
	): Promise<CloudinaryFileResponse[]> {
		let fileType: string
		if (file.mimetype.includes('image')) {
			fileType = 'image'
		} else if (file.mimetype.includes('video')) {
			fileType = 'video'
		} else return
		return new Promise((resolve, reject) => {
			const fileName = `${folder}-${file.originalname}`
			const upload = v2.uploader.upload_stream(
				getCloudinaryUploadOptions(fileName, fileType),
				(err, result?: UploadApiResponse) => {
					if (err) reject(err.message)
					const res = [
						{
							url: result?.secure_url,
							name: result?.original_filename,
						},
					]
					return resolve(res)
				}
			)
			bufferToStream(file.buffer).pipe(upload)
		})
	}
}
