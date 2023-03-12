import DashbordCard from "../Ui/DashbordCards";
import DasboardBoady from "../Ui/DashboardBody";
import React, { useState } from 'react';
import { auth, db } from '../auth/firebaseAuth';
import { collection, getDocs } from 'firebase/firestore';
import "../../css/Admin.css"


function AdminDashbord() {
    const [elementState,setElementsState] = useState({
        pendingDoctorsList:false,
        varifiedDoctorsList:false
    })
    // Pending Doctors array of Obj
    async function getAllPendingDoctor(){
        const pendingDoctorCollectionRef = collection(db, 'pendingDoctorCollection');
        const pendingDoctorSnapshot = await getDocs(pendingDoctorCollectionRef);
        const allPendingDoctor=pendingDoctorSnapshot.docs.map((doc)=>doc.data());
        return allPendingDoctor;
    }
    return (  
        <div className="admin-container main--container">
            <div className="admin__header__cards">
                <DashbordCard header="Pending Doctors" value={16} type="one" />
                <DashbordCard header="Varified Doctors" value={16} type="two"/>
                <DashbordCard header="Total Patient" value={16} type="one"/>
                <DashbordCard header="Total Doctors" value={16} type="two"/>
            </div>
            <div className="admin__dashboard__body">
                <DasboardBoady/>
            </div>
        </div>
    );
}

export default AdminDashbord;