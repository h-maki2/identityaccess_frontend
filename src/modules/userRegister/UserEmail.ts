export class UserEmail
{
    private value: string;

    constructor(value: string)
    {
        this.value = value;
    }

    public getValue(): string
    {
        return this.value;
    }

    public isValid(): boolean
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.value);
    }
}