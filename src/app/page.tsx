import TransactionForm from "@/components/TransactionForm";
import ExpensesChart from "@/components/ExpensesChart";
import TransactionList from "@/components/TransactionList";
import BudgetForm from "@/components/BudgetForm";
import BudgetComparison from "@/components/BudgetComparison";

export default function Home() {
  return (
    <main className="p-6 space-y-10">
      {/* Add New Transaction */}
      <TransactionForm />
      
      {/* Monthly Expenses Bar Chart */}
      <ExpensesChart />
      
      {/* List of Transactions */}
      <TransactionList />
      
      {/* Budget Setting Form */}
      <BudgetForm />
      
      {/* Budget vs Actual Comparison */}
      <BudgetComparison />
    </main>
  );
}
