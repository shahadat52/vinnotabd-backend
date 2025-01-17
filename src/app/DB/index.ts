import { UserModel } from "../modules/user/user.model";

const superUser = {
  email: 'shahadat@gmail.com',
  name: 'shahadat',
  password: 'admin123',
  role: 'superAdmin',
  phone: '01866168264',
  status: 'in-progress'
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await UserModel.findOne({ role: 'superAdmin' });

  if (!isSuperAdminExits) {
    await UserModel.create(superUser);
  }
};

export default seedSuperAdmin;
