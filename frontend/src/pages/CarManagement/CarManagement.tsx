import { useEffect, useState } from "react";
import AddCarModal from "./AddCarModal";
import CarCard from "./CarCard";
import { getCars } from "../../services/carServices";

const CarManagement = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [loading, setLoading] = useState(false);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res: any = await getCars({
        search: search || undefined,
        sortBy,
      });
      setCars(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchCars, 400);
    return () => clearTimeout(timer);
  }, [search, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Car Management</h1>

        <button
          onClick={() => setOpen(true)}
          className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-white"
        >
          + Add New Car
        </button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-xl border">
        <input
          type="text"
          placeholder="Search by Model Name or Code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="cursor-pointer rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="latest">Latest on top</option>
          <option value="date">Date of Manufacturing</option>
          <option value="sortOrder">Sort Order</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading cars...</div>
      ) : cars.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No cars found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}

      {open && (
        <AddCarModal onClose={() => setOpen(false)} refresh={fetchCars} />
      )}
    </div>
  );
};

export default CarManagement;
