import React, { useState } from 'react';

function DasboardFilter(props) {
    const [selectedFiter, setSelectedFilter] = useState()
    let item = {
        city: 'Surat',
        pincode: 395006,
        state: "Gujarat",
        areasOfExpertise: ['DEATH ', 'BEFORE AND AFTER LIFE', 'MOMENTS JUST BEFORE DEATH', 'DESAPIR', 'HELLISHNESS'],
        dateOfBirth: "05/03/2001",
        dateOfRegistration: "27/02/2023",
        email: "anurag.d.j174414@gmail.com",
        fullName: "Vivek",
        phone: "9327667270",
        qualification: "DNB",
        qualificationYear: "2001",
        registrationNumber: "FCKOO90",
        universityName: "SRM UNIVERSITY",
        workExperience: "7"
    }
    function updateSelectedFilter(key) {
        selectedFiter === key ? setSelectedFilter(null) : setSelectedFilter(key)
    }

    const fiterArray = Object.keys(item).map((item,index) => {
        return (
            <div
                className="dashboard__filter__elements"
                onClick={() => updateSelectedFilter(item)}
                style={{ "backgroundColor": selectedFiter === item ? "#a2ff8e" : "#badded" }}
                key = {index}
            >
                {`${item}`}
            </div>
        )
    })

    console.log(fiterArray)
    return (
        <>
            <div className="dashboard__filter">
                {fiterArray}
            </div>
            <div className='dashboard__filter__criteria'></div>
        </>
    );
}

export default DasboardFilter;