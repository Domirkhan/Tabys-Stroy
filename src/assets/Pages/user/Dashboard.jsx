import React from "react";
import { useAuth } from "../../../context/auth";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPen } from "react-icons/fa";
import UserMenu from "../../components/UserMenu";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import BottomNav from "../../components/BottomNav";
import "../../styles/Dashboard.css";

const Dashboard = () => {
  const [auth] = useAuth();
  const currentDate = new Date().toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <>
      <Header />  
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="profile-card">
                <div className="profile-avatar">
                  <FaUser />
                </div>
                <div className="profile-info">
                  <h2>Добро пожаловать, {auth?.user?.name}!</h2>
                  <p><FaUser /> {auth?.user?.name}</p>
                  <p><FaEnvelope /> {auth?.user?.email}</p>
                  {auth?.user?.phone && <p><FaPhone /> {auth?.user?.phone}</p>}
                  {auth?.user?.address && <p><FaMapMarkerAlt /> {auth?.user?.address}</p>}
                  <p className="last-login">Последний вход: {currentDate}</p>
                  <Link to="/dashboard/user/profile" className="edit-profile-btn">
                  <FaPen /> Редактировать
                </Link>
                </div>
                
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