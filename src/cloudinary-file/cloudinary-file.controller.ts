import {
	Controller,
	FileTypeValidator,
	HttpCode,
	MaxFileSizeValidator,
	NotFoundException,
	ParseFilePipe,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CloudinaryFileService } from './cloudinary-file.service'
import { CloudinaryFileResponse } from './dto/cloudinary-file.response'

@Controller('upload')
export class CloudinaryFileController {
	constructor(private readonly cloudinaryFileService: CloudinaryFileService) {}

	@Post()
	@HttpCode(200)
	@Auth('admin')
	@UseInterceptors(FileInterceptor('file'))
	async uploadImage(
		@UploadedFile(
			new ParseFilePipe({
				validators: [new MaxFileSizeValidator({ maxSize: 100000000 })],
			})
		)
		file: Express.Multer.File,
		@Query('folder') folder?: string
	): Promise<CloudinaryFileResponse[]> {
		const uploadFileResponse = await this.cloudinaryFileService.uploadFile(
			file,
			folder
		)
		if (!uploadFileResponse) throw new NotFoundException('Upload file failed')
		return uploadFileResponse
	}
}
