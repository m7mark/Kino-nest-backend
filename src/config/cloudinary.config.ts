import { UploadApiOptions } from 'cloudinary'

export const getCloudinaryUploadOptions = (
	fileName: string,
	fieldName: string
): UploadApiOptions => ({
	resource_type: `${fieldName}`,
	folder: 'KINOAPP',
	filename_override: `${fileName}`,
	unique_filename: false,
	use_filename: true,
})
