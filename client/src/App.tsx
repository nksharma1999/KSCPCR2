import React, { Suspense, lazy, useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from "./Layout/MainLayout";
import { Loading } from "./components/utils/Loading";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import AddNewCaseForm from "./components/Case/AddNewCaseForm";
import CaseTracker from "./components/Case/CaseTracker";
import CaseDetails from "./components/Case/CaseDetails";
import { Login } from "./components/Login/Login";
import { Index } from "./components/MasterData/Index";
import { CourtInfo } from "./components/MasterData/CourtInfo";
import Court from "./components/MasterData/Court"
import axios from "axios";
import { IP } from "./components/utils/IP";
const DashBoard = lazy(() => import("./components/DashBoard"));
const State = lazy(() => import("./components/MasterData/State"));
const District = lazy(() => import("./components/MasterData/District"));
const City = lazy(() => import("./components/MasterData/City"));
const Taluk = lazy(() => import("./components/MasterData/Taluk"));
const Village = lazy(() => import("./components/MasterData/Village"));
const Juridiction = lazy(() => import('./components/MasterData/Juridiction'));

function App() {
  const [auth, setAuth] = useState<boolean>(false);
  const [loading,setLoading] = useState<boolean>(true);
  const updateAuth = (authData: any) => {
    setAuth(authData);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const body = {
        token: token,
      };
      axios
        .post(IP.API + "auth", body)
        .then((res) => {
          setAuth(res.data.isLogin);
          setLoading(false)
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }else{
      setLoading(false);
    }
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {!auth && (
            <Routes>
              <Route path="/" element={<Login updateAuth={updateAuth} />} />
              <Route path="*" element={<Login updateAuth={updateAuth} />} />
            </Routes>
          )}
          {auth && (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<CaseTracker />} />

                  <Route path="/master-data" element={<Outlet />}>
                    <Route path="index" element={<Index />} />
                    <Route path="Village" element={<Village />} />
                    <Route path="District" element={<District />} />
                    <Route path="State" element={<State />} />
                    <Route path="Taluk" element={<Taluk />} />
                    <Route path="City" element={<City />} />
                    <Route path="court" element={<Court />} />
                    <Route path="juridiction" element={<Juridiction />} />
                  </Route>
                  <Route path="/case" element={<Outlet />}>
                    <Route path="case-tracker/" element={<CaseTracker />} />
                    <Route path="case-tracker/:id" element={<CaseDetails />} />
                    <Route path="new-case/" element={<AddNewCaseForm />} />
                    <Route path="new-case/:id" element={<AddNewCaseForm />} />
                  </Route>
                </Routes>
              </Suspense>
            </MainLayout>
          )}
        </>
      )}
    </>
  );
}

export default App;
