export const cleanColumnName = (name: string): string => name.split('/').at(0)!.trim().replace(/(\s+|-)/g, '_').toLowerCase();
export const cleanColumnValue = (input: string): string | number => {
	if (isNaN(parseInt(input, 10))) {
		return input;
	}

	return parseInt(input, 10);
};
