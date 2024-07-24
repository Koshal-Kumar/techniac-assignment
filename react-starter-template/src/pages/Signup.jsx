import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./form.css";
import Spinner from "../Components/Spinner.jsx";

const Signup = () => {
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [BirthDate, setBirthDate] = useState("");
  const [Password, setPassword] = useState("");
  const [Mobile, setMobile] = useState("");
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateFirstname = (value) => {
    if (!value.trim()) return "First Name is required";
    if (!/^[A-Za-z]+$/.test(value)) return "First Name must contain only letters";
    return "";
  };

  const validateLastname = (value) => {
    if (!value.trim()) return "Last Name is required";
    if (!/^[A-Za-z]+$/.test(value)) return "Last Name must contain only letters";
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Email address is invalid";
    return "";
  };

  const validatePassword = (value) => {
    if (!value.trim()) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters long";
    // Password regex: At least one uppercase letter, one lowercase letter, one digit, and one special character
    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}/.test(value)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character";
    }
    return "";
  };

  const validateBirthDate = (value) => {
    if (!value.trim()) return "Birth Date is required";
    if (new Date(value) >= new Date()) return "Birth Date must be in the past";
    return "";
  };

  const validateMobile = (value) => {
    if (!value.trim()) return "Mobile number is required";
    if (!/^\d{10}$/.test(value)) return "Mobile number must be exactly 10 digits";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    switch (name) {
      case "Firstname":
        setFirstname(value);
        errorMessage = validateFirstname(value);
        break;
      case "Lastname":
        setLastname(value);
        errorMessage = validateLastname(value);
        break;
      case "email":
        setEmail(value);
        errorMessage = validateEmail(value);
        break;
      case "Password":
        setPassword(value);
        errorMessage = validatePassword(value);
        break;
      case "BirthDate":
        setBirthDate(value);
        errorMessage = validateBirthDate(value);
        break;
      case "Mobile":
        setMobile(value);
        errorMessage = validateMobile(value);
        break;
      default:
        break;
    }

    setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result.split(",")[1]); // Base64 string
        setProfilePicturePreview(reader.result); // Full Data URL for preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some(error => error)) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/signup`, {
        Firstname,
        Lastname,
        email,
        profilePicture,
        BirthDate,
        Mobile,
        Password,
      });
      if (res.data.success) {
        setLoader(true);
        setTimeout(() => {
          toast.success(res.data.message);
          navigate("/login");
          setLoader(false);
        }, 1500);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <>
      {loader && (
        <Spinner loader={loader} style={{ width: "100%", height: "100%" }} />
      )}
      <div className="background-wrapper">
        <img src="153685422_626f4775-3aec-427d-b099-016eaaa82613.jpg" alt="background poster" />
      </div>
      
      <div className="signup-wrapper-content">
        <div className="signup-body-wrapper d-flex justify-content-center align-items-center w-100" style={{ height: "100vh" }}>
          <div className="signup-container" style={{width:"450px"}}>
            <div className="signup">
              <div className="signup-box">
                <h3>Signup Page</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ height: "100px", width: "100px", border: "1px solid grey", background:"#f2f2f2", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", overflow: "hidden" }}>
                      {profilePicturePreview && (
                        <img src={profilePicturePreview} alt="Profile Preview" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                      )}
                      <h1 style={{color: "grey"}}>+</h1>
                      <input type="file" accept="image/*" onChange={handleImage} style={{ border: "none", position: "absolute", height: "100%", width: "100%", opacity: 0, cursor: "pointer" }} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="Firstname"
                      className="form-control no-focus-outline"
                      placeholder="First Name"
                      value={Firstname}
                      onChange={handleChange}
                    />
                    <span className="message-box" style={{ color: "red" ,fontSize:"10px" ,maxWidth:"350px" }}>{errors.Firstname}</span>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="Lastname"
                      className="form-control no-focus-outline"
                      placeholder="Last Name"
                      value={Lastname}
                      onChange={handleChange}
                    />
                    <span className="message-box" style={{ color: "red" ,fontSize:"10px" ,maxWidth:"350px" }}>{errors.Lastname}</span>
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control no-focus-outline"
                      placeholder="Email"
                      value={email}
                      onChange={handleChange}
                    />
                    <span className="message-box" style={{ color: "red" ,fontSize:"10px" ,maxWidth:"350px" }}>{errors.email}</span>
                  </div>
                  <div className="mb-3">
                    <input
                      type="date"
                      name="BirthDate"
                      className="form-control no-focus-outline"
                      placeholder="Birth Date"
                      value={BirthDate}
                      onChange={handleChange}
                    />
                    <span className="message-box" style={{ color: "red" ,fontSize:"10px" ,maxWidth:"350px" }}>{errors.BirthDate}</span>
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      name="Mobile"
                      className="form-control no-focus-outline"
                      placeholder="Phone"
                      value={Mobile}
                      onChange={handleChange}
                    />
                    <span className="message-box" style={{ color: "red" ,fontSize:"10px" ,maxWidth:"350px" }}>{errors.Mobile}</span>
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      name="Password"
                      className="form-control no-focus-outline"
                      placeholder="Password"
                      value={Password}
                      onChange={handleChange}
                    />
                    <span className="message-box" style={{ color: "red" ,fontSize:"10px" ,maxWidth:"350px" }}>{errors.Password}</span>
                  </div>
                  <button type="submit" className="btn btn-success">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
