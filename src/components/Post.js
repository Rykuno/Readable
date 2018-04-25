import React, { Component } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import downvoteArrow from '../images/downvote-arrow.jpeg';
import downvoteArrowDark from '../images/downvote-dark.jpeg';
import upvoteArrowDark from '../images/upvote-dark.jpeg';
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
    ReadableAPI.vote(id, vote).then(data => {
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
      id,
      title,
      timestamp,
      author,
      voteScore,
      category,
      commentCount,
      body,
      modifyPost
    } = this.props;

    return (
      <li>
        <div className="wrapper">
          <div className="vote-container">
            <img
              onMouseOver={e => (e.currentTarget.src = upvoteArrowDark)}
              onMouseOut={e => (e.currentTarget.src = upvoteArrow)}
              onClick={() => this.votePost('upVote')}
              className="vertical-vote arrow"
              src={upvoteArrow}
              alt=""
            />
            <h4 className="vertical-vote">{voteScore}</h4>
            <img
              onMouseOver={e => (e.currentTarget.src = downvoteArrowDark)}
              onMouseOut={e => (e.currentTarget.src = downvoteArrow)}
              className="vertical-vote"
              src={downvoteArrow}
              alt=""
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
      </li>
    );
  }
}

export default Post;
