import { Injectable } from "@nestjs/common";
import { User } from "./entities/User";
import { UserDTO } from "./entities/UserDTO";
import { CredentialDTO } from "../auth/entities/CredentialDTO";

@Injectable()
export class UsersRepository {
    private users: User[] = [
        { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", password: "password123", adress: "123 Maple St", phone: "555-1234", country: "USA", city: "New York" },
        { id: 2, name: "Bob Smith", email: "bob.smith@example.com", password: "password456", adress: "456 Oak St", phone: "555-5678", country: "Canada", city: "Toronto" },
        { id: 3, name: "Carlos Mendoza", email: "carlos.mendoza@example.com", password: "password789", adress: "789 Pine St", phone: "555-9101", country: "Mexico", city: "Mexico City" },
        { id: 4, name: "Diana Li", email: "diana.li@example.com", password: "securePass", adress: "101 Birch St", phone: "555-2345", country: "China", city: "Beijing" },
        { id: 5, name: "Edward Jones", email: "edward.jones@example.com", password: "myPassword", adress: "202 Cedar St", phone: "555-6789", country: "UK", city: "London" },
        { id: 6, name: "Fatima Al-Sayed", email: "fatima.alsayed@example.com", password: "qwerty123", adress: "303 Elm St", phone: "555-1122", country: "UAE", city: "Dubai" },
        { id: 7, name: "George Kim", email: "george.kim@example.com", password: "passGeorge", adress: "404 Spruce St", phone: "555-3344", country: "South Korea", city: "Seoul" },
        { id: 8, name: "Hana Suzuki", email: "hana.suzuki@example.com", password: "hanaPass", adress: "505 Fir St", phone: "555-5566", country: "Japan", city: "Tokyo" },
        { id: 9, name: "Igor Petrov", email: "igor.petrov@example.com", password: "123passIgor", adress: "606 Willow St", phone: "555-7788", country: "Russia", city: "Moscow" },
        { id: 10, name: "Julia Silva", email: "julia.silva@example.com", password: "passwordJulia", adress: "707 Palm St", phone: "555-9900", country: "Brazil", city: "Rio de Janeiro" },
        { id: 11, name: "Kamal Gupta", email: "kamal.gupta@example.com", password: "kamalPass123", adress: "808 Banyan St", phone: "555-1112", country: "India", city: "Mumbai" },
        { id: 12, name: "Lara Croft", email: "lara.croft@example.com", password: "adventurePass", adress: "909 Redwood St", phone: "555-3334", country: "UK", city: "London" },
        { id: 13, name: "Mikhail Romanov", email: "mikhail.romanov@example.com", password: "mikhailSecure", adress: "1010 Aspen St", phone: "555-5556", country: "Russia", city: "St. Petersburg" },
        { id: 14, name: "Nina Lopez", email: "nina.lopez@example.com", password: "passwordNina", adress: "1111 Oak St", phone: "555-7778", country: "Argentina", city: "Buenos Aires" },
        { id: 15, name: "Oscar Diaz", email: "oscar.diaz@example.com", password: "oscarSecure", adress: "1212 Pine St", phone: "555-9990", country: "Spain", city: "Madrid" },
        { id: 16, name: "Paula Martinez", email: "paula.martinez@example.com", password: "paulaPass123", adress: "1313 Maple St", phone: "555-2223", country: "Colombia", city: "Bogota" },
        { id: 17, name: "Quincy Adams", email: "quincy.adams@example.com", password: "adamsSecure", adress: "1414 Birch St", phone: "555-4445", country: "USA", city: "Boston" },
        { id: 18, name: "Rafael Santos", email: "rafael.santos@example.com", password: "rafaelPassword", adress: "1515 Cedar St", phone: "555-6667", country: "Portugal", city: "Lisbon" },
        { id: 19, name: "Sara Lindgren", email: "sara.lindgren@example.com", password: "lindgrenPass", adress: "1616 Elm St", phone: "555-8889", country: "Sweden", city: "Stockholm" },
        { id: 20, name: "Tariq Hassan", email: "tariq.hassan@example.com", password: "tariqSecure", adress: "1717 Fir St", phone: "555-0001", country: "Egypt", city: "Cairo" }
      ];
    
    private id: number = 21;

    getAll() {
        return this.users.map(user => {
            const {password, ...userOmiitPass} = user
            return userOmiitPass
        })
    }

    getById(id:string):Omit<User, 'password'> | string {
        const nId = Number(id)
        const user = this.users.find((user) => user.id === nId)
        if(!user) return `No se encontro ususairo con el ID ${nId}`
        else {
            const {password, ...userOmitPass} = user
            return userOmitPass
        }
        }

    createUser(data: UserDTO):User {
        const newUser = {...data, id:this.id}
        this.users.push(newUser)
        this.id++
        return newUser
    }

    updateUserData(id: string, data: UserDTO): User {
        const uId = Number(id)
        const user = this.users.find(user => user.id === uId)
        if(user) {
            user.name = data.name,
            user.phone = data.phone,
            user.email = data.email,
            user.adress = data.adress,
            user.country = data.country
            user.city = data.city
            }
        
        return user;
    }

    deleteUser(id:string):string {
        const uId = Number(id)
        const index = this.users.findIndex(user => user.id === uId)
        this.users.splice(index, 1)
        return `Se elimino el usuario con el id ${uId}`
    }

    findCredentials(data: CredentialDTO) {
        const user = this.users.find(user => user.email === data.email && user.password === data.password)
        return user
    }
}
