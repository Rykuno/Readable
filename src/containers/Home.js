import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MenuItem, DropdownButton, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { updateCategories, updateSortParam, setCategory } from '../actions/infoActions';
import * as ReadableAPI from '../utils/readableAPI';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import PostList from './PostList';
import CreatePostModal from '../components/CreatePostModal';

class Home extends Component {
  state = {
    showCreate: false
  };

  componentDidMount() {
    this.fetchCategories();
    const { changeCategory } = this.props;
    const { category } = this.props.match.params;
    if (category) {
      changeCategory(category);
    }
  }

  onSubmit = e => {
    const { sortPostsBy } = this.props;
    sortPostsBy(e);
  };

  closeCreateModal = () => {
    this.setState({
      showCreate: false
    });
  };

  showCreateModal = () => {
    this.setState({
      showCreate: true
    });
  };

  fetchCategories = () => {
    const { addCategories } = this.props;
    addCategories();
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
            id="categoriesDropDown"
          >
            <MenuItem active={sortBy === 'mostRecent'} eventKey="mostRecent">
              Most Recent
            </MenuItem>
            <MenuItem active={sortBy === 'votes'} eventKey="votes">
              Votes
            </MenuItem>
          </DropdownButton>
          <Button bsStyle="primary" onClick={this.showCreateModal}>
            Create Post
          </Button>
          <hr />
          <PostList />
        </div>

        {this.state.showCreate === false || <CreatePostModal show close={this.closeCreateModal} />}
      </div>
    );
  }
}

Home.propTypes = {
  changeCategory: PropTypes.func.isRequired,
  sortPostsBy: PropTypes.func.isRequired,
  addCategories: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.node
    }).isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  info: state.info,
  sortBy: state.info.sortBy
});

const mapDispatchToProps = dispatch => ({
  addCategories: categories => dispatch(updateCategories(categories)),
  sortPostsBy: sortBy => dispatch(updateSortParam(sortBy)),
  changeCategory: category => dispatch(setCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
