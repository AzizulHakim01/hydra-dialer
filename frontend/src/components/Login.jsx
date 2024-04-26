import PropTypes from "prop-types"; // Import PropTypes
import { Grid, Header, Segment, Form, Button } from "semantic-ui-react";

function Login({
  user: { username, mobileNumber, verificationCode, verficationSent, sentVerificationCode },
  setUser,
  sendSmsCode,
}) {
  function populateFilds(event, data) {
    setUser((draft) => {
      draft[data.name] = data.value;
    });
  }

  return (
    <Grid textAlign="center" verticalAlign="middle" style={{ height: "100vh" }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Login into your account:
        </Header>
        <Form>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="UserName"
              value={username}
              onChange={(event, data) => populateFilds(event, data)}
              name="username"
            />
            <Form.Input
              fluid
              icon="mobile alternate"
              iconPosition="left"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(event, data) => populateFilds(event, data)}
              name="mobileNumber"
            />
            {verficationSent &&
            <Form.Input
              fluid
              icon="key"
              iconPosition="left"
              placeHolder="Enter Your Code"
              value={verificationCode}
              onChange={(e, data) => populateFilds(e, data)}
              name="verificationCode"
            />}
            <Button color="teal" fluid size="large" onClick={!verficationSent ? sendSmsCode : sentVerificationCode}>
              {verficationSent ? "Login" : "Send Verification code"}
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

// Define PropTypes for Login component
Login.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    mobileNumber: PropTypes.string,
    verificationCode: PropTypes.string,
    verficationSent: PropTypes.bool,
    sentVerificationCode: PropTypes.func,
  }),
  setUser: PropTypes.func.isRequired,
  sendSmsCode: PropTypes.func.isRequired,
};

export default Login;
