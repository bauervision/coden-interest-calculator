export type ContributionFrequency = "monthly" | "annually";
export type CompoundingFrequency = 1 | 4 | 12;

export type InvestmentInputs = {
  startingBalance: number;
  contribution: number;
  contributionFrequency: ContributionFrequency;
  annualRate: number;
  years: number;
  compoundingFrequency: CompoundingFrequency;
};

export type GrowthPoint = {
  year: number;
  balance: number;
  contributed: number;
  interest: number;
};

export type InvestmentResult = {
  finalBalance: number;
  totalContributed: number;
  totalInterest: number;
  growth: GrowthPoint[];
};
