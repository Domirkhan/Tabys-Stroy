import React from "react";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../../context/auth";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import BottomNav from "../../components/BottomNav";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <>
    <Header />  
    <div className="container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>{auth?.user?.name}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
      </div>
      <BottomNav />
      <Footer />
    </>
  );
};

export default Dashboard;