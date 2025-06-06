
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

import { 
  createExpenseInputSchema, 
  updateExpenseInputSchema,
  getExpenseByIdSchema,
  deleteExpenseSchema
} from './schema';
import { createExpense } from './handlers/create_expense';
import { getExpenses } from './handlers/get_expenses';
import { getExpenseById } from './handlers/get_expense_by_id';
import { updateExpense } from './handlers/update_expense';
import { deleteExpense } from './handlers/delete_expense';
import { getExpenseSummary } from './handlers/get_expense_summary';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),
  
  // Expense CRUD operations
  createExpense: publicProcedure
    .input(createExpenseInputSchema)
    .mutation(({ input }) => createExpense(input)),
    
  getExpenses: publicProcedure
    .query(() => getExpenses()),
    
  getExpenseById: publicProcedure
    .input(getExpenseByIdSchema)
    .query(({ input }) => getExpenseById(input)),
    
  updateExpense: publicProcedure
    .input(updateExpenseInputSchema)
    .mutation(({ input }) => updateExpense(input)),
    
  deleteExpense: publicProcedure
    .input(deleteExpenseSchema)
    .mutation(({ input }) => deleteExpense(input)),
    
  getExpenseSummary: publicProcedure
    .query(() => getExpenseSummary()),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();
