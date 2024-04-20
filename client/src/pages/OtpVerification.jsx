import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { verifiedRegisterUserAction } from "../app/actions/userAction";
import { CLEAR_ERRORS, CLEAR_MESSAGES } from "../app/constants/userConstant";

const OtpVerification = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //states
  const [otpNumber, setOtpNumber] = useState("");

  //redux
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector((state) => state.user);

  const handleRegisterUserVerified = (e) => {
    e.preventDefault();
    dispatch(verifiedRegisterUserAction(id, otpNumber));
  };

  //useEffect
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: CLEAR_MESSAGES });
      navigate("/");
    }
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [dispatch, error, message, navigate]);

  return (
    !loading && (
      <div className="otp_verfication_container">
        <form className="otp_form" onSubmit={handleRegisterUserVerified}>
          <h3>OTP VERIFICATION</h3>

          <div className="input_single_container">
            <label htmlFor="otp">OTP Number *</label>
            <input
              type="number"
              placeholder="Enter otp"
              name="otp"
              max={9999}
              min={0}
              value={otpNumber}
              onChange={(e) => setOtpNumber(e.target.value)}
            />
            <span>Must be of 4 digits</span>
          </div>

          <button type="submit">SUBMIT</button>
          <span>Recent OTP...</span>
        </form>
      </div>
    )
  );
};

export default OtpVerification;
