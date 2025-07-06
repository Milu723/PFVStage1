import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import ExpensesChart from "@/components/ExpensesChart";

export default function Home() {
  return (
    <main className="p-6">
      <TransactionForm />
      <ExpensesChart />
      <TransactionList />
    </main>
  );
}
