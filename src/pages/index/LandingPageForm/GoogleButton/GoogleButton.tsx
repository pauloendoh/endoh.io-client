import React, { useState } from "react";
import FlexVCenter from "../../../../components/shared/Flexboxes/FlexVCenter";
import googleIcon from "../../../../static/images/google-icon-white.png";
import S from "./Googlebutton.styles";
require("dotenv").config();

const GoogleButton = () => {
  const [isSubmitting, setSubmitting] = useState(false);

  const handleGoogleSignIn = () => {
    setSubmitting(true);

    // Authenticate using via passport api in the backend
    // Open Twitter login page
    window.open(process.env.REACT_APP_API_URL + "auth/google", "_self");
  };

  return (
    <S.RootButton
      onClick={handleGoogleSignIn}
      fullWidth
      disabled={isSubmitting}
    >
      <FlexVCenter>
        <img src={googleIcon} height={24} alt="Google button" />
        {/* <FontAwesomeIcon className="fab fa-google"/> */}
        <S.TextWrapper>Enter with Google</S.TextWrapper>
      </FlexVCenter>
    </S.RootButton>
  );
};

export default GoogleButton;
