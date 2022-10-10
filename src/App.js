import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Upload from "./components/upload";
import MyImages from "./components/MyImages";
import InfiniteScroll from "./components/InfiniteScroll";
import InfScrollMyImg from "./components/InfScrollMyImg";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <BrowserRouter basename="/dog-app">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/myImages" element={<MyImages />} />
          <Route path="/inf-scroll" element={<InfiniteScroll />} />
          <Route path="/inf-scroll-my-img" element={<InfScrollMyImg />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
