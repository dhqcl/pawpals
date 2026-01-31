import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class UploadsService {
    private minioClient: Minio.Client;
    private bucketName: string;
    private logger = new Logger(UploadsService.name);

    constructor(private configService: ConfigService) {
        this.minioClient = new Minio.Client({
            endPoint: this.configService.get('MINIO_ENDPOINT', 'localhost'),
            port: parseInt(this.configService.get('MINIO_PORT', '9000')),
            useSSL: false,
            accessKey: this.configService.get('MINIO_ACCESS_KEY', 'minioadmin'),
            secretKey: this.configService.get('MINIO_SECRET_KEY', 'minioadmin'),
        });
        this.bucketName = this.configService.get('MINIO_BUCKET', 'petverse-media');
        this.ensureBucket();
    }

    private async ensureBucket() {
        try {
            const exists = await this.minioClient.bucketExists(this.bucketName);
            if (!exists) {
                await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
                this.logger.log(`Bucket ${this.bucketName} created.`);
                // Set public policy
                const policy = {
                    Version: '2012-10-17',
                    Statement: [
                        {
                            Effect: 'Allow',
                            Principal: { AWS: ['*'] },
                            Action: ['s3:GetObject'],
                            Resource: [`arn:aws:s3:::${this.bucketName}/*`],
                        },
                    ],
                };
                await this.minioClient.setBucketPolicy(this.bucketName, JSON.stringify(policy));
            }
        } catch (err) {
            this.logger.error('Error ensuring bucket exists', err);
        }
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const timestamp = Date.now();
        const ext = file.originalname.split('.').pop();
        const filename = `${timestamp}-${Math.round(Math.random() * 1e9)}.${ext}`;

        await this.minioClient.putObject(
            this.bucketName,
            filename,
            file.buffer,
            file.size,
            { 'Content-Type': file.mimetype }
        );

        // Construct public URL
        // Note: In production, this should be the public URL (e.g. Nginx or Cloudfront)
        // For now we assume typical Docker setup where 9000 is exposed
        // Or mapped via the frontend proxy?
        // Let's return a relative path or full URL.
        // Since we are proxying, we might want to return a path relative to the proxy or a full public one.
        // For simplicity, let's return the relative path from the bucket root, 
        // and the frontend can prepend the MinIO public URL if needed, 
        // OR we return a constructed URL that works if MinIO is exposed.

        // Since we set up specific ports (9100:9000), let's use the public address if known, 
        // But the backend doesn't know the public IP.
        // A robust way for the MVP is using the browser-accessible URL.
        // But the user's server setup is tricky.

        // Let's assume the user will configure a generic media host env var, 
        // or we just return the filename and let the frontend construct it.
        // Actually, simplest is calculating the URL based on request, but MinIO might be on another domain.

        // Let's try to construct a localhost-friendly URL for now, which can be overridden.
        return `/media/${this.bucketName}/${filename}`;
    }
}
