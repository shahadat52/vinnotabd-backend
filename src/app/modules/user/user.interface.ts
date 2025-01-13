

export type TUser = {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: 'superAdmin' | 'customer' | 'admin';
    status: 'in-progress' | 'blocked';
}