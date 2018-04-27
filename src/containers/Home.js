import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MenuItem, DropdownButton, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { updateCategories, setCategory } from '../actions/categoryActions';
import { updateSortParam } from '../actions/postActions';
import Header from '../components/Header';
import NavBar from '../containers/NavBar';
import PostList from './PostList';
import CreatePostModal from '../containers/CreatePostModal';

class Home extends Component {
  state = {
    show: false
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


  toggleCreateModal = () => {
    this.setState({
      show: !this.state.show
    });
  }

  fetchCategories = () => {
    const { addCategories } = this.props;
    addCategories();
  };

  render() {
    const { sortBy } = this.props;
    const { show } = this.state;
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
          <Button bsStyle="primary" onClick={this.toggleCreateModal}>
            Create Post
          </Button>
          <hr />
          <PostList />
        </div>

        {show === false || <CreatePostModal show close={this.toggleCreateModal} />}
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
  posts: state.posts,
  sortBy: state.posts.sortBy
});

const mapDispatchToProps = dispatch => ({
  addCategories: categories => dispatch(updateCategories(categories)),
  sortPostsBy: sortBy => dispatch(updateSortParam(sortBy)),
  changeCategory: category => dispatch(setCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
