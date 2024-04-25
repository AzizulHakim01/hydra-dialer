import React from 'react';
import { Grid, Header, Segment, Form, Button } from 'semantic-ui-react';

function Login({
  user: { username, mobileNumber}, setUser, sendSmsCode
}) {
  function populateFilds(event, data) {
    setUser((draft) => {
      draft[data.name] = data.value;
    });
  }

  return (
    <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh' }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Login into your account:
        </Header>
        <Form>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='UserName'
              value={username}
              onChange={(event, data) => populateFilds(event, data)}
              name='username'
            />
            <Form.Input
              fluid
              icon='mobile alternate'
              iconPosition='left'
              placeholder='Mobile number'
              value={mobileNumber}
              onChange={(event, data) => populateFilds(event, data)}
              name='mobileNumber'
            />
           
            <Button
              color='teal'
              fluid
              size='large'
              onClick={sendSmsCode}
            >
             Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default Login;