import {type SystemRoles, type UserRoles} from '@/interfaces/roles';
import {hexSha512} from '@/util';
import {EraporBase} from '@lib/eraporBase';
import {type AxiosError} from 'axios';
import {DashboardErapor} from './dashboard';

export class Erapor extends EraporBase {
	// eslint-disable-next-line max-params
	async login(
		username: string,
		password: string,
		role: UserRoles,
		systemRole: SystemRoles,
		semester: number,
	): Promise<this> {
		if (this.cookie) {
			throw new Error('Previous cookie is available, remove them first');
		}

		const passwordHash = await hexSha512(password);
		const response = await this.$http.post('/library/process_login.php', new URLSearchParams({
			username,
			password: '',
			beban: systemRole,
			level: role,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			semester_id: semester.toString(),
			p: passwordHash,
		}), {
			maxRedirects: 0,
		}).catch((e: AxiosError) => {
			if (e.response?.status === 302) {
				return e.response;
			}

			return undefined;
		});

		if (!response || response.headers.location === '../index.php?error=1') {
			throw new Error('Failed to login');
		}

		const cookie = Array.isArray(response.headers['set-cookie'])
			? response.headers['set-cookie'].at(1) : response.headers['set-cookie'];

		if (cookie) {
			this.setCookie(cookie);
		}

		return this;
	}

	get dashboard() {
		return new DashboardErapor(this);
	}
}
