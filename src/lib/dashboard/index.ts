import {type AppInfo, type SchoolInfo} from '@/interfaces/dashboard';
import {type Erapor} from '../erapor';
import {DashboardParser} from '@/parsers';
import {type User} from '@/interfaces/users';
import {getUsersParser} from '@/parsers/users';
import {getRandomString, hexSha512} from '@/util';

/**
 * DashboardErapor is focused to admin purposes
 */

/**
 * @class DashboardErapor
 */
export class DashboardErapor {
	/**
     * @constructor
     * @param erapor Erapor Instance
     */
	constructor(private readonly erapor: Erapor) {}

	async fetchInfo(): Promise<{school: SchoolInfo;app: AppInfo}> {
		const response = await this.erapor.$http.get<string>('/raporsma/index.php?page=');
		return {
			school: DashboardParser.getSchoolInfoParser(response.data),
			app: DashboardParser.getAppInfoParser(response.data),
		};
	}

	async getUsers(): Promise<User[]> {
		const response = await this.erapor.$http.get<string>('/raporsma/index.php?page=Data-User');
		return getUsersParser(response.data);
	}

	async getAdminList(): Promise<User[]> {
		const response = await this.erapor.$http.get<string>('/raporsma/index.php?page=Data-User-Admin');
		return getUsersParser(response.data, true);
	}

	async createAdmin(username: string, password: string, name = getRandomString()): Promise<boolean> {
		const hashedPassword = await hexSha512(password);
		const payload = new URLSearchParams({
			txtNama: name,
			txtUser: username,
			txtPassword: '',
			p: hashedPassword,
		});

		const response = await this.erapor.$http.post<string>('/raporsma/index.php?page=Tambah-User-Admin-Simpan', payload);
		return /alert\('Data Administrator berhasil ditambah'\)/gi.test(response.data);
	}
}
