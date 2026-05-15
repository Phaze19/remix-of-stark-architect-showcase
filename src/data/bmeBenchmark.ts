// Bombay Metal Exchange (BME) – Copper Billet benchmark.
// BME publishes circulars to members (no public API); update these values
// when a new circular is released. Source: https://bme.in/
export interface BmeBenchmark {
  metal: string;
  grade: string;
  pricePerKg: number; // INR / kg
  prevPricePerKg: number; // for trend display
  asOf: string; // ISO date or human date
  circular: string; // circular reference / note
  sourceUrl: string;
}

export const BME_COPPER: BmeBenchmark = {
  metal: "Copper Billet",
  grade: "BME Benchmark Grade",
  pricePerKg: 928,
  prevPricePerKg: 921,
  asOf: "16 Apr 2026",
  circular: "BME Benchmark Circular – Copper & Zinc",
  sourceUrl: "https://bme.in/",
};
