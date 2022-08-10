import { ConfigService } from '@nestjs/config'
import { ConfigOptions, v2 } from 'cloudinary'

export const CloudinaryFileProvider = {
	provide: 'Cloudinary',
	inject: [ConfigService],
	useFactory: async (configService: ConfigService): Promise<ConfigOptions> => {
		return v2.config({
			cloud_name: 'm7mark',
			api_key: configService.get('CLOUD_API_KEY'),
			api_secret: configService.get('CLOUD_API_SECRET'),
		})
	},
}
