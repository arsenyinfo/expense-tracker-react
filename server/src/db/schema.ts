
import { serial, text, pgTable, timestamp, numeric, pgEnum } from 'drizzle-orm/pg-core';

// Define expense categories enum
export const expenseCategoryEnum = pgEnum('expense_category', [
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

export const expensesTable = pgTable('expenses', {
  id: serial('id').primaryKey(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  date: timestamp('date').notNull(),
  category: expenseCategoryEnum('category').notNull(),
  description: text('description'),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// TypeScript types for the table schema
export type Expense = typeof expensesTable.$inferSelect;
export type NewExpense = typeof expensesTable.$inferInsert;

// Export all tables for proper query building
export const tables = { expenses: expensesTable };
