import { Injectable } from '@nestjs/common'
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary'
import { getCloudinaryUploadOptions } from 'src/config/cloudinary.config'
import { CloudinaryFileResponse } from './dto/cloudinary-file.response'
import { bufferToStream } from './utils/buffer'

@Injectable()
export class CloudinaryFileService {
	async uploadFile(
		file: Express.Multer.File,
		folder: string = 'default'
	): Promise<CloudinaryFileResponse[]> {
		return new Promise((resolve) => {
			const fileName = `${folder}-${file.originalname}`
			const upload = v2.uploader.upload_stream(
				getCloudinaryUploadOptions(fileName),
				(_, result?: UploadApiResponse) => {
					const res = [
						{
							url: result.secure_url,
							name: result.original_filename,
						},
					]
					return resolve(res)
				}
			)
			bufferToStream(file.buffer).pipe(upload)
		})
	}
}
