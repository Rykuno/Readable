import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navbar, MenuItem, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { setCategory } from '../actions/infoActions';

class NavBar extends Component {
  populateCategories = () => {
    const { categories } = this.props;    
    const categoryList = categories.map(obj => (
      <MenuItem href={`/r/${obj.name}`} key={obj.path}>
        {obj.name}
      </MenuItem>
    ));
    categoryList.unshift(<MenuItem key={3.2} divider />);
    categoryList.unshift(<MenuItem href="/" key={3.3}>All</MenuItem>);
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
          <NavItem key={1} href="/about">
            About
          </NavItem>
          <NavDropdown key={3} title="Categories" id="basic-nav-dropdown">
            {this.populateCategories()}
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string
  })).isRequired
};

const mapStateToProps = state => ({
  categories: state.info.categories
});

const mapDispatchToProps = dispatch => ({
  changeCategory: category => dispatch(setCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
