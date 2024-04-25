import axios from "axios";
import Login from "../components/Login";
import {useImmer} from 'use-immer'

function Homepages() {
  const [user, setUser] = useImmer({
    username:"",
    mobileNumber:""
  });
  
  async function sendSmsCode(){
    console.log('Sending SMS');
    await axios.post('/login',{
      to: user.mobileNumber,
      username: user.username,
      channel:'sms'
    })
  }

  return (
    <div>
        <Login
  user={user} // pass the user object or its properties as needed
  setUser={setUser} // pass the setUser function
  sendSmsCode={sendSmsCode}  // pass a function that sends an sms code
/>

    </div>
  )
}

export default Homepages