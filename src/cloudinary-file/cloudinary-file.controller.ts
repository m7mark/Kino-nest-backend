import {
	Controller,
	HttpCode,
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
	@UseInterceptors(FileInterceptor('image'))
	async uploadFile(
		@UploadedFile() file: Express.Multer.File,
		@Query('folder') folder?: string
	): Promise<CloudinaryFileResponse> {
		return await this.cloudinaryFileService.uploadFile(file, folder)
	}
}
