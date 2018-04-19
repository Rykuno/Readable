import React, { Component } from 'react';
import { Badge, DropdownButton, MenuItem } from 'react-bootstrap';
import downvoteArrow from '../images/downvote-arrow.jpeg';
import downvoteArrowDark from '../images/downvote-dark.jpeg';
import upvoteArrowDark from '../images/upvote-dark.jpeg';
import upvoteArrow from '../images/upvote-arrow.jpeg';

import * as ReadableAPI from '../utils/readableAPI';

class Post extends Component {
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

  render() {
    const {
      id, title, timestamp, author, voteScore, category, commentCount
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
            <h4>{title}</h4>
            <h5>Author: {author}</h5>
            <button className="comment-button">Comments</button>
            <Badge className="modesty-spacing">{commentCount}</Badge>
            <button className="comment-button">Category</button>
            <Badge className="modesty-spacing">{category}</Badge>
            <button className="comment-button">Submitted</button>
            <Badge className="modesty-spacing">{this.getTime()}</Badge>
            <button className="comment-button">Edit</button>
          </div>
        </div>
      </li>
    );
  }
}

export default Post;
