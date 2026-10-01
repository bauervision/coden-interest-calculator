import { describe, expect, it } from "vitest";
import { calculateGrowth } from "./calculateGrowth";

describe("calculateGrowth", () => {
  it("calculates $1,000 at 7% for 20 years with annual compounding", () => {
    const result = calculateGrowth({
      startingBalance: 1000,
      contribution: 0,
      contributionFrequency: "monthly",
      annualRate: 7,
      years: 20,
      compoundingFrequency: 1,
    });

    expect(result.finalBalance).toBeCloseTo(3869.68, 2);
    expect(result.totalContributed).toBe(1000);
    expect(result.totalInterest).toBeCloseTo(2869.68, 2);
    expect(result.growth).toHaveLength(21);
  });

  it("adds monthly contributions at the end of each month", () => {
    const result = calculateGrowth({
      startingBalance: 0,
      contribution: 100,
      contributionFrequency: "monthly",
      annualRate: 0,
      years: 2,
      compoundingFrequency: 12,
    });

    expect(result.finalBalance).toBe(2400);
    expect(result.totalContributed).toBe(2400);
    expect(result.totalInterest).toBe(0);
  });

  it("adds annual contributions once per year", () => {
    const result = calculateGrowth({
      startingBalance: 1000,
      contribution: 500,
      contributionFrequency: "annually",
      annualRate: 0,
      years: 3,
      compoundingFrequency: 12,
    });

    expect(result.finalBalance).toBe(2500);
    expect(result.totalContributed).toBe(2500);
  });

  it("rejects an invalid year range", () => {
    expect(() =>
      calculateGrowth({
        startingBalance: 1000,
        contribution: 0,
        contributionFrequency: "monthly",
        annualRate: 7,
        years: 0,
        compoundingFrequency: 12,
      }),
    ).toThrow("Years must be a whole number between 1 and 100.");
  });
});
