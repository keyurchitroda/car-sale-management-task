import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
              CM
            </div>
            <span className="text-lg font-semibold text-gray-800">
              Car Management
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { name: "Dashboard", path: "/" },
              { name: "Cars", path: "/cars" },
              { name: "Sales", path: "/sales" },
              { name: "Commission Report", path: "/commission-report" },
            ].map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-indigo-600"
                      : "text-gray-600 hover:text-indigo-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-1.5 text-sm text-white hover:bg-indigo-700">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
