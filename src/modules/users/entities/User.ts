export class User {
    constructor (
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public adress: string,
        public phone: string,
        public country?: string | undefined,
        public city?: string | undefined
    ) {}
}