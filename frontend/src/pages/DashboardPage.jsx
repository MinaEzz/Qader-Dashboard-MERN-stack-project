import { useEffect } from "react";
import { STATES } from "../constants";
import { BuyerProfileChart, StateCard, TransactionChart } from "../components";
const DashboardPage = () => {
  useEffect(() => {
    document.title = "Dashboard";
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="w-full flex flex-1 flex-col gap-4">
      <section className="w-full flex gap-4">
        {STATES.map((state) => {
          return <StateCard key={state.title} {...state} />;
        })}
      </section>
      {/* ./ states */}
      <section className="w-full min-h-[22rem] flex gap-4">
        <TransactionChart />
        <BuyerProfileChart />
      </section>
      {/* ./ transactions and buyer profile */}
    </section>
  );
};

export default DashboardPage;
