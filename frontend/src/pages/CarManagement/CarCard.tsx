import { useNavigate } from "react-router-dom";

const CarCard = ({ car }: any) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/cars/${car.id}`)}
      className="cursor-pointer rounded-xl border bg-white shadow-sm hover:shadow-md transition"
    >
      <img
        src={car.thumbnail}
        className="h-40 w-full object-cover rounded-t-xl"
      />

      <div className="p-4 space-y-2">
        <h3 className="font-semibold">{car.modelName}</h3>
        <p className="text-sm text-gray-500">
          {car.brand} • Class {car.class}
        </p>
        <p className="text-indigo-600 font-semibold">${car.price}</p>
      </div>
    </div>
  );
};

export default CarCard;
