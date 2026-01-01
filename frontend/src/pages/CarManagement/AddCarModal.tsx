import { Formik, Form } from "formik";
import * as Yup from "yup";
import CKEditorField from "../../components/common/CKEditorField";
import FormInput from "../../components/common/FormInput";
import ImageUpload from "../../components/common/ImageUpload";
import FormSelect from "../../components/common/FormSelect";
import { addNewCar, updateCar } from "../../services/carServices";
import { useState } from "react";

const schema = Yup.object({
  brand: Yup.string().required("Brand is required"),
  class: Yup.string().required("Class is required"),
  modelName: Yup.string().required("Model name is required"),
  modelCode: Yup.string()
    .length(10, "Model code must be exactly 10 characters")
    .matches(/^[a-zA-Z0-9]+$/, "Only alphanumeric allowed")
    .required("Model code is required"),
  description: Yup.string().min(1, "Description is required").required(),
  features: Yup.string().min(1, "Features are required").required(),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  dateOfManufacturing: Yup.string().required("Manufacturing date is required"),
});

interface AddCarModalProps {
  onClose: () => void;
  refresh?: () => void;
  initialData?: any;
}

const AddCarModal = ({ onClose, refresh, initialData }: AddCarModalProps) => {
  const isEdit = Boolean(initialData);
  const [existingImages, setExistingImages] = useState<string[]>(
    initialData?.images || []
  );
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [defaultImage, setDefaultImage] = useState(
    initialData?.thumbnail || ""
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl p-6 overflow-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-6">
          {isEdit ? "Edit Car Model" : "Add New Car"}
        </h2>

        <Formik
          initialValues={{
            brand: initialData?.brand || "",
            class: initialData?.class || "",
            modelName: initialData?.modelName || "",
            modelCode: initialData?.modelCode || "",
            description: initialData?.description || "",
            features: initialData?.features || "",
            price: initialData?.price || "",
            dateOfManufacturing:
              initialData?.dateOfManufacturing?.slice(0, 10) || "",
            sortOrder: initialData?.sortOrder || 1,
            images: [] as File[],
          }}
          validationSchema={schema}
          onSubmit={async (values, { setFieldError }) => {
            if (existingImages.length === 0 && values.images.length === 0) {
              setFieldError("images", "At least one image is required");
              return;
            }

            const formData = new FormData();

            Object.entries(values).forEach(([key, value]) => {
              if (key !== "images") {
                formData.append(key, String(value));
              }
            });

            values.images.forEach((img) => {
              formData.append("images", img);
            });

            const existingFileNames = existingImages.map(
              (img) => img.split("/").pop()!
            );

            const deletedFileNames = deletedImages.map(
              (img) => img.split("/").pop()!
            );

            const defaultFileName = defaultImage
              ? defaultImage.split("/").pop()
              : "";

            formData.append(
              "existingImages",
              JSON.stringify(existingFileNames)
            );
            formData.append("deletedImages", JSON.stringify(deletedFileNames));
            formData.append("defaultImage", defaultFileName);

            if (isEdit) {
              await updateCar(initialData.id, formData);
            } else {
              await addNewCar(formData);
            }

            refresh?.();
            onClose();
          }}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormSelect
                name="brand"
                label="Brand"
                options={[
                  { label: "Audi", value: "Audi" },
                  { label: "Jaguar", value: "Jaguar" },
                  { label: "Land Rover", value: "Land Rover" },
                  { label: "Renault", value: "Renault" },
                ]}
              />

              <FormSelect
                name="class"
                label="Class"
                options={[
                  { label: "Class A", value: "A" },
                  { label: "Class B", value: "B" },
                  { label: "Class C", value: "C" },
                ]}
              />

              <FormInput name="modelName" label="Model Name" />
              <FormInput name="modelCode" label="Model Code" />

              <FormInput name="price" label="Price" type="number" />
              <FormInput
                name="dateOfManufacturing"
                label="Manufacturing Date"
                type="date"
                max={new Date().toISOString().split("T")[0]}
              />

              {/* Description */}
              <div className="md:col-span-2">
                <CKEditorField
                  label="Description"
                  value={values.description}
                  onChange={(v) => setFieldValue("description", v)}
                  error={errors.description as string}
                  touched={Boolean(touched.description)}
                />
              </div>

              <div className="md:col-span-2">
                <CKEditorField
                  label="Features"
                  value={values.features}
                  onChange={(v) => setFieldValue("features", v)}
                  error={errors.features as string}
                  touched={Boolean(touched.features)}
                />
              </div>

              <div className="md:col-span-2">
                <ImageUpload
                  images={values.images}
                  setImages={(files) => setFieldValue("images", files)}
                  existingImages={existingImages}
                  setExistingImages={setExistingImages}
                  defaultImage={defaultImage}
                  setDefaultImage={setDefaultImage}
                  onDeleteExistingImage={(img) =>
                    setDeletedImages((prev) => [...prev, img])
                  }
                  error={errors.images as string}
                  touched={Boolean(touched.images)}
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="cursor-pointer px-6 py-2 rounded-lg bg-indigo-600 text-white"
                >
                  {isEdit ? "Update Car" : "Create Car"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCarModal;
