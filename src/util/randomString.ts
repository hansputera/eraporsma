import crypto from 'node:crypto';

export const getRandomString = (len = 6) => crypto.randomBytes(len).toString('hex');
