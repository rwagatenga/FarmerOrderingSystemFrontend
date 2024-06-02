import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navs";
import BackroundImage from "../assets/images/farm_bg.jpeg";
// import "../App.css";

const Layout = () => {
  const [sidebar, setSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setSidebar(true);
      } else {
        setSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <div className="">
        <div
          className="flex flex-col min-h-screen w-full bg-gray-200 ml-36 absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BackroundImage})` }}
        >
          <Navbar onOpenSidebar={toggleSidebar} />
          <div className="flex flex-1">
            <Sidebar sidebar={sidebar} />
            <main className="container px-4 py-6 backdrop-blur-sm z-10 ml-32 mt-14 w-[85%]">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
