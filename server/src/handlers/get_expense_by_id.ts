
import { type GetExpenseByIdInput, type Expense } from '../schema';

export declare function getExpenseById(input: GetExpenseByIdInput): Promise<Expense | null>;
