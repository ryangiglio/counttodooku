/**
 * components/About.js
 * 
 * About popup
 */

// React
import React from 'react';
import autoBind from 'react-autobind';

// Redux
import { history } from '../config/store';

// Style
import './About.css';

class About extends React.Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  componentDidMount() {
    // Listen for clicks and keys
    this.aboutOverlay.addEventListener('click', this.handleCloseClick);
    window.addEventListener('keyup', this.handleCloseKeyup);
  }

  componentWillUnmount() {
    // Remove listeners
    this.aboutOverlay.removeEventListener('click', this.handleCloseClick);
    window.removeEventListener('keyup', this.handleCloseKeyup);
  }

  handleCloseClick(e) {
    // If you clicked the overlay, not the container
    if (e.target === this.aboutOverlay) {
      history.push('/');
    }
  }

  handleCloseKeyup(e) {
    // If you pressed Esc
    if (e.keyCode === 27) {
      history.push('/');
    }
  }

  render() {
    return (
      <div className="about-popup__overlay" ref={(node) => { this.aboutOverlay = node }}>
        <div className="about-popup__container">
          <h2 className="about-popup__header">What is this?</h2>
          <p className="about-popup__text">Count Todo(oku) is a simple todo list manager that keeps you honest. Move your current task to the top of the list and you can see how long you've been working on it.</p>
          <p className="about-popup__text">This was mostly created as a way to practice React and Redux. A Todo List is a pretty standard tutorial project, adding the timer was a good way to solve some React puzzles on my own.</p>
          <p className="about-popup__text">You can find the <a href="https://github.com/ryangiglio/counttodooku" target="_blank">source on Github</a>. Feel free to submit an Issue if you notice any bugs!</p>
        </div>
      </div>
    );
  }
}

export default About;
