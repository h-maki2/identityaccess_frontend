export class UserPassword
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

    public equals(password: UserPassword): boolean
    {
        return this.value === password.getValue();
    }
}