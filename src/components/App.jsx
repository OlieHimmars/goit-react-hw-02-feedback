import { Component } from 'react';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';
import css from './App.module.css';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleClickButton = e => {
    const option = e.target.name;

    if (option) {
      this.setState(prevState => ({ [option]: prevState[option] + 1 }));
    }
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const totalFeedback = this.countTotalFeedback();
    const goodFeedback = this.state.good;
    let result = 0;

    (totalFeedback > 0) ?
      result = Math.trunc((goodFeedback / totalFeedback) * 100) : result = 0;
    

    return `${result}%`;
  };


 render() {
    const { good, neutral, bad } = this.state;
    const countTotalFeedback = this.countTotalFeedback();
    const countPositiveFeedbackPercentage = this.countPositiveFeedbackPercentage();
    const options = Object.keys(this.state);
    const handleClickButton = this.handleClickButton;

    return (
      <div className={css.container}>
          <Section title="Please leave your feedback">
            <FeedbackOptions
              options={options}
              onLeaveFeedback={handleClickButton}
            />
          </Section>

          <Section title="Statistics">
            {(countTotalFeedback > 0) ? (
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={countTotalFeedback}
                positivePercentage={countPositiveFeedbackPercentage}
              />
            ) : (
              <Notification message="There is no feedback yet" />
            )}
          </Section>
      </div>
    );
  }
}
