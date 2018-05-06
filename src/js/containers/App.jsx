import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import Story from '../components/Story/';
import {string, bool, func, object} from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import Admin from './Admin';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: string.isRequired,
  resetTranscript: func.isRequired,
  browserSupportsSpeechRecognition: bool.isRequired,
  recognition: object.isRequired
};

class App extends Component {
  renderStory = () => {
    const {transcript, resetTranscript} = this.props;
    return <Story transcript={transcript} resetTranscript={resetTranscript} />;
  };

  render() {

    const {browserSupportsSpeechRecognition, recognition} = this.props;
    recognition.lang = `nl-BE`;
    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    return (
      <section>
        {process.env.NODE_ENV !== `production` ? <DevTools /> : null}
        <Router>
            <Switch>
              <Route
                exact
                path='/story'
                render={this.renderStory}
              />

              <Route
                exact path='/admin'
                component={Admin}
              />

              <Route render={() => <Redirect to='/story' />} />
            </Switch>
        </Router>
      </section>
    );
  }
}

App.propTypes = propTypes;

export default SpeechRecognition(App);
