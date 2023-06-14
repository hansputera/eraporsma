import {SHA512} from '@stablelib/sha512';
import arrayBufferToHex from 'array-buffer-to-hex';

export const hexSha512 = async (input: string): Promise<string> => {
	const sha = new SHA512().update(new TextEncoder().encode(input));
	const digest = sha.digest();

	return arrayBufferToHex(digest);
};
