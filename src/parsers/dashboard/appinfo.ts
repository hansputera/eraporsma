/* eslint-disable @typescript-eslint/naming-convention */
import {type AppInfo} from '@/interfaces/dashboard';
import {cleanColumnName, cleanColumnValue, toDom} from '@/util';

export const getAppInfoParser = (script: string): AppInfo => {
	const $ = toDom(script);
	const res: AppInfo = {
		nama_aplikasi: '',
		versi_aplikasi: '',
		versi_database: '',
		kurikulum: '',
		pedoman_penilaian: '',
		website: '',
	};

	$('.col-lg-5 .box-body table tbody tr').each((_, element) => {
		const $s = $(element).find('td');
		const name = cleanColumnName($s.eq(0).text().trim()) as keyof AppInfo;
		if (/diskusi/gi.test(name)) {
			return;
		}

		res[name] = cleanColumnValue($s.eq(2).text().trim()) as never;
		if (name === 'versi_aplikasi') {
			res[name] = res[name].replace(/daftar perubahan/gi, '').trim();
		}
	});

	return res;
};
