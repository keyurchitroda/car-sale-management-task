import { Field, ErrorMessage } from "formik";

interface Props {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  max?: string;
}

const FormInput = ({ name, label, type = "text", placeholder, max }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        max={max}
        className="rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
      />
      <ErrorMessage
        name={name}
        component="span"
        className="text-xs text-red-500"
      />
    </div>
  );
};

export default FormInput;
