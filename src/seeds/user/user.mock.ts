import { UserDTO } from "src/modules/users/entities/UserDTO";
import * as bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'

dotenv.config({path: '.env.development'});

const createAdmin = async ():Promise<UserDTO> => {
const hashedpassword = await bcrypt.hash(process.env.ADMIN_SEED_PASSWORD, 10);

    return {
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedpassword,
        is_admin: true,
        phone: 11223344,
        adress: 'Av Siempreviva 1234',
        country: 'Un pais',
        city: 'una ciudad' 
    }
}

export const admin = createAdmin()