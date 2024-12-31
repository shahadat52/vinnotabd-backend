

export type TUser = {
    name: string;
    email: string;
    phone: string;
    address?: string;
    password: string;
    role: 'superAdmin' | 'customer' | 'admin';
    status: 'in-progress' | 'blocked';
}