import {type AppInfo, type SchoolInfo} from '@/interfaces/dashboard';
import {type Erapor} from '../erapor';
import {getAppInfoParser, getSchoolInfoParser} from '@/parsers';

export class DashboardErapor {
	/**
     * @constructor
     * @param erapor Erapor Instance
     */
	constructor(private readonly erapor: Erapor) {}

	async getSchoolInfo(): Promise<{school: SchoolInfo;app: AppInfo}> {
		const response = await this.erapor.$http.get<string>('/raporsma/index.php?page=');
		return {
			school: getSchoolInfoParser(response.data),
			app: getAppInfoParser(response.data),
		};
	}
}
