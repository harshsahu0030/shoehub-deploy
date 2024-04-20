import { Link } from "react-router-dom";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { IoChevronDownSharp } from "react-icons/io5";
import { headerData } from "../data/header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  //states
  const [language, setLanguage] = useState(
    headerData && {
      name: headerData.dropdownLanguage[0].name,
      value: headerData.dropdownLanguage[1].value,
    }
  );

  const [curreny, setCurreny] = useState(
    headerData && headerData.dropdownCurrency[0]
  );

  return (
    headerData && (
      <div className="header_container">
        <div className="left">
          <ul>
            {headerData.headerLinks.map((item) => (
              <li key={item.url} onClick={() => navigate(item.url)}>
                <Link to={item.url}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="center">
          <ul>
            <li>
              <AiOutlineSafetyCertificate />
              {headerData.content}
            </li>
            <li>
              {headerData.contact.text}
              <span>{headerData.contact.number}</span>
            </li>
          </ul>
        </div>

        <div className="right">
          <ul>
            {
              <li value={language.value}>
                {language.name}
                <IoChevronDownSharp />
                <ul className="dropdown">
                  {headerData.dropdownLanguage.map((item, i) => (
                    <li
                      key={i}
                      onClick={() =>
                        setLanguage({
                          name: item.name,
                          value: item.value,
                        })
                      }
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </li>
            }
            {
              <li>
                {curreny}
                <IoChevronDownSharp />
                <ul className="dropdown">
                  {headerData.dropdownCurrency.map((item, i) => (
                    <li key={i} onClick={() => setCurreny(item)}>
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            }
          </ul>
        </div>
      </div>
    )
  );
};

export default Header;
