import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../components/Post';
import * as ReadableAPI from '../utils/readableAPI';
import { updatePosts, votePost, updateSortParam } from '../actions/infoActions';

class PostList extends Component {
  componentDidMount() {
    ReadableAPI.getAllPosts().then(data => {
      const { addPosts } = this.props;
      addPosts(data);
    });
  }

  sortPosts = () => {
    this.props.sortPostsBy(this.props.sortBy);
  };

  populatePosts = () => {
    let { posts, votePost, searchCategory } = this.props;
    if (searchCategory) {
      posts = posts.filter(obj => obj.category === searchCategory);
    }
    return posts.map(obj => {
      const {
        id, title, timestamp, author, voteScore, category, commentCount
      } = obj;
      return (
        <Post
          title={title}
          voteScore={voteScore}
          id={id}
          timestamp={timestamp}
          author={author}
          category={category}
          commentCount={commentCount}
          votePost={(postID, vote) => votePost(postID, vote)}
          resort={this.sortPosts}
        />
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

const mapStateToProps = state => ({
  posts: state.info.posts,
  sortBy: state.info.sortBy,
  searchCategory: state.info.searchCategory
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addPosts: posts => dispatch(updatePosts(posts)),
  votePost: (id, vote) => dispatch(votePost(id, vote)),
  sortPostsBy: sortBy => dispatch(updateSortParam(sortBy))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
