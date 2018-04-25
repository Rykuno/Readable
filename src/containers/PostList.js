import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from '../components/Post';
import * as ReadableAPI from '../utils/readableAPI';
import { updatePosts, votePost, updateSortParam, modifyPost } from '../actions/infoActions';

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

    if (posts.length === 0) {
      return <p>There doesn&#39;t seem to be anything here</p>;
    }

    return posts.map(obj => {
      const {
        id, title, body, timestamp, author, voteScore, category, commentCount
      } = obj;
      return (
        <Post
          title={title}
          body={body}
          voteScore={voteScore}
          id={id}
          timestamp={timestamp}
          author={author}
          category={category}
          commentCount={commentCount}
          votePost={(postID, vote) => votePost(postID, vote)}
          resort={this.sortPosts}
          modifyPost={(postID, postTitle, postBody) =>
            this.props.modifyPost(postID, postTitle, postBody)
          }
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

const mapDispatchToProps = dispatch => ({
  addPosts: posts => dispatch(updatePosts(posts)),
  votePost: (id, vote) => dispatch(votePost(id, vote)),
  sortPostsBy: sortBy => dispatch(updateSortParam(sortBy))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
