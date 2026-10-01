import { preciseCurrencyFormatter } from "../lib/formatters";
import type { GrowthPoint } from "../types/investment";

type YearlyBreakdownProps = {
  data: GrowthPoint[];
};

export function YearlyBreakdown({ data }: YearlyBreakdownProps) {
  return (
    <section className="panel" aria-labelledby="breakdown-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Year-by-year</p>
          <h2 id="breakdown-heading">Growth breakdown</h2>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Contributed</th>
              <th>Interest</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((point) => (
              <tr key={point.year}>
                <td>{point.year}</td>
                <td>{preciseCurrencyFormatter.format(point.contributed)}</td>
                <td>{preciseCurrencyFormatter.format(point.interest)}</td>
                <td>
                  <strong>
                    {preciseCurrencyFormatter.format(point.balance)}
                  </strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
