import { Suspense, lazy, type ComponentType } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import HomeLayout from "../components/shared/HomeLayout/HomeLayout";

const Loadable =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) => {
    return (
      <div>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Component {...props} />
        </Suspense>
      </div>
    );
  };
export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "cars",
          children: [
            { index: true, element: <CarManagement /> },
            { path: ":id", element: <CarDetails /> },
          ],
        },
        {
          path: "sales",
          element: <Sales />,
        },
        {
          path: "commission-report",
          element: <CommissionReport />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);
}

const Home = Loadable(lazy(() => import("../pages/Home/Home")));
const CarManagement = Loadable(
  lazy(() => import("../pages/CarManagement/CarManagement"))
);
const CarDetails = Loadable(
  lazy(() => import("../pages/CarManagement/CarDetails"))
);
const Sales = Loadable(lazy(() => import("../pages/Sales/Sales")));
const CommissionReport = Loadable(
  lazy(() => import("../pages/CommissionReport/CommissionReport"))
);
