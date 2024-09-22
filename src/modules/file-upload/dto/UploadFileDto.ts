export interface UploadFIleDto {
    fieldname: string,
    originalname: string,
    mimetype: string,
    size: string,
    buffer: Buffer
}