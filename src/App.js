import "./App.css";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
import { useEffect, useState } from "react";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState();
  const [value, setValue] = useState("random");
  const [title, setTitle] = useState("name");

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(url);
    const data = await response.json();

    const person = data.results[0];

    const { first, last } = person.name;
    const { email, phone } = person;
    const { password } = person.login;
    const {
      street: { number, name },
    } = person.location;

    const { large: image } = person.picture;
     
    const {age} = person.dob;

    const newPerson = {
      email,
      phone,
      password,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
      image,
      age,
    };
    setPerson(newPerson);
    setTitle("name");
    setValue(newPerson.name);
    setLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleValue = (e) => {
    if (e.target.classList.contains("icon-btn")) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  return (
    <main>
      <div className="bcg"></div>
      <div className="container">
        <img src={(person && person.image) || (defaultImage)} alt="" />
        <div className="description">
          <p>My {title} is</p>
          <h2>{value}</h2>
          <div className="icons">
            <button
              className="icon-btn"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon-btn"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button
              className="icon-btn"
              data-label="age"
              onMouseOver={handleValue}
            >
              <FaCalendarTimes />
            </button>
            <button
              className="icon-btn"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon-btn"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon-btn"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className="random-user" onClick={fetchData}>{loading ? 'loading...' : 'Random user'}</button>
        </div>
      </div>
    </main>
  );
}

export default App;
