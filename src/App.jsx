import { BrowserRouter, Route, Routes } from "react-router-dom";
import data from "./data.json";
import DnsPage from "./screen/DnsPage";
import SecurityPage from "./screen/SecurityPage";
import OverviewPage from "./screen/OverviewPage";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<OverviewPage data={data} />} />
          <Route path="/dns" element={<DnsPage data={data} />} />
          <Route path="/security" element={<SecurityPage data={data} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
