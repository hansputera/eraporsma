import axios from 'axios';

export class EraporBase {
	/**
     * Erapor Web Service HTTP Client
     * Powered by Axios
     */
	public $http!: axios.AxiosInstance;
	#cookie?: string;

	/**
     * @constructor
     * @param baseUrl Erapor Web Service URL (e.g http://192.168.1.2:5739)
     * @param cookie Erapor saved cookie
     */
	constructor(private readonly baseUrl: string, cookie?: string) {
		this.#cookie = cookie;
		this.#initHttp();
	}

	/**
     * Set new cookie for erapor web
     * @param cookie Erapor Web Cookie-string
     * @return {Erapor}
     */
	public setCookie(cookie: string): this {
		this.#cookie = cookie;
		this.#initHttp();
		return this;
	}

	get cookie(): string | undefined {
		return this.#cookie;
	}

	#initHttp(): this {
		this.$http = axios.create({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			baseURL: this.baseUrl,
			headers: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				Cookie: this.#cookie,
				// eslint-disable-next-line @typescript-eslint/naming-convention
				Origin: this.baseUrl,
				// eslint-disable-next-line @typescript-eslint/naming-convention
				Referer: this.baseUrl + '/',
			},
		});
		return this;
	}
}
