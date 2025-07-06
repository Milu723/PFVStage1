import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import ExpensesChart from "@/components/ExpensesChart";
import CategoryPieChart from "@/components/CategoryPieChart";

export default function Home() {
  return (
    <main className="p-6">
      <TransactionForm />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExpensesChart />
        <CategoryPieChart />
      </div>
      <TransactionList />
    </main>
  );
}
