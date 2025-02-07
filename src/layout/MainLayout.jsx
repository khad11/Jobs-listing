import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

function MainLayout() {
  return (
    <>
      <main>
        <Navbar />
        <Outlet />
      </main>
    </>
  );
}
export default MainLayout;
