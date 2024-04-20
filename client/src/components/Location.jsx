import { useRef, useState } from "react";
import { IoChevronDownSharp, IoCloseSharp } from "react-icons/io5";
import { navbar } from "../data/navbar";

const Location = () => {
  const [location, setLocation] = useState({
    name: "Select a Location",
    code: "",
  });

  //ref
  const locationRef = useRef();

  //function
  const handleVisibleLocation = (text) => {
    if (text === "visible") {
      locationRef.current.style.opacity = 1;
      locationRef.current.style.visibility = "visible";
    } else {
      locationRef.current.style.opacity = 0;
      locationRef.current.style.visibility = "hidden";
    }
  };

  const handleLocation = (name, code) => {
    setLocation({
      name,
      code,
    });
    handleVisibleLocation();
  };
  return (
    <>
      <div
        className="location_selector_container"
        onClick={() => handleVisibleLocation("visible")}
      >
        <div>
          <span>Your Location</span>
          <span>{location.name}</span>
        </div>
        <IoChevronDownSharp />
      </div>

      <div className="forward_box_container" ref={locationRef}>
        <div className="wrapper">
          <div className="top">
            <IoCloseSharp onClick={handleVisibleLocation} />
            <h3>Choose your location</h3>
            <p>
              Enter your address and we will specify the offer for your area.
            </p>
          </div>

          <div className="bottom">
            {navbar ? (
              <>
                <ul>
                  <li onClick={() => handleLocation("Select a Location", "")}>
                    Select your area (Clear All)
                  </li>
                  {Object.entries(navbar.states).map((item) => (
                    <li
                      key={item[0]}
                      onClick={() => handleLocation(item[1], item[0])}
                    >
                      {item[1]}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No Location Found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
