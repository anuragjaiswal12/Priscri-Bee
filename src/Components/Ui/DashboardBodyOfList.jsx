import "../../css/Dashboard.css"
import React, { useState } from 'react';

function DashboardBodyOfList(props) {
    const [selectedElemnet, setSelectedElemnet] = useState(null)
    console.log(props)
    const elementsArray = props.pendingDoctorsArray.map((item, index) => (
        <div
            className="dashboard__body__elements"
            onClick={() => extendElements(index)}
        >
            <div className="dashboard__body__fullName">Doctors Name :  {item.firstName + " " + item.lastName}</div>
            <div className="dashboard__body__Qualification">Qualification : {item.qualification}</div>
            <div className="dashboard__body__Registration">Registration Number : {item.registrationNumber}</div>
            <div className="dashboard__body__DateOfRegistration">Date of Registration : {item.dateOfRegistration}</div>
            {selectedElemnet === index &&
                <>
                    <div className="dashboard__body__WorkExperience">Gender : {item.gender}</div>
                    <div className="dashboard__body__Qualification">Work Experience : {item.workExperience}</div>
                    <div className="dashboard__body__Qualification_Year">Qualification Year : {item.qualificationYear}</div>
                    <div className="dashboard__body__Dob">Date Of Birth :  {item.dateOfBirth}</div>
                    <div className="dashboard__body__Email">Email : {item.email}</div>
                    <div className="dashboard__body__Phone">Phone No : {item.phone}</div>
                    <div className="dashboard__body__Address"><h2>Adderess</h2></div>
                    <div className="dashboard__body__HouseNo">House No : {item.addreess.houseNo}</div>
                    <div className="dashboard__body__Street">Street : {item.addreess.street}</div>
                    <div className="dashboard__body__Area">Area : {item.addreess.area}</div>
                    <div className="dashboard__body__Landmark">Landmark : {item.addreess.landmark}</div>
                    <div className="dashboard__body__Pincode">Pincode : {item.addreess.pincode}</div>
                    <div className="dashboard__body__City">City : {item.addreess.city}</div>
                    <div className="dashboard__body__State">State : {item.addreess.state}</div>
                    <div className="dashboard__body__icons">
                        <div className="dashboard__body__icons__right"><i class="fa-solid fa-circle-check dashboard__body__icons__right"></i></div>
                        <div className="dashboard__body__icons__cross"><i class="fa-solid fa-circle-xmark"></i></div>
                    </div>
                </>
            }

        </div>
    ))

    function extendElements(id) {
        selectedElemnet === id ? setSelectedElemnet(null) : setSelectedElemnet(id)
    }
    return (
        <div className="dashboard__body">
            {elementsArray}
        </div>
    );
}

export default DashboardBodyOfList;