import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* renders child routes like Dashboard */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
