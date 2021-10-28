import { Component } from "react";
import {
  Button,
  ModalHeader,
  ModalBody,
  Modal,
  Label,
  Col,
  Row,
} from 'reactstrap';

import { LocalForm, Control, Errors } from 'react-redux-form';


const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const required = (val) => val && val.length;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCommentFormOpen: false,
    };
    this.toggleCommentForm = this.toggleCommentForm.bind(this);
    this.handleCommentFormSubmit = this.handleCommentFormSubmit.bind(this);
  }

  toggleCommentForm() {
    this.setState({
      isCommentFormOpen: !this.state.isCommentFormOpen,
    });
  }

  handleCommentFormSubmit(values) {
    this.toggleCommentForm();
    console.log(values)
    const productId = this.props.productId;
    const newComment = {
    productId: productId ,
    rating: values.rating,
    author: values.author,
    comment: values.comment,
  };

    fetch(`http://localhost:3000/products/comments`, {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/JSON',
    },
    credentials: 'same-origin',
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .catch((error) => {
      console.log('Post Comments', error.message);
      alert('Your Comment could not be posted\n Error: ' + error.message);
    });
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleCommentForm}>
          <span className='fa fa-comments fa-lg'></span>Submit Comment
        </Button>
        <Modal
          style={{marginTop:"100px"}}
          isOpen={this.state.isCommentFormOpen}
          toggle={this.toggleCommentForm}>
          <ModalHeader toggle={this.toggleCommentForm}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm
              onSubmit={(values) => this.handleCommentFormSubmit(values)}>
              <Row className='form-group'>
                <Label htmlfor='rating' md={5}>
                  Rating
                </Label>
                <Col md={{ size: 10 }}>
                  <Control.select
                    model='.rating'
                    className='form-control'
                    name='rating'>
                    <option>Please Select</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className='form-group'>
                <Label htmlfor='author' md={5}>
                  Your Name
                </Label>
                <Col md={10}>
                  <Control.text
                    model='.author'
                    id='author'
                    name='author'
                    placeholder='Your Name'
                    className='form-control'
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className='text-danger'
                    model='.author'
                    show='touched'
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less',
                    }}
                  />
                </Col>
              </Row>
              <Row className='form-group'>
                <Label htmlfor='comment' md={5}>
                  Comment
                </Label>
                <Col md={10}>
                  <Control.textarea
                    model='.comment'
                    id='comment'
                    name='comment'
                    rows='6'
                    className='form-control'
                  />
                </Col>
              </Row>
              <Row className='form-group'>
                <Col md={{ size: 10 }}>
                  <Button type='submit' color='primary'>
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default CommentForm;