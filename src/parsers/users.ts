import {type UserRole, type User, type UserOption} from '@/interfaces/users';
import {toDom} from '@/util';

export const getUsersParser = (script: string, isAdmin = false): User[] => {
	const $ = toDom(script);

	// eslint-disable-next-line no-negated-condition
	return $(!isAdmin ? '#datatabel1 thead' : 'table thead').next().find('tr').map((_, element) => {
		const $u = $(element).find('td');

		return {
			nama: $u.eq(1).text().trim(),
			user: $u.eq(2).text().trim(),
			level: $u.eq(3).text().trim() as UserRole,
			status: $u.eq(-1).text().trim().toLowerCase(),
		};
	}).toArray<User>();
};

export const getEditUserFieldParser = (script: string): User & {
	oldPassword: string;
} | undefined => {
	const $ = toDom(script);

	const user: User = {
		nama: $('[name="txtNama"]').val()?.toString().trim() ?? '',
		level: $('[name="cmbLevel"] option').attr('value') as UserRole ?? 'Siswa',
		user: $('[name="txtUser"]').val()?.toString().trim() ?? '',
		status: 'online',
	};

	const oldPasswordHash = $('[name="txtPassLama"]').val()?.toString() ?? '';

	if (!oldPasswordHash.length || !user.nama.length) {
		return undefined;
	}

	return Object.assign(user, {
		oldPassword: oldPasswordHash,
	});
};

export const getUserListByQueryParser = (script: string): UserOption[] => {
	const $ = toDom(script);

	return $('select option').next().map((_, el) => ({
		id: $(el).val()?.toString() ?? '',
		value: $(el).text().trim(),
	})).toArray<UserOption>();
};
