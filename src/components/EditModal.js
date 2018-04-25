import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ControlLabel, FormControl, Button, FormGroup, HelpBlock } from 'react-bootstrap';
import * as ReadableAPI from '../utils/readableAPI';
import { modifyPost } from '../actions/infoActions';

class EditModal extends Component {
  state = {
    show: false,
    title: '',
    body: '',
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
      default:
        this.setState({
          error: 'Error updating fields'
        });
        break;
    }
  };

  submitChanges = () => {
    const { body, title } = this.state;
    const {
      id, modifyPost, close, echoChanges
    } = this.props;
    modifyPost(id, title, body);
    if (echoChanges) {
      echoChanges(title, body);
    }
    close();
  };

  render() {
    const { close } = this.props;
    const { title, body, error } = this.state;
    return (
      <div>
        <Modal show={this.state.show} onHide={close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="body-form">
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
  modifyPost: (id, title, body) => dispatch(modifyPost(id, title, body))
});

export default connect(null, mapDispatchToProps)(EditModal);
