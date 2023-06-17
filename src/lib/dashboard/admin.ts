import {type Erapor} from '../erapor';
import {UsersParser} from '@/parsers';
import {type UserOption, type User} from '@/interfaces/users';
import {type UserRoles} from '@/interfaces/roles';
import {getRandomString, hexSha512} from '@/util';

/**
 * AdminDashboardErapor is focused to admin purposes
 */

/**
 * @class AdminDashboardErapor
 */
export class AdminDashboardErapor {
	/**
     * @constructor
     * @param erapor Erapor Instance
     */
	constructor(private readonly erapor: Erapor) {}

	async fetchUsers(): Promise<User[]> {
		const response = await this.erapor.$http.get<string>('/raporsma/index.php?page=Data-User');
		return UsersParser.getUsersParser(response.data);
	}

	async fetchAdminList(): Promise<User[]> {
		const response = await this.erapor.$http.get<string>('/raporsma/index.php?page=Data-User-Admin');
		return UsersParser.getUsersParser(response.data, true);
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

	async deleteAdmin(username: string): Promise<void> {
		await this.erapor.$http.get<string>(`/raporsma/index.php?page=Admin-User-Delete&Kode=${encodeURIComponent(username)}`);
	}

	async editUser(username: string, newPassword: string): Promise<boolean> {
		const currentResponse = await this.erapor.$http.get<string>(`/raporsma/index.php?page=Edit-User&Kode=${encodeURIComponent(username)}`);
		let user = UsersParser.getEditUserFieldParser(currentResponse.data);

		if (!user) {
			return false;
		}

		const payload = new URLSearchParams({
			txtNama: user.nama,
			txtUser: user.user,
			txtUserLm: user.user,
			txtPassBaru: '',
			txtPassLama: user.oldPassword,
			p: await hexSha512(newPassword),
			cmbLevel: user.level,
		});
		const {oldPassword} = user;

		// Edit process
		const editResponse = await this.erapor.$http.post<string>('/raporsma/index.php?page=Edit-User&Act=Save', payload);
		user = UsersParser.getEditUserFieldParser(editResponse.data);

		if (!user) {
			return false;
		}

		return user.oldPassword !== oldPassword;
	}

	async fetchUsersByQuery(query: Omit<UserRoles, 'Admin'>): Promise<UserOption[]> {
		const response = await this.erapor.$http.get<string>(`/raporsma/modul/cari_data/cari_user_add_kelas.php?quser=${encodeURIComponent(query.toString())}`);
		return UsersParser.getUserListByQueryParser(response.data);
	}
}
