import { formatCurrency } from "../lib/formatters";
import type { GrowthPoint } from "../types/investment";

type GrowthChartProps = {
  data: GrowthPoint[];
};

const WIDTH = 760;
const HEIGHT = 300;
const PADDING_X = 44;
const PADDING_Y = 28;

function pointsFor(
  data: GrowthPoint[],
  key: "balance" | "contributed",
  maxValue: number,
): string {
  const usableWidth = WIDTH - PADDING_X * 2;
  const usableHeight = HEIGHT - PADDING_Y * 2;

  return data
    .map((point, index) => {
      const x =
        PADDING_X +
        (data.length === 1 ? 0 : (index / (data.length - 1)) * usableWidth);
      const y =
        HEIGHT -
        PADDING_Y -
        (maxValue === 0 ? 0 : (point[key] / maxValue) * usableHeight);

      return `${x},${y}`;
    })
    .join(" ");
}

export function GrowthChart({ data }: GrowthChartProps) {
  const maxValue = Math.max(...data.map((point) => point.balance), 1);
  const balancePoints = pointsFor(data, "balance", maxValue);
  const contributionPoints = pointsFor(data, "contributed", maxValue);
  const midpoint = maxValue / 2;

  return (
    <section className="panel chart-panel" aria-labelledby="chart-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Growth over time</p>
          <h2 id="chart-heading">Investment projection</h2>
        </div>
        <div className="legend" aria-label="Chart legend">
          <span><i className="legend-dot balance-dot" />Balance</span>
          <span><i className="legend-dot contribution-dot" />Contributions</span>
        </div>
      </div>

      <div className="chart-wrap">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label="Line chart showing projected balance and contributions"
        >
          {[0, midpoint, maxValue].map((value) => {
            const y =
              HEIGHT -
              PADDING_Y -
              (value / maxValue) * (HEIGHT - PADDING_Y * 2);

            return (
              <g key={value}>
                <line
                  className="grid-line"
                  x1={PADDING_X}
                  x2={WIDTH - PADDING_X}
                  y1={y}
                  y2={y}
                />
                <text className="axis-label" x={4} y={y + 4}>
                  {formatCurrency(value)}
                </text>
              </g>
            );
          })}

          <polyline
            className="chart-line contribution-line"
            points={contributionPoints}
          />
          <polyline className="chart-line balance-line" points={balancePoints} />
        </svg>
      </div>
    </section>
  );
}
