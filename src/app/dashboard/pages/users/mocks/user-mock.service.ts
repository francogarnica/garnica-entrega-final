import { User } from "../components/models";

export class UserMockService {
    private users: User[] = [

        {
            id: 1,
            name: 'FAKE_NAME',
            surname: 'FAKE_SURNAME',
            email: 'FAKE@MAIL.COM',
            password: '123456',
        },
    ];

    getUsers(): User[] {
        return this.users;
    }
}