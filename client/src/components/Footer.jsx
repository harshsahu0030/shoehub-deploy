import { MdOutlineEmail } from "react-icons/md";
import { footer_data } from "../data/footer";
import React from "react";
import { categories } from "../data/category";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    footer_data && (
      <div className="footer_container">
        <div className="subscription_box">
          <div className="box">
            <div className="left">
              <div className="top">
                <h4>{footer_data.subscribe.subHeading}</h4>
                <h3>{footer_data.subscribe.heading}.</h3>
              </div>
              <div className="center">{footer_data.subscribe.desc}</div>
              <div className="bottom">
                <MdOutlineEmail />
                <input type="text" placeholder="Your email address" />
                <button>{footer_data.subscribe.button}</button>
              </div>
            </div>
            <div className="right">
              <img src={footer_data.subscribe.imgUrl} alt="coupen" />
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="features">
            {footer_data.features.map((item, i) => (
              <div key={i}>
                <span className="left">{React.createElement(item.icon)}</span>
                <span className="right">{item.desc}</span>
              </div>
            ))}
          </div>

          <hr />

          <div className="footer_categories">
            {categories &&
              categories.map((cat, i) => (
                <div className="category" key={i}>
                  <h4>{cat.gender} </h4>
                  <ul>
                    {cat.types &&
                      cat.types.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              ))}
          </div>

          <div className="footer_social">
            <div className="left">
              <div className="contact">
                <Link to={footer_data.contact.url}>
                  {React.createElement(footer_data.contact.icon)}
                </Link>
                <div>
                  <span>{footer_data.contact.number}</span>
                  <span>{footer_data.working}</span>
                </div>
              </div>
            </div>
            <div className="right">
              {footer_data.social.map((item, i) => (
                <Link key={i} to={item.url}>
                  {React.createElement(item.icon)}
                </Link>
              ))}
            </div>
          </div>

          <hr />

          <div className="end">
            <div className="left">
              <span>{footer_data.copyRights}</span>
            </div>
            <div className="right">
              <ul>
                {footer_data.policies.map((policy, i) => (
                  <li key={i}>
                    <Link to={policy.url}>{policy.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer_navigations">
            <ul>
              {footer_data.navigations.map((item, i) => (
                <li key={i} onClick={() => navigate(`${item.url}`)}>
                  {React.createElement(item.icon)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default Footer;
