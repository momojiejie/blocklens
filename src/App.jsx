import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import CoinDetail from "./pages/CoinDetail"; // <-- import your new detail page
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/coin/:id" element={<CoinDetail />} /> {/* new route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
