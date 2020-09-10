export class CreateAccountDto {
  readonly id?: string;
  readonly fName: string;
  readonly lName: string;
  readonly email: string;
  readonly phone: number;
  readonly code: string;
}
