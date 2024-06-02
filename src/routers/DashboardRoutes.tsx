import Dashboard from "@/pages/Dashboard";
import AddFertilizer from "@/pages/AddFertilizer";
import AddSeed from "@/pages/AddSeed";
import AddLand from "@/pages/AddLand";
import Order from "@/pages/Order";
import ViewOrders from "@/pages/ViewOrders";
import TobeContinue from "@/pages/ToBeContinue";

const DashboardRoutes = () => [
  { index: false, path: "/dashboard", element: <TobeContinue /> },
  { path: "/dashboard/add-fertilizer", element: <AddFertilizer /> },
  { path: "/dashboard/add-seed", element: <AddSeed /> },
  { path: "/dashboard/add-land", element: <AddLand /> },
  { path: "/dashboard/order", element: <Order /> },
  { path: "/dashboard/view-orders", element: <ViewOrders /> },
];

export default DashboardRoutes;
