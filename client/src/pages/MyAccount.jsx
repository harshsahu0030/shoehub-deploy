import { Link, useNavigate, useParams } from "react-router-dom";
import LoginSignup from "../components/LoginSignup";
import { myAccount } from "../data/myAccount";
import Address from "../components/Address";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../app/actions/userAction";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { CLEAR_ERRORS, CLEAR_MESSAGES } from "../app/constants/userConstant";

const MyAccount = () => {
  const { pathname } = useParams();
  const navigate = useNavigate();

  //redux
  const dispatch = useDispatch();
  const { isAuthenticated, loading, message, error } = useSelector(
    (state) => state.user
  );

  //functions
  const handleLogout = async () => {
    await dispatch(logoutUserAction());
    navigate("/");
  };

  //useEffect
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: CLEAR_MESSAGES });
    }
    if (error) {
      toast.error(message);
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [message, error, dispatch, navigate]);

  return (
    myAccount &&
    !loading && (
      <div className="myaccount_container">
        <div className="wrapper">
          {!isAuthenticated ? (
            <div className="section_login_signup">
              <LoginSignup />
            </div>
          ) : (
            <>
              <div className="account_setting">
                <ul>
                  {myAccount.navbar.map((item, i) => (
                    <li
                      className={pathname === item.name ? "active" : ""}
                      key={i}
                    >
                      <Link to={item.url}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {pathname === "dashboard" && (
                <div className="dashboard">
                  <p>
                    Hello <b>harsh0030</b> (not <b>harsh0030</b>?{" "}
                    <Link
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      Log out
                    </Link>
                    )
                  </p>
                  <p>
                    From your account dashboard you can view your{" "}
                    <Link to={"/my-account/recent-orders"}>recent orders</Link>,
                    manage your{" "}
                    <Link to={"/my-account/address"}>
                      shipping and billing addresses
                    </Link>
                    , and &nbsp;
                    <Link to={"/my-account/account"}>
                      edit your password and account details
                    </Link>
                    .
                  </p>
                </div>
              )}

              {pathname === "address" && <Address />}

              {pathname === "account" && (
                <div className="section_account_details"></div>
              )}
            </>
          )}
        </div>
      </div>
    )
  );
};

export default MyAccount;
