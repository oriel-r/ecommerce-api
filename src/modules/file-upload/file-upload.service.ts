import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { UploadFIleDto } from './dto/UploadFileDto';

@Injectable()
export class FileUploadService {
    constructor(private readonly claudinaryService: CloudinaryService) {}

    async uploadFile(file: UploadFIleDto) {
        return this.claudinaryService.uploadFile(file.buffer, file.originalname) 
    }

    async getUrl(id: string) {
        return this.claudinaryService.getUrl(id)
    }
}
