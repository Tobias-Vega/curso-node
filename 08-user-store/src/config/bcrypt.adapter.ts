import { compare, genSalt, hash, } from 'bcryptjs';

export const bcryptAdapter = {

  hash: async (password: string) => {
    const salt =  await genSalt(10);
    return hash(password, salt);
  },

  compare: async (password: string, hashed: string) => {
    return await compare(password, hashed);
  }

}