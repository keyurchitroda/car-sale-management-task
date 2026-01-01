interface Breakdown {
  brand: string;
  class: string;
  price: string;
  unitsSold: number;
  commission: number;
}

interface Report {
  salesman: string;
  previousYearSales: string;
  totalCommission: number;
  breakdown: Breakdown[];
}
export type { Breakdown, Report };
