import {type SchoolInfo, type AppInfo} from '@/interfaces/dashboard';
import {type UserRole} from '@/interfaces/users';
import {DashboardParser, UsersParser} from '@/parsers';
import {type Erapor} from '../erapor';
import {AdminDashboardErapor} from './admin';

/**
 * @class DashboardErapor
 */
export class DashboardErapor {
	/**
     * @constructor
     * @param erapor Erapor Instance
     */
	constructor(private readonly erapor: Erapor) {}

	get admin(): AdminDashboardErapor {
		return new AdminDashboardErapor(this.erapor);
	}

	async fetchInfo(): Promise<{school: SchoolInfo;app: AppInfo;profile: {name: string;role: UserRole}}> {
		const response = await this.erapor.$http.get<string>('/raporsma/index.php?page=');
		return {
			school: DashboardParser.getSchoolInfoParser(response.data),
			app: DashboardParser.getAppInfoParser(response.data),
			profile: UsersParser.getProfileParser(response.data),
		};
	}
}
