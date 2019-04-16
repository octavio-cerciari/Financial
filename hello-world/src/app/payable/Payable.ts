import {Placements} from '../config/models/Placements';
import {PaymentForm} from '../config/models/PaymentForm';

export interface Payable {
  name: string;
  amount: number;
  date: string;
  paymentForm?: PaymentForm;
  paymentFormId: string;
  type: string;
  progress: string;
  placement?: Placements;
  placementId: string;
  installment: string;
}
