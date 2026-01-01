import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="space-y-10">
      <section className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white shadow-lg">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Car Sales & Commission Management
          </h1>
          <p className="text-indigo-100 mb-6">
            Manage car models, track sales performance, and generate accurate
            commission reports — all in one place.
          </p>

          <div className="flex gap-4">
            <Link
              to="/cars"
              className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
            >
              Manage Cars
            </Link>
            <Link
              to="/commission-report"
              className="rounded-lg border border-white px-5 py-2 text-sm font-semibold hover:bg-white hover:text-indigo-600"
            >
              View Commission Report
            </Link>
          </div>
        </div>
      </section>{" "}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          What You Can Do
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Car Model Management",
              desc: "Create, update and manage car models with images, pricing, class, and features.",
              link: "/cars",
            },
            {
              title: "Sales Tracking",
              desc: "Track which salesman sold which car model and how many units were sold.",
              link: "/sales",
            },
            {
              title: "Commission Reports",
              desc: "Generate detailed commission reports based on brand, class, and sales rules.",
              link: "/commission-report",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>

              <Link
                to={feature.link}
                className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:underline"
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-xl border bg-gray-50 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            Ready to explore the system?
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Start managing cars and tracking commissions today.
          </p>
        </div>

        <Link
          to="/cars"
          className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;
