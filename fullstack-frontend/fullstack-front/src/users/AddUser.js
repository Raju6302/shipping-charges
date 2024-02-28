import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";

const AddUser = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    fromCity: "Bangalore",
    toCity: "",
    weight: "",
  });

  const [newUser, setNewUser] = useState(null); 
  const [cities, setCities] = useState([]); 

  const { name, mobileNumber, email, fromCity, toCity, weight } = user;

  const onInputChange = (e) => {
    const { name, value } = e.target;

  
  if (name === "name") {
    
    setUser({ ...user, [name]: value.replace(/[^a-zA-Z\s]/g, "") });
  } else if (name === "mobileNumber" || name === "weight") {
    
    setUser({ ...user, [name]: value.replace(/\D/g, "") });
  } else if (name === "email") {
  
    setUser({ ...user, [name]: value.replace(/[^a-zA-Z0-9@._-]/g, "") });
  } else {
    setUser({ ...user, [name]: value });
  }

  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8080/user", user);
    setNewUser(response.data); 
    navigate("/AddUser");
    setUser({
      name: "",
      mobileNumber: "",
      email: "",
      fromCity: "Bangalore",
      toCity: "",
      weight: "",
    })
  };

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    const result = await axios.get("http://localhost:8080/cities");
    setCities(result.data);

    if (result.data.length > 0) {
      setUser({ ...user, toCity: result.data[0].name });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Enter your shipping Details</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Mobile Number"
                name="mobileNumber"
                value={mobileNumber}
                onChange={(e) => onInputChange(e)}
              />
              <label htmlFor="Name" className="form-label">
                E-mail
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your E-mail"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
              <label htmlFor="fromCity" className="form-label">
                From-City
              </label>
              <select
                className="form-select"
                name="fromCity"
                value={fromCity}
                onChange={(e) => onInputChange(e)}
              >
                <option value="Bangalore">Bangalore</option>
              </select>
              <label htmlFor="toCity" className="form-label">
                To-City
              </label>
              <select
                className="form-select"
                name="toCity"
                value={toCity}
                onChange={(e) => onInputChange(e)}
              >
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name} - {city.value}
                  </option>
                ))}
              </select>
              <label htmlFor="Weight" className="form-label">
                Weight
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your weight"
                name="weight"
                value={weight}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
          </form>
        </div>
      </div>

      {newUser && <UserDetails newUser={newUser} />}
    </div>
  );
};

export default AddUser;
