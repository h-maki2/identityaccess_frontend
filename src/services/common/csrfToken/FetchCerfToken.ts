/**
 * CSRFトークンを取得してCookieに保存する
 */
export class FetchCerfToken
{
    readonly REQUEST_URL = 'http://api.identityaccess.local/sanctum/csrf-cookie';

    public async handle(): Promise<void>
    {
        await fetch(this.REQUEST_URL, {
            credentials: 'include',
        });
    }
}