import DashbordCard from "../Ui/DashbordCards";
import DashboardBodyOfList from "../Ui/DashboardBodyOfList";
import DasboardFilter from "../Ui/DashboardFilters";
import React, { useState, useEffect } from 'react';
import { db } from '../../auth/firebaseAuth';
import { collection, getDocs } from 'firebase/firestore';
import "../../css/Admin.css"
import { testArray } from "../../Utils/testData";

function AdminDashbord() {
  const [elementState, setElementsState] = useState({
    pendingDoctorsList: true,
    varifiedDoctorsList: false,
    totalPatientInfo: false,
    instights: false,
  })
  const [myData, setMyData] = useState({
    gotPendingDoctorsArray: false,
  })
  function handleSelect(key) {
    for (const prop in elementState) {
      if (prop === key) {
        setElementsState(prevState => ({
          ...prevState,
          [prop]: true
        }));
      } else {
        setElementsState(prevState => ({
          ...prevState,
          [prop]: false
        }));
      }
    }
  }
  // Pending Doctors array of Obj
  let pendingDoctorsArray = null;

  async function getAllPendingDoctor() {
    const pendingDoctorCollectionRef = collection(db, 'pendingDoctorCollection');
    const pendingDoctorSnapshot = await getDocs(pendingDoctorCollectionRef);
    const allPendingDoctor = pendingDoctorSnapshot.docs.map((doc) => doc.data());
    pendingDoctorsArray = allPendingDoctor;
    setMyData(pervData => ({ ...pervData, gotPendingDoctorsArray: true }));
  }

  function getSelectedArrayElements(key, value) {
    console.log("elementSelected: ", key, "value: ", value)
  }

  useEffect(() => {
    if (!pendingDoctorsArray) {
      getAllPendingDoctor();
    }
  }, []);

  return (
    <div className="main--container admin-container">
      <div className="admin__header__cards">
        <DashbordCard
          header="Pending Doctors"
          value={16} type="one"
          isSelected={elementState.pendingDoctorsList}
          handleSelect={() => handleSelect("pendingDoctorsList")} />

        <DashbordCard
          header="Varified Doctors"
          value={16} type="two"
          isSelected={elementState.varifiedDoctorsList}
          handleSelect={() => handleSelect("varifiedDoctorsList")} />

        <DashbordCard
          header="Total Patient"
          value={16} type="one"
          isSelected={elementState.totalPatientInfo}
          handleSelect={() => handleSelect("totalPatientInfo")} />

        <DashbordCard
          header="Total Doctors"
          value={16} type="two"
          isSelected={elementState.instights}
          handleSelect={() => handleSelect("instights")} />
      </div>
      <div className="admin__dashboard__body">
        <DasboardFilter getSelectedArrayElements={getSelectedArrayElements} />
        {/* {elementState.pendingDoctorsList && (myData.gotPendingDoctorsArray ? <DasboardBody pendingDoctorsArray={pendingDoctorsArray}/> : <div className="dashboard__loader">Loading</div>)} */}
        {elementState.pendingDoctorsList && <DashboardBodyOfList testArray={testArray} />}
        {elementState.varifiedDoctorsList && <div>Varified doctors</div>}
        {elementState.totalPatientInfo && <div>Total Patient</div>}
        {elementState.instights && <div>Insights</div>}
      </div>
    </div>
  );
}

export default AdminDashbord;