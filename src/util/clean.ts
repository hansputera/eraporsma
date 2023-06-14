export const cleanColumnName = (name: string): string => name.split('/').at(0)!.trim().replace(/(\s+|-)/g, '_').toLowerCase();
export const cleanColumnValue = (input: string): string | number => {
	if (isNaN(parseFloat(input))) {
		return input;
	}

	return parseFloat(input);
};
