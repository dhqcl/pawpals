import { Controller, Post, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
    constructor(private readonly uploadsService: UploadsService) { }

    @Post('file')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }), // 10MB
                    // new FileTypeValidator({ fileType: '.(png|jpeg|jpg|mp4)' }),
                ],
            }),
        )
        file: Express.Multer.File,
    ) {
        const path = await this.uploadsService.uploadFile(file);
        // We need to figure out the full URL. 
        // If we returned /media/..., we need a way to serve it.
        // MinIO serves it at :9000/bucket/file.
        // We can proxy it via Nginx or just return the direct MinIO URL if exposed.
        // Given we exposed MinIO at 9100 (in docker-compose), let's use that.
        // But wait, user said "localhost:4000" was blocked.
        // Ideally we proxy media too?

        // For now, let's return the full URL assuming standard port.
        // Actually, `docker-compose` maps 9100:9000.
        // So browser should hit http://server-ip:9100/bucket/file.
        // But we don't know server-ip.

        // Strategy: 
        // We will configure a Next.js rewrite for /media -> MinIO too!
        // That is the most robust way.
        // So returning `/media/bucket/file` is perfect.
        return { url: path };
    }
}
