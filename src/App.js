import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Archive from './screens/Archive';
import Single from './screens/Single';

export default function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route index path="/" element={<Archive/>} />
          <Route path="item/:token" element={<Single/>} />
          <Route path="*" element={ <Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
};
