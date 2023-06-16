# Erapor-SMA Scraper

Library sederhana untuk scraping eraporSMA dengan NodeJS. Kenapa harus discraping? Untuk API nya sendiri, mungkin belum diketahui. Dan, oleh sebab itu dilakukannya web scraping untuk mendapatkan data yang tersedia.

## Instalasi
> npm i eraporsma

## Penggunaan
```ts
import { Erapor, UserRoles, SystemRoles } from 'eraporsma';

const erapor = new Erapor('http://localhost:5739'); // 'http://localhost:5739' dapat disesuaikan dengan web service erapor

(async() => {
    // Untuk pertama kali, anda harus login terlebih dahulu
    await erapor.login(
        'username',
        'password',
        UserRoles.Admin, // Tersedia: UserRoles.Guru, UserRoles.WaliKelas, UserRoles.GuruBK, UserRoles.Siswa
        SystemRoles.SKS, // Tersedia: SystemRoles.Paket
    );

    // mendapatkan daftar user
    const users = await erapor.dashboard.getUsers();
    // mendapatkan detil sekolah, dan software
    const { app, school } = await erapor.dashboard.fetchInfo();
})();
```

## License
MIT