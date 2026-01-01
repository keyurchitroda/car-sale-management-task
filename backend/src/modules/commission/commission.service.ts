import { AppError } from "../../core/app.error";
import {
  getSalesmen,
  getSalesDataBySalesman,
  getSalesmanById,
} from "./commission.repository";
import { COMMISSION_RULES } from "./commission.rules";
import { SaleRow } from "./commission.types";

export const generateCommissionReport = async () => {
  const salesmen = await getSalesmen();
  const report = [];

  for (const salesman of salesmen) {
    const sales: SaleRow[] = await getSalesDataBySalesman(salesman.id);

    let totalCommission = 0;
    const breakdown = [];

    const hasExtraBonus = salesman.previous_year_sales > 500000;

    for (const sale of sales) {
      const rule = COMMISSION_RULES[sale.brand];

      let percentage = rule.percentage[sale.class];

      if (hasExtraBonus && sale.class === "A") {
        percentage += 2;
      }

      let commission = 0;

      if (sale.price > rule.fixed.minPrice) {
        commission += rule.fixed.amount * sale.quantity;
      }

      commission += ((sale.price * percentage) / 100) * sale.quantity;

      totalCommission += commission;

      breakdown.push({
        brand: sale.brand,
        class: sale.class,
        price: sale.price,
        unitsSold: sale.quantity,
        commission,
      });
    }

    report.push({
      salesman: salesman.name,
      previousYearSales: salesman.previous_year_sales,
      totalCommission,
      breakdown,
    });
  }

  return report;
};

export const generateSingleSalesmanReport = async (salesmanId: number) => {
  const salesman = await getSalesmanById(salesmanId);

  if (!salesman) {
    throw new AppError("Salesman not found", 404);
  }

  const sales: SaleRow[] = await getSalesDataBySalesman(salesmanId);

  let totalCommission = 0;
  const breakdown = [];

  const hasExtraBonus = salesman.previous_year_sales > 500000;

  for (const sale of sales) {
    const rule = COMMISSION_RULES[sale.brand];

    let percentage = rule.percentage[sale.class];

    if (hasExtraBonus && sale.class === "A") {
      percentage += 2;
    }

    let commission = 0;

    if (sale.price > rule.fixed.minPrice) {
      commission += rule.fixed.amount * sale.quantity;
    }

    commission += ((sale.price * percentage) / 100) * sale.quantity;

    totalCommission += commission;

    breakdown.push({
      brand: sale.brand,
      class: sale.class,
      price: sale.price,
      unitsSold: sale.quantity,
      commission,
    });
  }

  return {
    salesman: salesman.name,
    previousYearSales: salesman.previous_year_sales,
    totalCommission,
    breakdown,
  };
};
