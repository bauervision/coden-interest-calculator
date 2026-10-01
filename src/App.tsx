import { useMemo, useState } from "react";
import { GrowthChart } from "./components/GrowthChart";
import { NumberField } from "./components/NumberField";
import { ResultsSummary } from "./components/ResultsSummary";
import { YearlyBreakdown } from "./components/YearlyBreakdown";
import { calculateGrowth } from "./lib/calculateGrowth";
import type {
  CompoundingFrequency,
  ContributionFrequency,
  InvestmentInputs,
} from "./types/investment";

const DEFAULT_INPUTS: InvestmentInputs = {
  startingBalance: 1000,
  contribution: 0,
  contributionFrequency: "monthly",
  annualRate: 7,
  years: 20,
  compoundingFrequency: 12,
};

function App() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);

  const result = useMemo(() => calculateGrowth(inputs), [inputs]);

  function updateInput<K extends keyof InvestmentInputs>(
    key: K,
    value: InvestmentInputs[K],
  ) {
    setInputs((current) => ({ ...current, [key]: value }));
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <div className="brand-mark" aria-hidden="true">$</div>
        <div>
          <p className="eyebrow">Investment planning</p>
          <h1>See what your money could become.</h1>
          <p className="hero-copy">
            Explore how time, contributions, and compound interest may grow an
            IRA or other long-term account.
          </p>
        </div>
      </header>

      <div className="workspace">
        <aside className="panel calculator-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Your assumptions</p>
              <h2>Calculate growth</h2>
            </div>
            <button
              className="text-button"
              type="button"
              onClick={() => setInputs(DEFAULT_INPUTS)}
            >
              Reset
            </button>
          </div>

          <div className="form-grid">
            <NumberField
              id="starting-balance"
              label="Starting balance"
              value={inputs.startingBalance}
              min={0}
              step={100}
              prefix="$"
              onChange={(value) =>
                updateInput("startingBalance", Math.max(0, value || 0))
              }
            />

            <NumberField
              id="contribution"
              label="Recurring contribution"
              value={inputs.contribution}
              min={0}
              step={25}
              prefix="$"
              onChange={(value) =>
                updateInput("contribution", Math.max(0, value || 0))
              }
            />

            <label className="field" htmlFor="contribution-frequency">
              <span className="field-label">Contribution frequency</span>
              <span className="input-shell">
                <select
                  id="contribution-frequency"
                  value={inputs.contributionFrequency}
                  onChange={(event) =>
                    updateInput(
                      "contributionFrequency",
                      event.target.value as ContributionFrequency,
                    )
                  }
                >
                  <option value="monthly">Monthly</option>
                  <option value="annually">Annually</option>
                </select>
              </span>
            </label>

            <NumberField
              id="annual-rate"
              label="Expected annual return"
              value={inputs.annualRate}
              min={0}
              max={100}
              step={0.1}
              suffix="%"
              onChange={(value) =>
                updateInput(
                  "annualRate",
                  Math.min(100, Math.max(0, value || 0)),
                )
              }
            />

            <NumberField
              id="years"
              label="Years invested"
              value={inputs.years}
              min={1}
              max={100}
              onChange={(value) =>
                updateInput(
                  "years",
                  Math.min(100, Math.max(1, Math.round(value || 1))),
                )
              }
            />

            <label className="field" htmlFor="compounding-frequency">
              <span className="field-label">Interest compounded</span>
              <span className="input-shell">
                <select
                  id="compounding-frequency"
                  value={inputs.compoundingFrequency}
                  onChange={(event) =>
                    updateInput(
                      "compoundingFrequency",
                      Number(event.target.value) as CompoundingFrequency,
                    )
                  }
                >
                  <option value={12}>Monthly</option>
                  <option value={4}>Quarterly</option>
                  <option value={1}>Annually</option>
                </select>
              </span>
            </label>
          </div>

          <div className="formula-note">
            Contributions are added at the end of each selected contribution
            period. Projections do not include taxes, inflation, fees, or
            account contribution limits.
          </div>
        </aside>

        <div className="results-column">
          <ResultsSummary result={result} years={inputs.years} />
          <GrowthChart data={result.growth} />
        </div>
      </div>

      <YearlyBreakdown data={result.growth} />

      <footer>
        For educational planning only. This projection is not financial advice
        or a guarantee of future returns.
      </footer>
    </main>
  );
}

export default App;
