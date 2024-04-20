import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { navbar } from "../data/navbar";
import { form_data } from "../data/form";

const Address = () => {
  // useState
  const [address, setAddress] = useState({
    name: "",
    phoneNo: "",
    street: "",
    city: "",
    State: "",
    pincode: "",
  });


  //ref
  const addAddressRef = useRef();

  //function
  const handleVisibleAddress = (text) => {
    if (text === "visible") {
      addAddressRef.current.style.opacity = 1;
      addAddressRef.current.style.visibility = "visible";
    } else {
      addAddressRef.current.style.opacity = 0;
      addAddressRef.current.style.visibility = "hidden";
    }
  };

  return (
    <div className="address_container">
      <div className="forward_box_container" ref={addAddressRef}>
        <div className="wrapper" style={{ alignSelf: "center" }}>
          <div className="top">
            <IoCloseSharp onClick={handleVisibleAddress} />
            <h3>Add Address</h3>
            <p>
              The following address will be used on the checkout page by
              default.
            </p>
          </div>
          <form className="bottom">
            <div className="input_single_container">
              <label htmlFor="name">Enter your Name *</label>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                rows={5}
              />
            </div>

            <div className="input_select_container">
              <div>
                <select name="phoneCode">
                  <option value={"+91"}>+91</option>
                  {form_data &&
                    form_data.countriesWithCode
                      .sort((a, b) =>
                        a.code > b.code ? 1 : b.code > a.code ? -1 : 0
                      )
                      .map((item, i) => (
                        <option key={i} value={`+${item.code}`}>
                          {item.code}
                        </option>
                      ))}
                </select>
                <input
                  type="Number"
                  placeholder="Enter phone number"
                  name="phoneNo"
                />
              </div>
            </div>

            <div className="input_single_container">
              <label htmlFor="street">Enter your Street Address *</label>
              <textarea
                type="text"
                placeholder="Enter Street"
                name="street"
                rows={5}
              />
            </div>

            <div className="input_single_container">
              <label htmlFor="city">Enter your City *</label>
              <input
                type="text"
                placeholder="Enter City"
                name="city"
                rows={5}
              />
            </div>

            <div className="input_single_container">
              <label htmlFor="pincode">Enter your Pincode *</label>
              <input
                type="number"
                placeholder="Enter pincode"
                name="pincode"
                rows={5}
              />
            </div>

            <div className="input_select_container">
              <label htmlFor="comment">Select your State *</label>

              <div>
                <select name="" id="" style={{ width: "100%" }}>
                  {navbar && (
                    <>
                      <option>Select your area (Clear All)</option>
                      {Object.entries(navbar.states).map((item) => (
                        <option key={item[0]}>{item[1]}</option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>

            <button type="submit">ADD ADDRESS</button>
          </form>
        </div>
      </div>

      <div>
        <h4>SHIPPING ADDRESS</h4>
        <button onClick={() => handleVisibleAddress("visible")}>Edit</button>

        <div className="pre_address">
          <span>HarsH Sahu</span>
          <span>+91 1234567890</span>
          <span>H.123, Anderi Gali</span>
          <span>Sunsaan Maholla</span>
          <span>Indore, Madhya Pradesh</span>
          <span>45799</span>
        </div>
      </div>
    </div>
  );
};

export default Address;
