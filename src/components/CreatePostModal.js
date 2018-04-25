import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ControlLabel, FormControl, Button, FormGroup, HelpBlock } from 'react-bootstrap';
import * as ReadableAPI from '../utils/readableAPI';
import { createPost } from '../actions/infoActions';

class CreatePostModal extends Component {
  state = {
    show: false,
    title: '',
    body: '',
    author: '',
    category: 'react',
    error: ''
  };

  componentDidMount() {
    const { show } = this.props;
    if (show === true) {
      console.log('Should Show');
      this.handleShow();
    } else {
      console.log('Should Not Show');
      this.handleClose();
    }
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    const { title, body } = this.props;
    this.setState({
      show: true,
      title,
      body
    });
  };

  handleChange = e => {
    e.preventDefault();
    switch (e.target.name) {
      case 'title':
        this.setState({
          title: e.target.value
        });
        break;
      case 'body':
        this.setState({
          body: e.target.value
        });
        break;
      case 'author':
        this.setState({
          author: e.target.value
        });
        break;
      case 'category':
        this.setState({
          category: e.target.value
        });
        break;
      default:
        this.setState({
          error: 'Error updating fields'
        });
        break;
    }
  };

  submitChanges = () => {
    const {
      title, body, author, category
    } = this.state;
    const { createPost, close } = this.props;
    createPost(title, body, author, category);
    close();
  };

  render() {
    const { close } = this.props;
    const {
      title, body, author, error
    } = this.state;
    return (
      <div>
        <Modal show={this.state.show} onHide={close}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="title-form">
                <ControlLabel>Title:</ControlLabel>
                <FormControl
                  name="title"
                  className="title-input"
                  input="text"
                  value={title}
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup controlId="body-form">
                <ControlLabel>Body:</ControlLabel>
                <FormControl
                  name="body"
                  componentClass="textarea"
                  className="comment-input"
                  input="text"
                  value={body}
                  onChange={this.handleChange}
                />
                <HelpBlock>{error}</HelpBlock>
              </FormGroup>

              <FormGroup controlId="author-form">
                <ControlLabel>Author:</ControlLabel>
                <FormControl
                  name="author"
                  className="title-input"
                  input="text"
                  value={author}
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Category:</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="category"
                  onChange={this.handleChange}
                >
                  <option value="react">react</option>
                  <option value="redux">redux</option>
                  <option value="udacity">udacity</option>
                </FormControl>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.submitChanges}>
              Submit
            </Button>
            <Button onClick={close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createPost: (title, body, author, category) => dispatch(createPost(title, body, author, category))
});

export default connect(null, mapDispatchToProps)(CreatePostModal);
