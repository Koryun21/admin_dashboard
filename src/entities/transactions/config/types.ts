export type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
  user_id: string;
  created_at: string;
};

export enum TransactionType {
  WRITE_OFF = 'WRITE_OFF',
  REPLENISH = 'REPLENISH',
}
