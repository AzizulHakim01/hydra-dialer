import { Container, Image, Menu } from "semantic-ui-react";

const Navbar = () => {
  return (
    <div className="">
      <Menu>
        <Container text>
          <Menu.Item>
            <i className="phone icon"></i>
          </Menu.Item>
          <Menu.Item header>Call Center</Menu.Item>
          <Menu.Item position="right">Ramon Quiles</Menu.Item>
          <Menu.Item position="right">
            <Image avatar src="https://react.semantic-ui.com/images/avatar/large/chris.jpg"/>
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};

export default Navbar;
