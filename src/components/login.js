import axios from "axios";
import { useState } from "react";
import "./login.css";

function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(false);
  const [movieName, setMovieName] = useState("RRR");
  const [checked, setChecked] = useState([]);
  const rrrCheckList = ["1", "2", "3", "4", "5"];
  const bahubaliCheckList = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const userHandler = (event) => {
    console.log(event.target.value);
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };

  const movieHandler = (event) => {
    console.log(event.target.value);
    setMovieName(event.target.value);
  };

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const loginData = () => {
    axios
      .post("http://localhost:8083/login", {
        userName: userName,
        password: password,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data === "SUCCESS") {
          setPassword("");
          setUsername("");
          window.alert("Login Successful");
          setFlag(true);
        } else {
          setPassword("");
          setUsername("");
          window.alert("Invalid Credentials");
        }
      });
  };

  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";
  const saveData = () => {
    axios
      .post("http://localhost:8083/save", {
        userName: "akhila",
        selectedSeats: [...checked],
      })
      .then(function (response) {
        console.log(response.status);
        if (response.data === "SUCCESS") {
          window.alert("Booking Successful");
        } else {
          window.alert("Booking Failed, Try again later");
        }
      });
  };

  return !flag ? (
    <>
      <h2>Login Page</h2>
      <br />
      <div class="login">
        <form id="login">
          <label>
            <b>User Name </b>
          </label>
          <input
            type="text"
            name="Uname"
            id="Uname"
            value={userName}
            placeholder="Username"
            onChange={userHandler}
          ></input>
          <br></br>
          <label>
            <b>Password</b>
          </label>
          <input
            type="Password"
            name="Pass"
            id="Pass"
            placeholder="Password"
            value={password}
            onChange={passwordHandler}
          />
          <br></br>
          <br></br>
          <input
            type="button"
            name="log"
            id="log"
            value="Log In"
            onClick={loginData}
          />
        </form>
      </div>
    </>
  ) : (
    <>
      <h2>Login Successful, Select Movie</h2>
      <div class="login">
        <form id="login">
          <label>
            <b>Select Movie</b>
          </label>
          <br></br>
          <select name="cars" id="cars" onChange={movieHandler}>
            <option value="RRR">RRR</option>
            <option value="Baahubali">Baahubali</option>
            <option value="Robo">Robo</option>
          </select>
          {movieName === "RRR" ? (
            <>
              <h2>RRR</h2>
              {rrrCheckList.map((item, index) => (
                <div key={index}>
                  <input value={item} type="checkbox" onChange={handleCheck} />
                  <span>{item}</span>
                </div>
              ))}
            </>
          ) : movieName === "Baahubali" ? (
            <>
              {" "}
              <h2>Baahubali</h2>
              {bahubaliCheckList.map((item, index) => (
                <div key={index}>
                  <input value={item} type="checkbox" onChange={handleCheck} />
                  <span>{item}</span>
                </div>
              ))}
            </>
          ) : (
            <>
              <h2>Robo</h2>
              <h2>No Bookings available</h2>
            </>
          )}
          <div>{`Seats selected are: ${checkedItems}`}</div>
          <br></br>
          <input
            type="button"
            name="save"
            id="save"
            value="save"
            onClick={saveData}
          />
        </form>
      </div>
    </>
  );
}

export default Login;
