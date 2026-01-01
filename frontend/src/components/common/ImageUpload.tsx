import { X } from "lucide-react";

interface Props {
  images: File[];
  setImages: (files: File[]) => void;
  existingImages?: string[];
  setExistingImages?: (imgs: string[]) => void;
  defaultImage?: string;
  setDefaultImage?: (img: string) => void;
  onDeleteExistingImage?: (img: string) => void;
  error?: string;
  touched?: boolean;
}

const ImageUpload = ({
  images,
  setImages,
  existingImages = [],
  setExistingImages,
  defaultImage,
  setDefaultImage,
  error,
  touched,
  onDeleteExistingImage,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const removeNewImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const removeExistingImage = (img: string) => {
    if (!setExistingImages) return;

    const updatedImages = existingImages.filter((i) => i !== img);
    setExistingImages(updatedImages);

    if (defaultImage === img && setDefaultImage) {
      setDefaultImage(updatedImages[0] || "");
    }
    onDeleteExistingImage?.(img);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">Car Images</label>
      <label
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition
          ${
            error && touched
              ? "border-red-500 bg-red-50"
              : "border-gray-300 bg-gray-50 hover:border-indigo-500 hover:bg-indigo-50"
          }
        `}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        <p className="text-sm text-gray-600">
          <span className="font-medium text-indigo-600">Click to upload</span>{" "}
          or drag & drop
        </p>
        <p className="text-xs text-gray-500">PNG, JPG, JPEG (max 5 images)</p>
      </label>
      {error && touched && <p className="text-xs text-red-500">{error}</p>}{" "}
      {existingImages.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Existing Images</p>
          <div className="grid grid-cols-4 gap-3">
            {existingImages.map((img) => (
              <div
                key={img}
                className="relative h-28 rounded-lg border overflow-hidden group"
              >
                <img
                  src={img}
                  onClick={() => setDefaultImage && setDefaultImage(img)}
                  className={`h-full w-full object-cover cursor-pointer
                    ${defaultImage === img ? "ring-2 ring-indigo-600" : ""}`}
                />

                {defaultImage === img && (
                  <div className="absolute bottom-1 left-1 bg-indigo-600 text-white rounded px-2 py-0.5 text-xs">
                    Default
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => removeExistingImage(img)}
                  className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white opacity-0 group-hover:opacity-100"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {images.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">New Images</p>
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative h-28 rounded-lg border overflow-hidden group"
              >
                <img
                  src={URL.createObjectURL(img)}
                  className="h-full w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeNewImage(i)}
                  className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white opacity-0 group-hover:opacity-100"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
