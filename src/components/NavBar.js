import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, MenuItem, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { setCategory } from '../actions/infoActions';

class NavBar extends Component {
  populateCategories = () => {
    const { categories, changeCategory } = this.props;
    const categoryList = categories.map(obj => (
      <MenuItem href={`/${obj.name}`} eventKey={3.1}>
        {obj.name}
      </MenuItem>
    ));
    categoryList.unshift(<MenuItem divider />);
    categoryList.unshift(
      <MenuItem href="/" eventKey={3.1}>
        All
      </MenuItem>);
    return categoryList;
  };

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Readable</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">
            About
          </NavItem>
          <NavItem eventKey={2} href="#">
            Link
          </NavItem>
          <NavDropdown eventKey={3} title="Categories" id="basic-nav-dropdown">
            {this.populateCategories()}
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.info.categories
});

const mapDispatchToProps = dispatch => ({
  changeCategory: category => dispatch(setCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
