export interface Goal {
  id: string;
  name: string;
  targetMinor: number;
  deadline?: string;
  linkedAccountId?: string;
  isArchived: boolean;
}

export interface GoalContribution {
  id: string;
  goalId: string;
  amountMinor: number;
  date: string;
  note?: string;
  transferTransactionId?: string;
}
