import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CloudinaryFileController } from './cloudinary-file.controller'
import { CloudinaryFileProvider } from './cloudinary-file.provider'
import { CloudinaryFileService } from './cloudinary-file.service'

@Module({
	imports: [ConfigModule],
	providers: [CloudinaryFileProvider, CloudinaryFileService],
	controllers: [CloudinaryFileController],
})
export class CloudinaryFileModule {}
