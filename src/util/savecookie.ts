import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export const saveCookie = async (cookie: string): Promise<void> => {
	const eraporDir = path.resolve(os.homedir(), '.eraporsma');
	if (!fs.existsSync(eraporDir)) {
		await fs.promises.mkdir(eraporDir, {
			recursive: true,
		});
	}

	await fs.promises.writeFile(path.resolve(eraporDir, 'credentials.txt'), cookie);
};

export const readCookie = (): string | undefined => {
	const eraporDir = path.resolve(os.homedir(), '.eraporsma');
	if (!fs.existsSync(eraporDir)) {
		return undefined;
	}

	return fs.readFileSync(path.resolve(eraporDir, 'credentials.txt'), {
		encoding: 'utf-8',
	});
};
