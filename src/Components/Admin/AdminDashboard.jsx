import DashbordCard from "../Ui/DashbordCards";
import DashboardBodyOfList from "../Ui/DashboardBodyOfList";
import DasboardFilter from "../Ui/DashboardFilters";
import React, { useState, useEffect } from 'react';
import { db } from '../../auth/firebaseAuth';
import { collection, getDocs } from 'firebase/firestore';
import "../../css/Admin.css"
import { testArray } from "../../Utils/testData";

function AdminDashbord() {
  console.log("Admin Dashboard Rendered")
  
  // State to keep track of the selected element from dashboard
  const [selectedElement, setSelectedElement] = useState("pendingDoctorsList")

  // State to keep track of incoming data from server
  const [myData, setMyData] = useState({ pendingDoctorsArray: false, })

  // Function to handle the selected element from dashboard and update state based on it
  function handleSelect(key) {
    setSelectedElement(key)
  }
  // Function to get array of all penfing doctor data from server
  async function getAllPendingDoctor() {
    const pendingDoctorCollectionRef = collection(db, 'pendingDoctorCollection');
    const pendingDoctorSnapshot = await getDocs(pendingDoctorCollectionRef);
    const allPendingDoctor = pendingDoctorSnapshot.docs.map((doc) => doc.data());
    setMyData(pervData => ({ ...pervData, pendingDoctorsArray: allPendingDoctor }));
  }

  useEffect(() => {
    if (!myData.pendingDoctorsArray) {
      getAllPendingDoctor();
    }
  }, []);

  // Function to get selected filter 
  function getSelectedArrayElements(key, value) {
    console.log("elementSelected: ", key, "value: ", value)
  }

  return (
    <div className="main--container admin-container">
      <div className="admin__header__cards">
        <DashbordCard
          header="Pending Doctors"
          value={16} type="one"
          isSelected={selectedElement.pendingDoctorsList}
          handleSelect={() => handleSelect("pendingDoctorsList")} />

        <DashbordCard
          header="Varified Doctors"
          value={16} type="two"
          isSelected={selectedElement.varifiedDoctorsList}
          handleSelect={() => handleSelect("varifiedDoctorsList")} />

        <DashbordCard
          header="Total Patient"
          value={16} type="one"
          isSelected={selectedElement.totalPatientInfo}
          handleSelect={() => handleSelect("totalPatientInfo")} />

        <DashbordCard
          header="Total Doctors"
          value={16} type="two"
          isSelected={selectedElement.instights}
          handleSelect={() => handleSelect("instights")} />
      </div>
      <div className="admin__dashboard__body">
        <DasboardFilter getSelectedArrayElements={getSelectedArrayElements} />
        {selectedElement === "pendingDoctorsList" && (myData.pendingDoctorsArray ? <DashboardBodyOfList pendingDoctorsArray={myData.pendingDoctorsArray} /> : <div className="dashboard__loader">Loading</div>)}
        {selectedElement === "varifiedDoctorsList" && <div>Varified doctors</div>}
        {selectedElement === "totalPatientInfo" && <div>Total Patient</div>}
        {selectedElement === "instights" && <div>Insights</div>}
      </div>
    </div>
  );
}

export default AdminDashbord;