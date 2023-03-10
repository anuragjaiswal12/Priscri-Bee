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
    gender: "",
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

  // Temp State for handleing temp values 
  // after processing values get stored in registrationData state
  const stateArray = indianStates.map(item => <option value={item} key={item}>{item}</option>)

  const [tempData, setTempData] = useState({
    tempAlllergies: "",
    tempDate: { startDate: new Date() }
  })

  function handleTempData(event) {
    const { name, value } = event.target
    setTempData(prevData => ({
      ...prevData, [name]: value
    }))
  }

  // Function to push allergies array of registrationData
  const handleAddAllergy = (allergy) => {
    setRegistrationData(prevState => {
      return {
        ...prevState,
        allergies: [...prevState.allergies, allergy]
      }
    })
    setTempData(prevData => ({ ...prevData, tempAlllergies: "" }))
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
  // Handleing Form onSubmit 
  function handleSubmit(e){
    e.preventDefault();

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

        <div className="registration__allergies grid--column--extended">
          <label htmlFor="allergies" className="registration__label">Do You Have any allergies ? If Yes then menction</label>
          <input
            type="text"
            name="tempAlllergies"
            id="allergies"
            className="registration__input input--size--limit"
            onChange={handleTempData}
            value={tempData.tempAlllergies}
            required
          />
          <button type="button"
            className="registration__btn"
            onClick={() => handleAddAllergy(tempData.tempAlllergies)}>Add allergies</button>
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

        </div>
        <div>

          <label htmlFor="confirm_password" className="registration__label">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            className="registration__input"
            required
          />
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
            type="text"
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
            className="registration__btn btn--submit" 
            onClick={()=>console.log("submmmited")}>
              Submit
          </button>
        </div>
      </form>
      <Footer/>
    </div>
  )
}
