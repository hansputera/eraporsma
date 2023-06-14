import {type AppInfo, type SchoolInfo} from '@/interfaces/dashboard';
import {type Erapor} from '../erapor';
import {DashboardParser} from '@/parsers';

export class DashboardErapor {
	/**
     * @constructor
     * @param erapor Erapor Instance
     */
	constructor(private readonly erapor: Erapor) {}

	async getSchoolInfo(): Promise<{school: SchoolInfo;app: AppInfo}> {
		const response = await this.erapor.$http.get<string>('/raporsma/index.php?page=');
		return {
			school: DashboardParser.getSchoolInfoParser(response.data),
			app: DashboardParser.getAppInfoParser(response.data),
		};
	}
}
