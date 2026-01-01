import { Field, ErrorMessage } from "formik";

interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  label: string;
  options: Option[];
}

const FormSelect = ({ name, label, options }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <Field
        as="select"
        name={name}
        className="rounded-lg border px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Field>

      <ErrorMessage
        name={name}
        component="span"
        className="text-xs text-red-500"
      />
    </div>
  );
};

export default FormSelect;
