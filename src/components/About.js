import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import Header from './Header';
import NavBar from './NavBar';

const About = () => (
  <div>
    <Header />
    <NavBar />
    <Jumbotron className="jumbotron-about">
      <h1>Hello, world!</h1>
      <p>
        This project was built for Udacity&#39;s Redux course where you will build a content and comment web app. Users
        can post content to predefined categories, comment on their posts and other
        users&#39; posts, and vote on posts and comments. Users will also be able to edit and delete
        posts and comments.
      </p>
      <p>
        <Button bsStyle="primary" href="/">Lets Check it out!</Button>
      </p>
    </Jumbotron>;
  </div>
);

export default About;
