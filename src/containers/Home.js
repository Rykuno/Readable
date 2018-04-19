import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCategories, updateSortParam, setCategory } from '../actions/infoActions';
import * as ReadableAPI from '../utils/readableAPI';
import { MenuItem, DropdownButton, Button } from 'react-bootstrap';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import PostList from './PostList';

class Home extends Component {
  componentDidMount() {
    this.fetchCategories();
    if (this.props.match.params.category) {
      this.props.setCategory(this.props.match.params.category);
    }
  }

  fetchCategories = () => {
    ReadableAPI.getAllCategories().then(data => {
      const { addCategories } = this.props;
      addCategories(data);
    });
  };

  onSubmit = e => {
    const { sortPostsBy } = this.props;
    sortPostsBy(e);
  };

  render() {
    const { sortBy } = this.props;
    return (
      <div className="App">
        <Header />
        <NavBar />
        <div className="container">
          <DropdownButton
            pullRight={false}
            className="drop-down-menu"
            onSelect={this.onSubmit}
            title="Sort By"
          >
            <MenuItem active={sortBy === 'mostRecent'} eventKey="mostRecent">
              Most Recent
            </MenuItem>
            <MenuItem active={sortBy === 'votes'} eventKey="votes">
              Votes
            </MenuItem>
          </DropdownButton>
          <Button bsStyle="primary">Create Post</Button>
          <hr />
          <PostList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  info: state.info,
  sortBy: state.info.sortBy
});

const mapDispatchToProps = dispatch => ({
  addCategories: categories => dispatch(updateCategories(categories)),
  sortPostsBy: sortBy => dispatch(updateSortParam(sortBy)),
  setCategory: category => dispatch(setCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
