import {type SchoolInfo} from '@/interfaces/dashboard';
import {type Erapor} from '../erapor';
import {getSchoolInfoParser} from '@/parsers';

export class DashboardErapor {
	/**
     * @constructor
     * @param erapor Erapor Instance
     */
	constructor(private readonly erapor: Erapor) {}

	async getSchoolInfo(): Promise<SchoolInfo> {
		const response = await this.erapor.$http.get<string>('/raporsma/index.php?page=');
		return getSchoolInfoParser(response.data);
	}
}
