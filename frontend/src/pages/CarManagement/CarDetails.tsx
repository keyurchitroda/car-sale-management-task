import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCar, getCarById } from "../../services/carServices";
import AddCarModal from "./AddCarModal";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState<any>(null);
  const [activeImg, setActiveImg] = useState<string>("");
  const [editOpen, setEditOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      const res: any = await getCarById(id!);
      setCar(res.data);
      setActiveImg(res.data.thumbnail);
    };
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this car?");

    if (!confirm) return;

    try {
      await deleteCar(car.id);
      alert("Car deleted successfully");
      navigate("/cars");
    } catch (err) {
      alert("Failed to delete car");
    }
  };

  if (!car) return <div>Loading...</div>;

  return (
    <>
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">{car.modelName}</h1>
            <p className="text-gray-500">
              {car.brand} • Class {car.class} • {car.modelCode}
            </p>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => setEditOpen(true)}
              className="cursor-pointer rounded-lg border px-5 py-2"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="cursor-pointer rounded-lg bg-red-600 text-white px-5 py-2"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <img
              src={activeImg}
              className="w-full h-[420px] object-cover rounded-xl border"
            />

            <div className="flex gap-3 mt-4">
              {car.images.map((img: string) => (
                <img
                  key={img}
                  src={img}
                  onClick={() => setActiveImg(img)}
                  className={`h-20 w-28 object-cover rounded-lg cursor-pointer border
                  ${
                    activeImg === img
                      ? "ring-2 ring-indigo-600"
                      : "hover:opacity-80"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-3xl font-bold text-indigo-600">
              ${Number(car.price).toLocaleString()}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Manufacturing Date</p>
                <p className="font-medium">
                  {new Date(car.dateOfManufacturing).toDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Sort Order</p>
                <p className="font-medium">{car.sortOrder}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: car.description }}
              />
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Features</h3>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: car.features }}
              />
            </div>
          </div>
        </div>
      </div>
      {editOpen && (
        <AddCarModal
          onClose={() => setEditOpen(false)}
          initialData={car}
          refresh={() => window.location.reload()}
        />
      )}
    </>
  );
};

export default CarDetails;
