export type UserRole = 'Guru' | 'Wali Kelas' | 'BP' | 'Siswa';

export type User = {
	nama: string;
	user: string;
	level: UserRole;
	status: string;
};
