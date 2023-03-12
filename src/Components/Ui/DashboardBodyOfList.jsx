import "../../css/Dashboard.css"
import React, { useState } from 'react';

function DasboardBody(props) {
    const [selectedElemnet,setSelectedElemnet] = useState(null)
    let obj = {
        addreess: {houseNo: '415', street: 'Lakshmi Nagar', landmark: 'Near IswarKrupa', area: 'varachha', city: 'Surat', pincode:395006,state:"Gujarat"},
        areasOfExpertise:  ['DEATH ', 'BEFORE AND AFTER LIFE', 'MOMENTS JUST BEFORE DEATH', 'DESAPIR', 'HELLISHNESS'],
        dateOfBirth: "05/03/2001",
        dateOfRegistration: "27/02/2023",
        email: "anurag.d.j174414@gmail.com",
        firstName: "Vivek",
        gender: "female",
        lastName: "Prajapati",
        phone: "9327667270",
        qualification: "DNB",
        qualificationYear: "2001",
        registrationNumber: "FCKOO90",
        universityName: "SRM UNIVERSITY",
        workExperience: "7"
    }
    const elementsArray = new Array(20).fill(obj).map((item,index) => (
            <div 
                className="dashboard__body__elements" 
                onClick={()=>extendElements(index)}
                >
                <div className="dashboard__body__fullName">Doctors Name :  {obj.firstName +" "+obj.lastName}</div>
                <div className="dashboard__body__Qualification">Qualification : {obj.qualification}</div>
                <div className="dashboard__body__Registration">Registration Number : {obj.registrationNumber}</div>
                <div className="dashboard__body__DateOfRegistration">Date of Registration : {obj.dateOfRegistration}</div>
                {selectedElemnet === index &&
                <>
                <div className="dashboard__body__WorkExperience">Gender : {obj.gender}</div>
                <div className="dashboard__body__Qualification">Work Experience : {obj.workExperience}</div>
                <div className="dashboard__body__Qualification_Year">Qualification Year : {obj.qualificationYear}</div>
                <div className="dashboard__body__Dob">Date Of Birth :  {obj.dateOfBirth}</div>
                <div className="dashboard__body__Email">Email : {obj.email}</div>
                <div className="dashboard__body__Phone">Phone No : {obj.phone}</div>
                <div className="dashboard__body__Address"><h2>Adderess</h2></div>
                <div className="dashboard__body__HouseNo">House No : {obj.addreess.houseNo}</div>
                <div className="dashboard__body__Street">Street : {obj.addreess.street}</div>
                <div className="dashboard__body__Area">Area : {obj.addreess.area}</div>
                <div className="dashboard__body__Landmark">Landmark : {obj.addreess.landmark}</div>
                <div className="dashboard__body__Pincode">Pincode : {obj.addreess.pincode}</div>
                <div className="dashboard__body__City">City : {obj.addreess.city}</div>
                <div className="dashboard__body__State">State : {obj.addreess.state}</div>
                <div className="dashboard__body__icons">
                    <div className="dashboard__body__icons__right"><i class="fa-solid fa-circle-check dashboard__body__icons__right"></i></div>
                    <div className="dashboard__body__icons__cross"><i class="fa-solid fa-circle-xmark"></i></div>
                </div>
                </>
                }
                
            </div>
        ))

    function extendElements(id){
        selectedElemnet === id ? setSelectedElemnet(null) : setSelectedElemnet(id)
    }
    return ( 
        <div className="dashboard__body">
           {elementsArray}
        </div>
     );
}

export default DasboardBody;