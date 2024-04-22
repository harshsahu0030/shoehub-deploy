import Pagination from "@mui/material/Pagination";
import propTypes from "prop-types";

const PaginationCom = ({ products, resultPerPage, page, setPage }) => {
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
  setPage: propTypes.func,
  resultPerPage: propTypes.string,
};

export default PaginationCom;
