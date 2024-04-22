import Pagination from "@mui/material/Pagination";
import propTypes from "prop-types";

const PaginationCom = ({ products, resultPerPage, setPage, page }) => {
  return (
    <Pagination
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      defaultPage={page}
      count={Math.ceil(products / resultPerPage)}
      onChange={(e, value) => setPage(value)}
      variant="outlined"
      color="primary"
    />
  );
};

PaginationCom.propTypes = {
  products: propTypes.number,
  page: propTypes.number,
  resultPerPage: propTypes.string,
  setPage: propTypes.func,
};

export default PaginationCom;
