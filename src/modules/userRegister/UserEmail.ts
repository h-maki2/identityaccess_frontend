export class UserEmail
{
    readonly value: string;

    constructor(value: string)
    {
        this.value = value;
    }

    public isValid(): boolean
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.value);
    }
}