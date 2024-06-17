import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { BUYER_PROFILE_DATA } from "../../data/data";

const BuyerProfileChart = () => {
  const RADIAN = Math.PI / 180;
  const COLORS = ["#00c49f", "#ffbb28", "#ff8042"];
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-[19rem] flex flex-col p-4 bg-white rounded-sm border border-neutral-200">
      <strong className="text-lg font-medium text-neutral-500 capitalize">
        buyer profile
      </strong>
      <ResponsiveContainer
        className="capitalize text-xs"
        width="100%"
        height="100%"
      >
        <PieChart width={400} height={400}>
          <Pie
            data={BUYER_PROFILE_DATA}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
          >
            {BUYER_PROFILE_DATA.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BuyerProfileChart;
