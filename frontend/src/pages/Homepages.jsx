import Login from "../components/Login";
import { useImmer } from "use-immer";
import instance from "../utils/Axios";
import { message } from "antd";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import CallCenter from "../components/CallCenter";

function Homepages() {
  const [storedToken, setStoredToken] = useLocalStorage("token", null);
  const [user, setUser] = useImmer({
    username: "",
    mobileNumber: "",
    verificationCode: "",
    verificationSent: false,
  });

  async function sendSmsCode() {
    message.info("Sending SMS");
    try {
      const response = await instance.post("/login", {
        to: user.mobileNumber,
        username: user.username,
        channel: "sms",
      });
      setUser((draft) => {
        draft.verificationSent = true;
      });
      message.success("SMS sent:", response.data); // Log response from the server
      // Handle response data as needed
    } catch (error) {
      message.error("Error sending SMS:", error);
      // Handle error, show error message to the user, etc.
    }
  }
  async function sentVerificationCode() {
    message.info("Sending Verification");
    const res = await instance.post("/verify", {
      to: user.mobileNumber,
      code: user.verificationCode,
      username: user.username,
    });
    console.log("recieved token", res.data.token);
    setStoredToken(res.data.token);
  }

  return (
    <>
      {!storedToken ? (
        <CallCenter/>
      ) : (
        <div>
          <Login
            user={user} // pass the user object or its properties as needed
            setUser={setUser} // pass the setUser function
            sendSmsCode={sendSmsCode} // pass a function that sends an sms code
            sentVerificationCode={sentVerificationCode}
          />
        </div>
      )}
    </>
  );
}

export default Homepages;
