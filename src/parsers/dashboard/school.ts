import {type SchoolInfo} from '@/interfaces/dashboard';
import {cleanColumnName, cleanColumnValue, toDom} from '@/util';

export const getSchoolInfoParser = (script: string): SchoolInfo => {
	const $ = toDom(script);
	const res: SchoolInfo = {
		npsn: 0,
		alamat: '',
		// eslint-disable-next-line @typescript-eslint/naming-convention
		kode_pos: 0,
		telepon: '',
		kelurahan: '',
		kecamatan: '',
		kabupaten: '',
		propinsi: '',
		website: '',
		// eslint-disable-next-line @typescript-eslint/naming-convention
		e_mail: '',
		// eslint-disable-next-line @typescript-eslint/naming-convention
		kepala_sekolah: '',
		// eslint-disable-next-line @typescript-eslint/naming-convention
		nip_kepala_sekolah: 0,
	};

	$('.col-lg-7 .box-body .col-md-7 table tbody tr').each((_, element) => {
		const $s = $(element).find('td');

		res[cleanColumnName($s.eq(0).text().trim()) as keyof SchoolInfo] = cleanColumnValue($s.eq(2).text().trim()) as never;
	});

	return res;
};
