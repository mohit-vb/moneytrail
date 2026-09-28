import { z } from "zod";

const baseTransactionSchema = z.object({
  id: z.string(),
  amountMinor: z.number(),
  description: z.string(),
  date: z.string(),
  merchant: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  paymentMethod: z
    .enum(["upi", "card", "cash", "netbanking", "bank_transfer"])
    .optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const ExpenseTransactionSchema = baseTransactionSchema.extend({
  type: z.literal("expense"),
  accountId: z.string(),
  categoryId: z.string(),
});

const IncomeTransactionSchema = baseTransactionSchema.extend({
  type: z.literal("income"),
  accountId: z.string(),
  categoryId: z.string(),
  isRefund: z.boolean().optional(),
});

const TransferTransactionSchema = baseTransactionSchema.extend({
  type: z.literal("transfer"),
  accountId: z.string(),
  toAccountId: z.string(),
});

const TransactionSchema = z.discriminatedUnion("type", [
  ExpenseTransactionSchema,
  IncomeTransactionSchema,
  TransferTransactionSchema,
]);

export default TransactionSchema;
