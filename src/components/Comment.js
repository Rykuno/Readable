import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import downvoteArrow from '../images/downvote-arrow.jpeg';
import upvoteArrow from '../images/upvote-arrow.jpeg';
import editIcon from '../images/edit.png';
import deleteIcon from '../images/delete.png';
import userArrow from '../images/userArrow.png';
import EditCommentModal from './EditCommentModal';
import { getTime } from '../utils/utilities';

class Comment extends Component {
  state = {
    showEdit: false
  };

  toggleModal = () => {
    this.setState({
      showEdit: !this.state.showEdit
    });
  };

  render() {
    const {
      deleteComment,
      id,
      body,
      author,
      vote,
      voteScore,
      updateComment,
      timestamp
    } = this.props;

    return (
      <div className="wrapper border">
        <div className="vote-container">
          <input
            className="vertical-vote comment-arrow"
            type="image"
            src={upvoteArrow}
            alt="upVote"
            onClick={() => vote(id, 'upVote')}
          />
          <h5>{voteScore}</h5>
          <input
            className="vertical-vote comment-arrow padding-bottom"
            type="image"
            src={downvoteArrow}
            alt="downVote"
            onClick={() => vote(id, 'downVote')}
          />
        </div>
        <div className="info-container">
          <h5 className="inline comment-author">{author}</h5>
          <img src={userArrow} alt="<" />
          <hr className="no-margin" />
          <p>{body}</p>
        </div>
        <div className="metadata-container">
          <input
            className="post-icon float-right"
            type="image"
            src={deleteIcon}
            alt="Delete"
            onClick={() => deleteComment(id)}
          />
          <input
            className="post-icon float-right"
            type="image"
            src={editIcon}
            alt="Edit"
            onClick={this.toggleModal}
          />
          <Badge className="float-right">{getTime(timestamp)}</Badge>
        </div>
        {this.state.showEdit === false || (
          <EditCommentModal
            show
            close={this.toggleModal}
            body={body}
            id={id}
            updateComment={(commentID, commentBody) => updateComment(commentID, commentBody)}
          />
        )}
      </div>
    );
  }
}

Comment.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  vote: PropTypes.func.isRequired,
  voteScore: PropTypes.number.isRequired,
  updateComment: PropTypes.func.isRequired
};

export default Comment;
