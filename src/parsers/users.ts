import {type UserRole, type User} from '@/interfaces/users';
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
