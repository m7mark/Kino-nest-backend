import { UploadApiOptions } from 'cloudinary'

export const getCloudinaryUploadOptions = (
	fileName: string
): UploadApiOptions => ({
	folder: 'KINOAPP',
	filename_override: `${fileName}`,
	unique_filename: false,
	use_filename: true,
})
