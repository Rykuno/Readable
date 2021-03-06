import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Post from './Post';
import { updatePosts, updateSortParam } from '../actions/postActions';

class PostList extends Component {
  componentDidMount() {
    const { addPosts } = this.props;
    addPosts();
  }

  sortPosts = () => {
    setTimeout(() => {
      const { sortBy, sortPostsBy } = this.props;
      sortPostsBy(sortBy);
    }, 0);
  };

  populatePosts = () => {
    const { searchCategory } = this.props;
    let { posts } = this.props;

    if (searchCategory) {
      posts = posts.filter(obj => obj.category === searchCategory);
    }

    if (posts.length === 0) {
      return <p>There doesn&#39;t seem to be anything here</p>;
    }

    return posts.map(obj => {
      const {
        id, title, body, timestamp, author, voteScore, category, commentCount
      } = obj;

      return (
        <li key={id}>
          <Post
            title={title}
            body={body}
            voteScore={voteScore}
            id={id}
            timestamp={timestamp}
            author={author}
            category={category}
            commentCount={commentCount}
            resort={this.sortPosts}
          />
        </li>
      );
    });
  };

  render() {
    return (
      <div>
        <ul>{this.populatePosts()}</ul>
      </div>
    );
  }
}

PostList.propTypes = {
  sortBy: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchCategory: PropTypes.string.isRequired,
  sortPostsBy: PropTypes.func.isRequired,
  addPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.posts,
  sortBy: state.posts.sortBy,
  searchCategory: state.categories.searchCategory
});

const mapDispatchToProps = dispatch => ({
  addPosts: posts => dispatch(updatePosts(posts)),
  sortPostsBy: sortBy => dispatch(updateSortParam(sortBy))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
