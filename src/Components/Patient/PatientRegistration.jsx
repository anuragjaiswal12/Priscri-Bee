import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import "../../css/Registration.css"
import { Footer } from "../../Utils/Footer";
import { indianStates } from "../../Utils/Data";

export default function PatientRegistration() {
  // main State of an application
  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    gender: "male",
    bloodGroup: "",
    hypertension: false,
    isDybitic: false,
    allergies: [],
    addreess: {
      houseNo: "",
      street: "",
      landmark: "",
      area: "",
      city: "",
      state: "",
      pincode: ""
    },
    email: "",
    phone: "",
    password: "",
  })

  // State for Handeling and Stroing Errors
  const [registrationErrors, setRegistrationErrors] = useState({});
  
  // TempSatate for preprossesing of Cetain Fields
  const [tempData, setTempData] = useState({
    tempAlllergies: "",
    tempDate: { startDate: new Date() },
    confirmPassword:""
  })

  // indainSatate array ements into jsx used for select State of Country
  const stateArray = indianStates.map(item => <option value={item} key={item}>{item}</option>)

  // Funtion to add get jsx form allergies array registrationData
  const allergiesArray = registrationData.allergies.map(item =>
    (<span className="array__elements" key={item}>
      {item} <i className="fa-solid fa-circle-xmark" onClick={() => removeArrayItem(item)}></i>
    </span>))

// Function to push elements into allergies array of registrationData
const handleAddAllergy = (allergy) => {
  if(allergy){
    setRegistrationData(prevState => {
      return {
        ...prevState,
        allergies: [...prevState.allergies, allergy]
      }
    })
    setTempData(prevData => ({ ...prevData, tempAlllergies: "" }))
  }
  else{
    alert("Make Sure You are entering something")
  }
}
  // Funtion to remove elements allergies array registrationData
  const removeArrayItem = (item) => setRegistrationData(prevData => ({ ...prevData, allergies: prevData.allergies.filter(currItem => currItem != item) }))

  //Funtion to Update state of data on onChange 
  function handleTempData(event) {
    const { name, value } = event.target
    setTempData(prevData => ({
      ...prevData, [name]: value
    }))
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

  // Handleing Form onSubmit and Validiting
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
  
    if (registrationData.allergies.length < 1) {
      errors.allergies = 'Enter at least one allergies'
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
            className="registration__input"
            value={registrationData.firstName}
            onChange={handleChange}
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
            required
          />
        </div>

        <div className="registration__selectable__fileds">
          <div >
            <span className="registration__gender">Gender</span>
            <input
              id="male"
              type="radio"
              name="gender"
              value="male"
              checked={registrationData.gender === "male"}
              onChange={handleChange}
            />
            <label htmlFor="male">Male</label>
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
            <label htmlFor="isDybitic">Are you Dybitic ?</label>
            <input
              type="checkbox"
              id="isDybitic"
              checked={registrationData.isDybitic}
              onChange={handleChange}
              name="isDybitic"
            />
          </div>

          <div className="registration__hypertension">
            <label htmlFor="hypertension">Do You have Hypertension ?</label>
            <input
              type="checkbox"
              id="hypertension"
              checked={registrationData.hypertension}
              onChange={handleChange}
              name="hypertension"
            />
          </div>

        </div>

        <div>
          <label htmlFor="bloodGroup">Select Blood Group</label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            onChange={handleChange}
            className="registration__input"
            required

            value={registrationData.bloodGroup}
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="registration__allergies">
          <label htmlFor="allergies" className="registration__label">Please Enter your allergies (if have any)</label>
          <input
            type="text"
            name="tempAlllergies"
            id="allergies"
            className="registration__input "
            onChange={handleTempData}
            value={tempData.tempAlllergies}
          />
          {registrationErrors.allergies && <small className="error--message">{registrationErrors.allergies}</small>}
          {allergiesArray.length > 0 && <div className="registration__expertise__display grid--column--extended">
            {allergiesArray}
          </div>}
        </div>
        <div className="add-allrgies--btn">
        <button type="button"
            className="registration__btn "
            onClick={() => handleAddAllergy(tempData.tempAlllergies)}>Add allergies</button>
        </div>
        
        <div className="registration__email__patient">
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
          <label htmlFor="phone" className="registration__label">Phone Number</label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="registration__input"
            onChange={handleChange}
            value={registrationData.phone}
            required
          />
          {registrationErrors.phone && <small className="error--message">{registrationErrors.phone}</small>}

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

          <label htmlFor="confirmPassword" className="registration__label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirm_password"
            className="registration__input"
            onChange={handleTempData}
            required
          />
          {registrationErrors.confirmPassword && <small className="error--message">{registrationErrors.confirmPassword}</small>}
        </div>
      
        {/* Address */}
        <div className="registration____details grid--column--extended registration--address--details"><h2>Address Details :</h2></div>
        <div>
          <label htmlFor="houseNo" className="registration__label">House No</label>
          <input
            type="text"
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
            type="numberv"
            name="pincode"
            id="pincode"
            className="registration__input"
            onChange={handleAddress}
            value={registrationData.addreess.pincode}
            required
          />
        </div>
        <div className="grid--column--extended">
          <button 
            type ="submit" 
            className="registration__btn btn--submit">
              Submit
          </button>
        </div>
      </form>
      <Footer/>
    </div>
  )
}
