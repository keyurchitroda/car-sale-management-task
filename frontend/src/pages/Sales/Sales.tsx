import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import FormSelect from "../../components/common/FormSelect";
import FormInput from "../../components/common/FormInput";
import * as Yup from "yup";
import { addNewSales, getSalesman } from "../../services/salesService";
import { getCars } from "../../services/carServices";
import { toast } from "react-toastify";

interface Salesman {
  id: number;
  name: string;
}

interface CarModel {
  id: number;
  modelName: string;
  modelCode: string;
  brand: string;
}

export const SalesValidationSchema = Yup.object({
  salesmanId: Yup.number().required("Salesman is required"),

  carModelId: Yup.number().required("Car model is required"),

  quantity: Yup.number()
    .positive("Quantity must be greater than 0")
    .integer("Quantity must be an integer")
    .required("Quantity is required"),
});

const Sales = () => {
  const [salesmen, setSalesmen] = useState<Salesman[]>([]);
  const [cars, setCars] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [salesmanRes, carRes] = await Promise.all([
        getSalesman(),
        getCars(),
      ]);

      setSalesmen(salesmanRes.data);
      setCars(carRes.data);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Create Sales Entry</h1>
        <p className="text-sm text-gray-500">Assign car sales to a salesman</p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <Formik
          initialValues={{
            salesmanId: "",
            carModelId: "",
            quantity: 1,
          }}
          validationSchema={SalesValidationSchema}
          onSubmit={async (values, { resetForm }) => {
            setLoading(true);
            await addNewSales({
              salesmanId: Number(values.salesmanId),
              carModelId: Number(values.carModelId),
              quantity: Number(values.quantity),
            });
            setLoading(false);
            resetForm();
            toast.success("Sales entry created successfully");
          }}
        >
          {() => (
            <Form className="space-y-6">
              <FormSelect
                name="salesmanId"
                label="Salesman"
                options={salesmen.map((s) => ({
                  label: s.name,
                  value: String(s.id),
                }))}
              />

              <FormSelect
                name="carModelId"
                label="Car Model"
                options={cars.map((c) => ({
                  label: `${c.modelName} (${c.modelCode})`,
                  value: String(c.id),
                }))}
              />

              <FormInput
                name="quantity"
                label="Quantity"
                type="number"
                placeholder="Enter quantity"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="reset"
                  className="rounded-lg border px-4 py-2 text-sm"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-indigo-600 px-6 py-2 text-sm text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Create Sale"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Sales;
