import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import propTypes from "prop-types";

const PaginationCom = ({ products, resultPerPage, setPage }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(products / resultPerPage)}
        onChange={(e) => setPage(e.target.innerText)}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
};

PaginationCom.propTypes = {
  products: propTypes.number,
  resultPerPage: propTypes.number,
  setPage: propTypes.func,
};

export default PaginationCom;
