import crypto from 'node:crypto';

export const hexSha512 = async (input: string): Promise<string> => {
	const hash = crypto.createHash('sha512');
	return Promise.resolve(hash.update(input).digest('hex'));
};
