import type {
  InvestmentInputs,
  InvestmentResult,
} from "../types/investment";

function requireFiniteNonNegative(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${label} must be a finite, non-negative number.`);
  }
}

export function calculateGrowth(inputs: InvestmentInputs): InvestmentResult {
  requireFiniteNonNegative(inputs.startingBalance, "Starting balance");
  requireFiniteNonNegative(inputs.contribution, "Contribution");
  requireFiniteNonNegative(inputs.annualRate, "Annual rate");

  if (!Number.isInteger(inputs.years) || inputs.years < 1 || inputs.years > 100) {
    throw new Error("Years must be a whole number between 1 and 100.");
  }

  const annualRateDecimal = inputs.annualRate / 100;
  const compoundingPeriods = inputs.compoundingFrequency;

  // Convert the selected nominal compounding schedule to an equivalent
  // monthly rate so monthly and annual contributions can share one timeline.
  const monthlyRate =
    Math.pow(1 + annualRateDecimal / compoundingPeriods, compoundingPeriods / 12) - 1;

  let balance = inputs.startingBalance;
  let totalContributed = inputs.startingBalance;

  const growth = [
    {
      year: 0,
      balance,
      contributed: totalContributed,
      interest: 0,
    },
  ];

  for (let month = 1; month <= inputs.years * 12; month += 1) {
    balance *= 1 + monthlyRate;

    const isYearEnd = month % 12 === 0;
    const contributionDue =
      inputs.contributionFrequency === "monthly" || isYearEnd;

    if (contributionDue) {
      balance += inputs.contribution;
      totalContributed += inputs.contribution;
    }

    if (isYearEnd) {
      growth.push({
        year: month / 12,
        balance,
        contributed: totalContributed,
        interest: balance - totalContributed,
      });
    }
  }

  return {
    finalBalance: balance,
    totalContributed,
    totalInterest: balance - totalContributed,
    growth,
  };
}
