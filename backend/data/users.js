import bcrypt from 'bcryptjs';

const users = [
  {
    email: 'admin@test.com',
    name: 'Admin User',
    username: 'admin',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin',
  },
  {
    email: 'client@test.com',
    name: 'John Doe',
    username: 'test',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
