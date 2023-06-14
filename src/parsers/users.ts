import {type UserRole, type User} from '@/interfaces/users';
import {toDom} from '@/util';

export const getUsersParser = (script: string): User[] => {
	const $ = toDom(script);

	const users = new Array<User>();
	$('#datatabel1 thead').next().find('tr').each((_, element) => {
		const $u = $(element).find('td');

		users.push({
			nama: $u.eq(1).text().trim(),
			user: $u.eq(2).text().trim(),
			level: $u.eq(3).text().trim() as UserRole,
			status: $u.eq(-1).text().trim().toLowerCase(),
		});
	});

	return users;
};
