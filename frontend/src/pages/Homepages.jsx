import Login from "../components/Login";
import { useImmer } from 'use-immer';
import instance from "../utils/Axios";

function Homepages() {
  const [user, setUser] = useImmer({
    username: "",
    mobileNumber: ""
  });

  async function sendSmsCode() {
    console.log('Sending SMS');
    try {
      const response = await instance.post('/login', {
        to: user.mobileNumber,
        username: user.username,
        channel: 'sms'
      });
      console.log('SMS sent:', response.data); // Log response from the server
      // Handle response data as needed
    } catch (error) {
      console.error('Error sending SMS:', error);
      // Handle error, show error message to the user, etc.
    }
  }

  return (
    <div>
      <Login
        user={user} // pass the user object or its properties as needed
        setUser={setUser} // pass the setUser function
        sendSmsCode={sendSmsCode} // pass a function that sends an sms code
      />
    </div>
  );
}

export default Homepages;
