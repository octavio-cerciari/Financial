import {BankCards} from './BankCards';

export interface PaymentForm {
  id?: string;
  name: string;
  bankCard: BankCards;
}
