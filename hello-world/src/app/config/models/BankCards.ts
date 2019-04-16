import {BankAccount} from './BankAccount';

export interface BankCards {
  id?: string;
  name: string;
  flag: string;
  day: number;
  bankAccount: BankAccount;
  installment: boolean;
  payday: boolean;
}
