import { preciseCurrencyFormatter } from "../lib/formatters";
import type { InvestmentResult } from "../types/investment";

type ResultsSummaryProps = {
  result: InvestmentResult;
  years: number;
};

export function ResultsSummary({ result, years }: ResultsSummaryProps) {
  return (
    <section className="results-card" aria-labelledby="results-heading">
      <div>
        <p className="eyebrow">Projected value</p>
        <h2 id="results-heading">
          {preciseCurrencyFormatter.format(result.finalBalance)}
        </h2>
        <p className="results-caption">after {years} years</p>
      </div>

      <div className="summary-grid">
        <div className="summary-item">
          <span>Total contributed</span>
          <strong>
            {preciseCurrencyFormatter.format(result.totalContributed)}
          </strong>
        </div>
        <div className="summary-item">
          <span>Interest earned</span>
          <strong>
            {preciseCurrencyFormatter.format(result.totalInterest)}
          </strong>
        </div>
      </div>
    </section>
  );
}
