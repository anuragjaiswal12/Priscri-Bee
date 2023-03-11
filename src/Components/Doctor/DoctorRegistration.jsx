import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import "../../css/Registration.css"
import { Footer } from "../../Utils/Footer";
import { indianStates } from "../../Utils/Data";
import { calculateAge } from "../../Utils/calculateAge";

export default function PatientRegistration() {
  // main State of an application
  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    gender: "male",
    registrationNumber: "",
    qualification: "",
    otherQualification: "",
    qualificationYear: "",
    universityName: "",
    dateOfRegistration: "",
    specialization: "",
    workExperience: 0,
    areasOfExpertise: [],
    addreess: {
      houseNo: "",
      street: "",
      landmark: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
    },
    email: "",
    phone: "",
    password: "",
  })

  const [registrationErrors, setRegistrationErrors] = useState({});

  const stateArray = indianStates.map(item => <option value={item} key={item}>{item}</option>)
  // Temp State for handleing temp values 
  // after processing values get stored in registrationData state

  const [tempData, setTempData] = useState({
    tempAlllergies: "",
    tempDate: { startDate: new Date() },
    tempAreasOfExpertise: "",
    confirmPassword: "",
    tempDateOfRegistration: { startDate: new Date() }
  })

  const removeArrayItem = (item) => setRegistrationData(prevData => ({ ...prevData, areasOfExpertise: prevData.areasOfExpertise.filter(currItem => currItem != item) }))

  const expertiseArray = registrationData.areasOfExpertise.map(item =>
  (<span className="array__elements" key={item}>
    {item} <i className="fa-solid fa-circle-xmark" onClick={() => removeArrayItem(item)}></i>
  </span>))

  function handleTempData(event) {
    const { name, value } = event.target
    setTempData(prevData => ({
      ...prevData, [name]: value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    // Validate first name and last name fields (letters only, minimum length of 2)
    const nameRegex = /^[A-Za-z]{2,}$/

    // Validate phone number field (10 digit Indian mobile number)
    const phoneRegex = /^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/

    // Validate password field (minimum 8 characters, at least one uppercase letter, one lowercase letter, one special character, and one number)
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    //Validates pincode field.
    const pincodeRegex = /^\d{6}$/

    // Getting age of Doctor
    const age = calculateAge(registrationData.dateOfBirth)

    const errors = {}
    setRegistrationErrors({})
    if (!nameRegex.test(registrationData.firstName)) {
      errors.firstName = "Enter valid first name"
    }
    if (!nameRegex.test(registrationData.lastName)) {
      errors.lastName = "Enter valid last name"
    }
    if (!phoneRegex.test(registrationData.phone)) {
      errors.lastName = "Enter valid phonr number"
    }
    if (registrationData.qualification === 'Other') {
      if (registrationData.otherQualification.trim() === '') {
        errors.otherQualification = 'Please Enter qualification.'
      }
    }
    if (age < 18) {
      errors.dateOfBirth = 'Age shoud be 18 or more'
    }

    if (registrationData.areasOfExpertise.length < 1) {
      errors.areasOfExpertise = 'Enter at least one expertise.'
    }
    if (!passwordRegex.test(registrationData.password)) {
      errors.password = 'Password should be 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol'
    }
    if (!passwordRegex.test(tempData.confirmPassword)) {
      errors.confirmPassword = 'Password should be 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol'
    }
    if (passwordRegex.test(tempData.confirmPassword) && registrationData.password !== tempData.confirmPassword) {
      errors.confirmPassword = 'Both password should be same'
    }
    if (!pincodeRegex.test(registrationData.addreess.pincode)) {
      errors.pincode = 'Please Enter valid pincode'
    }
    console.log(errors)
    setRegistrationErrors(prevData => ({ ...prevData, ...errors }))
    console.log(registrationErrors)
  }
  // Function to push allergies array of registrationData
  const handleAddExpertise = (expertise) => {
    setRegistrationData(prevState => {
      return {
        ...prevState,
        areasOfExpertise: [...prevState.areasOfExpertise, expertise]
      }
    })
    setTempData(prevData => ({ ...prevData, tempAreasOfExpertise: "" }))
  }

  // Function to update registrationData as it updates
  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setRegistrationData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }))
    console.log(registrationData)
  }

  // Function to handle address object of registrationData
  function handleAddress(event) {
    const { name, value } = event.target
    setRegistrationData(prevData => ({
      ...prevData, addreess: {
        ...prevData.addreess, [name]: value
      }
    }))
  }

  // Function to update date into tempData and refect same date into registrationData
  function handleDate(date) {
    setRegistrationData(prevData => {
      const formattedDate = date.toLocaleDateString('en-GB');
      setTempData(prevData => ({
        ...prevData, tempDate: { startDate: date }
      }))
      return { ...prevData, dateOfBirth: formattedDate }
    })
  }

  function handleRegistrationDate(date) {
    setRegistrationData(prevData => {
      const formattedDate = date.toLocaleDateString('en-GB');
      setTempData(prevData => ({
        ...prevData, tempDateOfRegistration: { startDate: date }
      }))
      return { ...prevData, dateOfRegistration: formattedDate }
    })
  }

  return (
    <div className="patient-registration main-container">
      <form onSubmit={handleSubmit} className="registration-container">
        <div className="registration__personal__details grid--column--extended registration--personal--details">
          <h2>Personal Details :</h2>
        </div>
        <div>
          <label htmlFor="firstName" className="registration__label">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="registration__input input--error"
            onChange={handleChange}
            value={registrationData.firstName}
            required
          />
          {registrationErrors.firstName && <small className="error--message">{registrationErrors.firstName}</small>}
        </div>

        <div>
          <label htmlFor="lastName" className="registration__label" >Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="registration__input"
            onChange={handleChange}
            value={registrationData.lastName}
            required
          />
          {registrationErrors.lastName && <small className="error--message">{registrationErrors.lastName}</small>}
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="registration__label">Date Of Birth</label>
          <DatePicker
            name="dateOfBirth"
            dateFormat="dd/MM/yyyy"
            className="registration__input"
            selected={tempData.tempDate.startDate}
            onChange={handleDate}
          />
          {registrationErrors.dateOfBirth && <small className="error--message">{registrationErrors.dateOfBirth}</small>}

        </div>

        <div >
          <p className="registration__gender">Gender</p>
          <input
            id="male"
            type="radio"
            name="gender"
            value="male"
            checked={registrationData.gender === "male"}
            onChange={handleChange}
          />
          <label htmlFor="male">Male</label><br />
          <input
            id="female"
            type="radio"
            name="gender"
            value="female"
            checked={registrationData.gender === "female"}
            onChange={handleChange}
          />
          <label htmlFor="female">Female</label>
        </div>
        <div>
          <label htmlFor="phone" className="registration__label">Phone Number</label>
          <input
            type="number"
            name="phone"
            id="phone"
            className="registration__input"
            onChange={handleChange}
            value={registrationData.phone}
            required
          />

        </div>
        <div>
          <label htmlFor="workExperience" className="registration__label">Work Experience</label>
          <input
            type="number"
            name="workExperience"
            id="workExperience"
            className="registration__input"
            onChange={handleChange}
            value={registrationData.workExperience}
            required
          />
        </div>
        <div>
          <label htmlFor="registrationNumber">Registration Number</label>
          <input
            type="text"
            name="registrationNumber"
            id="registrationNumber"
            className="registration__input"
            onChange={handleChange}
            value={registrationData.registrationNumber}
            required
          />
        </div>
        <div>
          <label htmlFor="dateOfRegistration" className="registration__label">Date Of Registration</label>
          <DatePicker
            name="tempDateOfRegistration"
            dateFormat="dd/MM/yyyy"
            className="registration__input"
            selected={tempData.tempDateOfRegistration.startDate}
            onChange={handleRegistrationDate}
          />
        </div>

        <div>
          <label htmlFor="universityName" className="registration__label">University Name</label>
          <input
            type="text"
            name="universityName"
            id="universityName"
            className="registration__input"
            onChange={handleChange}
            value={registrationData.universityName}
            required
          />
        </div>
        <div className="registration__qualification"

          style={{ "gridColumn": registrationData.qualification === "Other" ? "1/2" : "1/3" }}>
          <label htmlFor="qualification">Select Qualification</label>
          <select
            id="qualification"
            name="qualification"
            onChange={handleChange}
            className="registration__input"
            value={registrationData.qualification}
          >
            <option value="MBBS">Bachelor of Medicine and Bachelor of Surgery (MBBS)</option>
            <option value="MD">Doctor of Medicine (MD)</option>
            <option value="MS">Master of Surgery (MS)</option>
            <option value="PhD">Doctor of Philosophy (PhD) in Medicine</option>
            <option value="DNB">Diplomate of National Board (DNB)</option>
            <option value="MD Homoeopathy">Doctor of Medicine in Homoeopathy (MD Homoeopathy)</option>
            <option value="BAMS">Bachelor of Ayurvedic Medicine and Surgery (BAMS)</option>
            <option value="BDS">Bachelor of Dental Surgery (BDS)</option>
            <option value="DDM">Doctor of Dental Medicine (DDM)</option>
            <option value="DDS">Doctor of Dental Surgery (DDS)</option>
            <option value="B.VSc">Bachelor of Veterinary Science (B.VSc)</option>
            <option value="M.VSc">Master of Veterinary Science (M.VSc)</option>
            <option value="BPT">Bachelor of Physiotherapy (BPT)</option>
            <option value="MPT">Master of Physiotherapy (MPT)</option>
            <option value="BOT">Bachelor of Occupational Therapy (BOT)</option>
            <option value="MOT">Master of Occupational Therapy (MOT)</option>
            <option value="Other">Others</option>
          </select>
        </div>
        <div style={{ "display": registrationData.qualification === "Other" ? "block" : "none" }}>
          <label htmlFor="otherQualification" className="registration__label">Enter Qualification</label>
          <input
            type="text"
            name="otherQualification"
            id="otherQualification"
            className="registration__input"
            onChange={handleChange}
            value={registrationData.otherQualification}
          />
          {registrationErrors.otherQualification && <small className="error--message">{registrationErrors.otherQualification}</small>}
        </div>

        <div>
          <label htmlFor="qualificationYear" className="registration__label">Qualification Year</label>
          <input
            type="number"
            name="qualificationYear"
            id="qualificationYear"
            className="registration__input"
            onChange={handleChange}
            required
            min="1900"
            max={`${new Date().getFullYear()}`}
            value={registrationData.qualificationYear} />
        </div>



        <div className="registration__expertise">
          <label htmlFor="areasOfExpertise" className="registration__label">Enter Your Area of Expertise</label>
          <input
            type="text"
            name="tempAreasOfExpertise"
            id="tempAreasOfExpertise"
            className="registration__input input--size--limit"
            onChange={handleTempData}
            value={tempData.tempAreasOfExpertise}
          />
          {expertiseArray.length > 0 && <div className="registration__expertise__display grid--column--extended">
            {expertiseArray}
          </div>}
          {registrationErrors.areasOfExpertise && <small className="error--message">{registrationErrors.areasOfExpertise}</small>}
        </div>
        <div className="registration__expertise__btn">
          <button type="button"
            className="registration__btn "
            onClick={() => handleAddExpertise(tempData.tempAreasOfExpertise)}>Add Expertise</button>
        </div>
        <div>
          <label htmlFor="email" className="registration__label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="registration__input"
            onChange={handleChange}
            value={registrationData.email}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="registration__label">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="registration__input"
            onChange={handleChange}
            value={registrationData.password}
            required
          />
          {registrationErrors.password && <small className="error--message">{registrationErrors.password}</small>}
        </div>
        <div>

          <label htmlFor="confirm_password" className="registration__label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirm_password"
            className="registration__input"
            onChange={handleTempData}
            value={tempData.confirmPassword}
            required
          />
          {registrationErrors.confirmPassword && <small className="error--message">{registrationErrors.confirmPassword}</small>}
        </div>

        {/* Address */}
        <div className="registration____details grid--column--extended registration--address--details"><h2>Address Details :</h2></div>
        <div>
          <label htmlFor="houseNo" className="registration__label">House No</label>
          <input
            type="number"
            name="houseNo"
            id="houseNo"
            className="registration__input"
            onChange={handleAddress}
            value={registrationData.addreess.houseNo}
            required
          />
        </div>

        <div>
          <label htmlFor="houseNo" className="registration__label">Street</label>
          <input
            type="text"
            name="street"
            id="street"
            className="registration__input"
            onChange={handleAddress}
            value={registrationData.addreess.street}
            required
          />
        </div>

        <div>

          <label htmlFor="landmark" className="registration__label">Landmark</label>
          <input
            type="text"
            name="landmark"
            id="landmark"
            className="registration__input"
            onChange={handleAddress}
            value={registrationData.addreess.landmark}
            required
          />
        </div>

        <div>
          <label htmlFor="area" className="registration__label">Area</label>
          <input
            type="text"
            name="area"
            id="area"
            className="registration__input"
            onChange={handleAddress}
            value={registrationData.addreess.area}
            required
          />
        </div>
        <div>
          <label htmlFor="state">Select State</label>
          <select
            id="state"
            name="state"
            onChange={handleChange}
            className="registration__input"
            value={registrationData.addreess.state}
          >
            {stateArray}
          </select>
        </div>

        <div>
          <label htmlFor="city" className="registration__label">City</label>
          <input
            type="text"
            name="city"
            id="city"
            className="registration__input"
            onChange={handleAddress}
            value={registrationData.addreess.city}
            required
          />
        </div>


        <div>
          <label htmlFor="pincode" className="registration__label">Pincode</label>
          <input
            type="number"
            name="pincode"
            id="pincode"
            className="registration__input"
            onChange={handleAddress}
            value={registrationData.addreess.pincode}
            required
          />
          {registrationErrors.pincode && <small className="error--message">{registrationErrors.pincode}</small>}
        </div>
        <div className="grid--column--extended"><button type="submit" className="registration__btn btn--submit">Submit</button></div>
      </form>
      <Footer />
    </div>
  )
}