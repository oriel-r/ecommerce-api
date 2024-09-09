export class UserDTO {
    constructor (
        public name: string,
        public email: string,
        public password: string,
        public adress: string,
        public phone: string,
        public country?: string | undefined,
        public city?: string | undefined
    ) {}
}