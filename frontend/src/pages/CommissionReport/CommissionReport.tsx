import { useEffect, useState } from "react";
import { getCommisionReport } from "../../services/comissionReportService";
import { exportToCSV } from "../../utils/exportToCSV";
import CommissionRulesModal from "./CommissionRulesModal";

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

const BRANDS = ["Audi", "Jaguar", "Land Rover", "Renault"] as const;
const CLASSES = ["A", "B", "C"] as const;

type Brand = (typeof BRANDS)[number];
type CarClass = (typeof CLASSES)[number];

type GroupedRow = Record<Brand, number> & {
  commission: number;
};

const isBrand = (value: string): value is Brand =>
  BRANDS.includes(value as Brand);

const isCarClass = (value: string): value is CarClass =>
  CLASSES.includes(value as CarClass);

const CommissionReport = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSalesman, setSelectedSalesman] = useState<string>("ALL");
  const [openRules, setOpenRules] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      const res = await getCommisionReport();
      setReports(res.data);
      setLoading(false);
    };

    fetchReport();
  }, []);

  const handleExportCSV = () => {
    const header = [
      "Salesman",
      "Class",
      "Audi",
      "Jaguar",
      "Land Rover",
      "Renault",
      "Total Commission",
    ];

    const rows: (string | number)[][] = [];

    reports.forEach((report) => {
      const grouped: Record<CarClass, GroupedRow> = {
        A: { Audi: 0, Jaguar: 0, "Land Rover": 0, Renault: 0, commission: 0 },
        B: { Audi: 0, Jaguar: 0, "Land Rover": 0, Renault: 0, commission: 0 },
        C: { Audi: 0, Jaguar: 0, "Land Rover": 0, Renault: 0, commission: 0 },
      };

      report.breakdown.forEach((b) => {
        if (!isCarClass(b.class)) return;
        if (!isBrand(b.brand)) return;

        grouped[b.class][b.brand] += b.unitsSold;
        grouped[b.class].commission += b.commission;
      });

      CLASSES.forEach((cls) => {
        const data = grouped[cls];
        rows.push([
          report.salesman,
          cls,
          data.Audi,
          data.Jaguar,
          data["Land Rover"],
          data.Renault,
          data.commission,
        ]);
      });
    });

    exportToCSV("sales-commission-report.csv", [header, ...rows]);
  };

  const salesmanOptions = [
    "ALL",
    ...Array.from(new Set(reports.map((r) => r.salesman))),
  ];

  const filteredReports =
    selectedSalesman === "ALL"
      ? reports
      : reports.filter((r) => r.salesman === selectedSalesman);

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Commission Report</h1>
        <p className="text-sm text-gray-500 mt-1">
          Detailed commission calculation based on sales rules
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end items-center gap-4">
        <button
          onClick={() => setOpenRules(true)}
          className="cursor-pointer rounded-lg border border-indigo-600 px-4 py-2 text-indigo-600 hover:bg-indigo-50"
        >
          View Commission Rules
        </button>
        <div>
          <select
            value={selectedSalesman}
            onChange={(e) => setSelectedSalesman(e.target.value)}
            className="cursor-pointer rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {salesmanOptions.map((name) => (
              <option key={name} value={name}>
                {name === "ALL" ? "All Salesmen" : name}
              </option>
            ))}
          </select>
        </div>

        {selectedSalesman !== "ALL" && (
          <button
            onClick={() => setSelectedSalesman("ALL")}
            className="cursor-pointer text-sm text-indigo-600 hover:underline"
          >
            Clear Filter
          </button>
        )}

        <div>
          <button
            onClick={handleExportCSV}
            className="cursor-pointer rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
          >
            Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading commission report...</p>
      ) : (
        <div className="space-y-6">
          {filteredReports.map((r, index) => (
            <div
              key={index}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{r.salesman}</h3>
                  <p className="text-sm text-gray-500">
                    Previous Year Sales: $
                    {Number(r.previousYearSales).toLocaleString()}
                  </p>
                </div>

                <div className="rounded-lg bg-green-50 px-5 py-3 text-green-700 font-semibold">
                  Total Commission: ${r.totalCommission.toLocaleString()}
                </div>
              </div>

              {r.breakdown.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border p-3 text-left">Brand</th>
                        <th className="border p-3 text-center">Class</th>
                        <th className="border p-3 text-right">Price</th>
                        <th className="border p-3 text-center">Units Sold</th>
                        <th className="border p-3 text-right">Commission</th>
                      </tr>
                    </thead>
                    <tbody>
                      {r.breakdown.map((b, i) => (
                        <tr key={i}>
                          <td className="border p-3">{b.brand}</td>
                          <td className="border p-3 text-center">{b.class}</td>
                          <td className="border p-3 text-right">
                            ${Number(b.price).toLocaleString()}
                          </td>
                          <td className="border p-3 text-center">
                            {b.unitsSold}
                          </td>
                          <td className="border p-3 text-right font-semibold">
                            ${b.commission.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No commission data available for this salesman.
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <CommissionRulesModal
        open={openRules}
        onClose={() => setOpenRules(false)}
      />
    </div>
  );
};

export default CommissionReport;
