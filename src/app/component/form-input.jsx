import React, { PureComponent } from 'react';
import getNIContributions from '../api';

export default class FormInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      'income2018/19': 0,
      'income2019/20': 0,
      'ni2018/19': 0,
      'ni2019/20': 0,
    };
  }

  inputChangeHandler = (event) => {
    // Used to update state variables
    const { name, value } = event.target;
    if (!Number(value)) {
      alert('Your income must be a number');
    } else this.setState({ [name]: value });
  }

  setTwoDecimalPlace = (inputEvent) => {
    // Ensures income only has two decimal places
    const event = inputEvent;
    event.target.value = parseFloat(event.target.value).toFixed(2);
    this.inputChangeHandler(event);
  }

  submitHandler = async (event) => {
    event.preventDefault();
    const NIYear = event.target[0].name;
    const income = this.state[NIYear];

    // Alert user if income is not set
    if (!income || income === 'undefined') {
      alert('Please input your income first');
    } else {
      // Fetch national insurance contributions from API
      const date = (NIYear === 'income2018/19') ? '2018-04-06' : '2019-04-06';
      const response = await getNIContributions(income, date);

      // Update state
      if (response.status === 200) {
        const { ni } = response.data;
        if (NIYear === 'income2018/19') {
          this.setState({ 'ni2018/19': ni });
        } else {
          this.setState({ 'ni2019/20': ni });
        }
      }
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input
            type="number"
            min="0.00"
            step="any"
            name="income2018/19"
            placeholder="2018/19 income"
            onChange={this.setTwoDecimalPlace}
          />
          <input
            type="submit"
          />
          <p>
            Given an income of
            {' £'}
            {this.state['income2018/19']}
            {' '}
            your 2018/19 National Insurance contributions are
            {' £'}
            {this.state['ni2018/19']}
          </p>
        </form>

        <form onSubmit={this.submitHandler}>
          <input
            type="number"
            min="0.00"
            step="any"
            name="income2019/20"
            placeholder="2019/20 income"
            onChange={this.setTwoDecimalPlace}
          />
          <input
            type="submit"
          />
          <p>
            Given an income of
            {' £'}
            {this.state['income2019/20']}
            {' '}
            your 2019/20 National Insurance contributions are
            {' £'}
            {this.state['ni2019/20']}
          </p>
        </form>

      </div>

    );
  }
}
