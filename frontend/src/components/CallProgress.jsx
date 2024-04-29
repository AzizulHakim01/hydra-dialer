import { Container, Step } from "semantic-ui-react"

const CallProgress = () => {
    return (
        <Container >
<Step.Group fluid>
    <Step icon="phone" title="Ringing" description="+1 929 462 7084" completed/>
    <Step icon="cogs" title="In progress" description="User waiting in Queue" active/>
    <Step icon="headphones" title="Answered" description="Answered By John" disabled/>
    <Step icon="times" title="Hang Up" description="Missed Call" />
</Step.Group>
        </Container>
    )
}

export default CallProgress