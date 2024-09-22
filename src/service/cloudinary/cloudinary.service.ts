import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiOptions, UploadApiResponse } from 'cloudinary';

/* Al ser un servicio completamente externo es preferible
aislar la logica del mismo del resto de la aplicacón*/

@Injectable()
export class CloudinaryService {
    constructor() {
        dotenv.config({
            path:'.env.development'
        })
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
    }

    // Es recomendable que en la base de datos alla un id generado yluego
    // un id o nombre original del archivo para facilitar el trabajo en el frontend
    // esto a su vez evida que se sobreescriban archivos que lleven el mismo nombre

    async uploadFile(buffer: Buffer, originalname?: string): Promise<string> {
        const options: UploadApiOptions = {
            folder: 'e-comerce',
            public_id: originalname,
            resource_type: 'auto'
        }

        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                options,
                (error, result) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    error ? reject(error) : resolve(result.secure_url)
                }
            )
            stream.write(buffer)
            stream.end()
        })
    }

    //La funcion hace uso de la api de clodinary y se trae el recurso

    async getUrl(publicId: string) {
        const result = await cloudinary.api.resource(publicId)
        return result
    }
}