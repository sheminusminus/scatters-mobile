import React from 'react';
import PropTypes from 'prop-types';

const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'W'];

const blankState = {
  hovering: false,
  progress: 0,
  rolling: false,
  value: null,
  hasValue: false,
};

class Dice extends React.Component {
  availableValues = [...values];

  state = {
    ...blankState,
  };

  componentDidMount() {
    const { roll } = this.props;
    if (roll) {
      this.setState({ hasValue: true, roll, value: roll });
    }
  }

  componentDidUpdate(prevProps) {
    const { isDisabled, roll } = this.props;
    const { isDisabled: wasDisabled, roll: prevRoll } = prevProps;
    if (!isDisabled && wasDisabled) {
      this.setState({ hasValue: false });
    }
    if (prevRoll === null && roll !== null) {
      this.throw();
    } else if (prevRoll !== null && roll === null) {
      this.setState({ ...blankState });
    }
  }

  componentWillUnmount () {
    if (this.timer) clearTimeout(this.timer);
  }

  roll() {
    const { rollSeconds } = this.props;

    if (this.availableValues.length === 1) {
      this.setState({ value: this.availableValues[0] });
      this.done();
      return;
    }

    const valueIndex = Math.floor(Math.random() * this.availableValues.length);
    const value = this.availableValues[Math.max(valueIndex - 1, 0)];
    const progress = Math.floor((Date.now() - this.start) / (rollSeconds * 1000) * 100);

    this.setState({ value, progress });

    this.nextRoll();
  }

  nextRoll() {
    const { rollSeconds, roll } = this.props;

    this.timer = setTimeout(() => this.roll(), this.interval);

    const timeLeft = (rollSeconds * 1000) - (Date.now() - this.start);

    if (timeLeft >= (rollSeconds * 1000) / 2)  {
      this.interval = 15;
    } else {
      this.interval *= 1.2;
    }

    if (timeLeft <= 100) {
      this.setState({ progress: 100, value: roll }, () => {
        clearTimeout(this.timer);
        this.done();
        const i = this.availableValues.indexOf(roll);
        this.availableValues = [...this.availableValues.slice(0, i), ...this.availableValues.slice(i + 1)];
        if (this.availableValues.length === 0) {
          this.availableValues = [...values];
        }
      });
    }
  }

  throw() {
    this.setState({ rolling: true, progress: 0 })
    this.start = Date.now();
    this.interval = 20;
    this.nextRoll();
  }

  reroll() {
    const { value } = this.state;
    this.availableValues.push(value);
    this.setState({ hasValue: false });
  }

  done() {
    const { onValue, roll } = this.props;
    setTimeout(() => {
      this.setState({ hasValue: true, rolling: false });
      onValue(roll);
    }, 1000);
  }

  render() {
    const { rolling, value } = this.state;

    let displayValue = '';
    if (value) {
      displayValue = value;
    } else if (!rolling) {
      displayValue = 'Roll';
    }

    return displayValue;
  }
}

Dice.propTypes = {
  diceClassName: PropTypes.string,
  isActivePlayer: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool,
  onValue: PropTypes.func.isRequired,
  overlayClassName: PropTypes.string,
  progressClassName: PropTypes.string,
  roll: PropTypes.string,
  rollSeconds: PropTypes.number,
  showProgress: PropTypes.bool,
  sides: PropTypes.number,
};

Dice.defaultProps = {
  isDisabled: undefined,
  rollSeconds: 3,
  showProgress: undefined,
  sides: 20,
  roll: null,
};


export default Dice;
