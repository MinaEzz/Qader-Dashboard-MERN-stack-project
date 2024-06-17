import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  Tooltip,
  YAxis,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";
import { TRANSACTION_DATA } from "../../data/data";

const TransactionChart = () => {
  return (
    <div className="flex flex-col flex-1 p-4 bg-white rounded-sm border border-neutral-200">
      <strong className="text-lg font-medium text-neutral-500 capitalize">
        transactions
      </strong>
      <ResponsiveContainer
        className="capitalize text-xs"
        width="100%"
        height="100%"
      >
        <BarChart
          width={500}
          height={500}
          data={TRANSACTION_DATA}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Income" fill="#0d6efd" />
          <Bar dataKey="Expense" fill="#de0a26" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart;
