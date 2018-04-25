import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import downvoteArrow from '../images/downvote-arrow.jpeg';
import upvoteArrow from '../images/upvote-arrow.jpeg';
import editIcon from '../images/edit.png';
import deleteIcon from '../images/delete.png';
import * as ReadableAPI from '../utils/readableAPI';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';

class Post extends Component {
  state = {
    showEdit: false,
    showDelete: false
  };

  getTime = () => {
    const { timestamp } = this.props;
    const date = new Date(timestamp);
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getUTCFullYear();
    return `${month}-${day}-${year}`;
  };

  votePost = vote => {
    const { id, votePost, resort } = this.props;
    ReadableAPI.vote(id, vote).then(() => {
      votePost(id, vote);
      resort();
    });
  };

  showEditModal = () => {
    this.setState({
      showEdit: true
    });
  };

  closeEditModal = () => {
    this.setState({
      showEdit: false
    });
  };

  showDeleteModal = () => {
    this.setState({
      showDelete: true
    });
  };

  closeDeleteModal = () => {
    this.setState({
      showDelete: false
    });
  };

  render() {
    const {
      id, title, author, voteScore, category, commentCount, body, modifyPost
    } = this.props;

    return (
      <div className="wrapper">
        <div className="vote-container">
          <input
            type="image"
            onClick={() => this.votePost('upVote')}
            className="vertical-vote arrow"
            src={upvoteArrow}
            alt="upVote"
          />
          <h4 className="vertical-vote">{voteScore}</h4>
          <input
            type="image"
            className="vertical-vote"
            src={downvoteArrow}
            alt="downVote"
            onClick={() => this.votePost('downVote')}
          />
        </div>
        <div className="info-container">
          <div className="author-container">
            <Link to={`/r/${category}/${id}`}>{title}</Link>
            <h5>Author: {author}</h5>
          </div>
          <div className="metadata-container">
            <button className="comment-button">Comments</button>
            <Badge className="modesty-spacing">{commentCount}</Badge>
            <button className="comment-button">Category</button>
            <Badge className="modesty-spacing">{category}</Badge>
            <button className="comment-button">Submitted</button>
            <Badge className="modesty-spacing">{this.getTime()}</Badge>
            <input
              className="post-icon"
              type="image"
              src={editIcon}
              alt="Edit"
              onClick={this.showEditModal}
            />
            <input
              className="post-icon"
              type="image"
              src={deleteIcon}
              alt="Delete"
              onClick={this.showDeleteModal}
            />

            {this.state.showEdit === false || (
              <EditModal
                show
                close={this.closeEditModal}
                body={body}
                title={title}
                id={id}
                submit={(postTitle, postBody) => modifyPost(id, postTitle, postBody)}
              />
            )}
            {this.state.showDelete === false || (
              <DeleteModal id={id} close={this.closeDeleteModal} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  modifyPost: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  votePost: PropTypes.func.isRequired,
  resort: PropTypes.func.isRequired
};

export default Post;
