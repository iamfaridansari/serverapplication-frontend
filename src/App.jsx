import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import KapbrosForm from "./components/Kapbros/KapbrosForm";
import KapbrosImages from "./components/Kapbros/KapbrosImages";
import FaridsClosetProducts from "./components/Farids closet/FaridsClosetProducts";
import NightSuitProducts from "./components/Night Suit/NightSuitProducts";
import SaybaGroupForm from "./components/Sayba Group/SaybaGroupForm";
import DelhiDarbarForm from "./components/Delhi Darbar/DelhiDarbar";
import { AppContextProvider } from "./context/AppContext";
import MultistepForm from "./components/Multistep Form/MultistepForm";
import SaybaGroupProperties from "./components/Sayba Group/SaybaGroupProperties";

const App = () => {
  return (
    <AppContextProvider>
      {/* <Header /> */}
      <div className="wrapper">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/*  */}
            <Route path="/saybagroup/form" element={<SaybaGroupForm />} />
            <Route
              path="/saybagroup/properties"
              element={<SaybaGroupProperties />}
            />
            {/*  */}
            <Route path="/delhidarbar/form" element={<DelhiDarbarForm />} />
            {/*  */}
            <Route path="/kapbros/form" element={<KapbrosForm />} />
            <Route path="/kapbros/gallery" element={<KapbrosImages />} />
            {/*  */}
            <Route
              path="/faridscloset/products"
              element={<FaridsClosetProducts />}
            />
            {/*  */}
            <Route path="/nightsuit/products" element={<NightSuitProducts />} />
            {/*  */}
            <Route path="/multistepform/form" element={<MultistepForm />} />
          </Routes>
        </main>
      </div>
    </AppContextProvider>
  );
};

export default App;
