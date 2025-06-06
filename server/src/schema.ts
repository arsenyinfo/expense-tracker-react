
import { z } from 'zod';

// Expense categories enum
export const expenseCategoryEnum = z.enum([
  'Coffee',
  'Shopping', 
  'Eating Out',
  'Transportation',
  'Entertainment',
  'Groceries',
  'Utilities',
  'Healthcare',
  'Other'
]);

export type ExpenseCategory = z.infer<typeof expenseCategoryEnum>;

// Expense schema
export const expenseSchema = z.object({
  id: z.number(),
  amount: z.number(),
  date: z.coerce.date(),
  category: expenseCategoryEnum,
  description: z.string().nullable(),
  created_at: z.coerce.date()
});

export type Expense = z.infer<typeof expenseSchema>;

// Input schema for creating expenses
export const createExpenseInputSchema = z.object({
  amount: z.number().positive(),
  date: z.coerce.date(),
  category: expenseCategoryEnum,
  description: z.string().nullable()
});

export type CreateExpenseInput = z.infer<typeof createExpenseInputSchema>;

// Input schema for updating expenses
export const updateExpenseInputSchema = z.object({
  id: z.number(),
  amount: z.number().positive().optional(),
  date: z.coerce.date().optional(),
  category: expenseCategoryEnum.optional(),
  description: z.string().nullable().optional()
});

export type UpdateExpenseInput = z.infer<typeof updateExpenseInputSchema>;

// Schema for getting expense by ID
export const getExpenseByIdSchema = z.object({
  id: z.number()
});

export type GetExpenseByIdInput = z.infer<typeof getExpenseByIdSchema>;

// Schema for deleting expense
export const deleteExpenseSchema = z.object({
  id: z.number()
});

export type DeleteExpenseInput = z.infer<typeof deleteExpenseSchema>;

// Schema for expense summary by category
export const expenseSummarySchema = z.object({
  category: expenseCategoryEnum,
  total_amount: z.number(),
  expense_count: z.number()
});

export type ExpenseSummary = z.infer<typeof expenseSummarySchema>;
