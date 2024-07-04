import React from "react";
import FinancialCharts from "./components/FinancialCharts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blog from "./components/Blog";
import Navbar from "./components/Navbar";
import GoogleMapsInput from "./components/GoogleMapsInput";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<FinancialCharts />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/google-map" element={<GoogleMapsInput />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
