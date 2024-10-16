import { ApiProperty } from "@nestjs/swagger";

export class UploadFileDTO {
    @ApiProperty({
        type: 'string',
        format: 'binary'
    })
    fie: File
}