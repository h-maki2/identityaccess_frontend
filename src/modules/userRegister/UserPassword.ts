export class UserPassword
{
    readonly value: string;

    constructor(value: string)
    {
        this.value = value;
    }

    public equals(password: UserPassword): boolean
    {
        return this.value === password.value;
    }
}