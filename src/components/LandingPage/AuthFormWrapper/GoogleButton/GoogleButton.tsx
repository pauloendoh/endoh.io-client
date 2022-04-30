import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter";
import React, { useState } from "react";
import S from "./Googlebutton.styles";
// require("dotenv").config();

const GoogleButton = () => {
  const [isSubmitting, setSubmitting] = useState(false);

  const handleGoogleSignIn = () => {
    setSubmitting(true);

    // Authenticate using via passport api in the backend
    // Open Twitter login page
    window.open(import.meta.env.VITE_API_URL + "auth/google", "_self");
    // window.open(process.env.REACT_APP_API_URL + "auth/google", "_self");
  };

  return (
    <S.RootButton
      onClick={handleGoogleSignIn}
      fullWidth
      disabled={isSubmitting}
    >
      <FlexVCenter>
        <img
          src="/static/images/google.svg"
          alt="Google button"
          style={{
            height: "1.875rem",
            filter:
              "invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(101%) contrast(102%)",
          }}
        />
        {/* <FontAwesomeIcon className="fab fa-google"/> */}
        <S.TextWrapper>Enter with Google</S.TextWrapper>
      </FlexVCenter>
    </S.RootButton>
  );
};

export default GoogleButton;
