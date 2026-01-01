import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface Props {
  label: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (val: string) => void;
}

const CKEditorField = ({ label, value, error, touched, onChange }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div
        className={`rounded-lg border ${
          error && touched ? "border-red-500" : "border-gray-300"
        }`}
      >
        <CKEditor
          editor={ClassicEditor as any}
          data={value}
          onChange={(_, editor) => {
            onChange(editor.getData());
          }}
        />
      </div>

      {error && touched && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
};

export default CKEditorField;
