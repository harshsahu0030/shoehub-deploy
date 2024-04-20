import { IoIosArrowRoundForward } from "react-icons/io";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

const Section_heading = ({ heading, highlighted, description, url }) => {
  return (
    <div className="section_heading_container">
      <div className="left">
        <h3>
          {heading} <span>{highlighted}</span>
        </h3>
        <span>{description}</span>
      </div>
      <div className="right">
        <Link to={url}>
          View All <IoIosArrowRoundForward />
        </Link>
      </div>
    </div>
  );
};

Section_heading.propTypes = {
  heading: propTypes.string,
  highlighted: propTypes.string,
  description: propTypes.string,
  url: propTypes.string,
};

export default Section_heading;
