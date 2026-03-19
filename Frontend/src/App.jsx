import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Login";
import Layout from "./Layout/Layout";
import Homepage from "./pages/Homepage";
import PaymentGateway from "./pages/PaymentGateway";
import EsewaSuccess from "./payment/EsewaSuccess";
import KhaltiSuccess from "./payment/KhaltiSuccess";
import EsewaFailure from "./payment/EsewaFailure";
import KhaltiFailure from "./payment/KhaltiFailure";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />

        <Route
          path="/home"
          element={
            <Layout>
              <Homepage />
            </Layout>
          }
        />
            <Route
          path="/payment"
          element={
            <Layout>
              <PaymentGateway />
            </Layout>
          }
        />
        <Route path="/esewa/success" element={<EsewaSuccess />} />
        <Route path="/esewa/failure" element={<EsewaFailure />} />
        
        <Route path="/khalti/success" element={<KhaltiSuccess />} />
        <Route path="/khalti/failure" element={<KhaltiFailure />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
