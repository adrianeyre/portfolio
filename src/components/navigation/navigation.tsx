import * as React from 'react';
import { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

import './navigation.css';

interface INavigationProps {
    imageName?: string;
    title?: string;
    subTitle?: string;
}

interface INavigationState {
    style: any;
}

class Navigation extends Component<INavigationProps, INavigationState> {
    constructor(props: INavigationProps) {
        super(props);

        this.state = {
            style: {
                'background-image': `url("./images/${props.imageName}")`,
            }
        }
    }

    // public async componentDidMount() {

    // }

    public render() {
        return <Navbar bg="light" expand="lg" fixed="top">
            <Navbar.Brand href="#home">MAIN TITLE</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#image1">Image 1</Nav.Link>
                    <Nav.Link href="#text1">Text 1</Nav.Link>
                    <Nav.Link href="#image2">Image 2</Nav.Link>
                    <Nav.Link href="#text2">Text 2</Nav.Link>
                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    }

    // private dummyHandler = () => console.log('PRESS!');
}

export default Navigation;