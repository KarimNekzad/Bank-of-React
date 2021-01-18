import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import DisplayData from './DisplayData';
import AccountBalance from './AccountBalance';

import '../styles/Debit-Credit.css';

class Debits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debit: this.props.debit,
      temp: {
        amount: 0,
        date: '',
        description: '',
        id: '',
      },
      viewBalance: false,
      viewAddDebit: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      temp: {
        ...this.state.temp,
        [e.target.name]: e.target.value,
      },
    });
  }

  submitForm() {
    if (this.state.temp.amount === 0 || this.state.temp.amount === '') {
      alert('Please enter an amount');
      return;
    }

    let date = `${new Date()}`;
    this.setState({
      temp: {
        ...this.state.temp,
        date: date,
        id: parseInt(Math.random() * (99999 - 10000) + 10000),
      },
    });

    setTimeout(() => {
      let updatedDebit = [...this.state.debit];
      updatedDebit.push(this.state.temp);
      this.setState({ debit: updatedDebit });
      this.props.updateDebitState(updatedDebit);
    }, 100);
  }

  render() {
    console.log('render debits');
    let balance = Number(this.props.accountBalance).toFixed(2);
    return (
      <div>
        <nav className='debit-credit-nav'>
          <Link to='/'>Return Home</Link>
          <Link to='/Credit'>View Credit</Link>

          {/* Buttons */}
          <button
            onClick={() =>
              this.setState({ viewBalance: !this.state.viewBalance })
            }
          >
            View Balance
          </button>

          <button
            onClick={() => {
              this.setState({ viewAddDebit: !this.state.viewAddDebit });
            }}
          >
            Add Debit
          </button>
        </nav>

        <div>
          {/* Displays */}
          {this.state.viewAddDebit === true ? (
            <div>
              {/* Form */}
              <form onSubmit={this.handleChange}>
                <p>Add Debit Transaction</p>
                <div>
                  <label htmlFor=''>Amount</label>
                  <input
                    onChange={this.handleChange}
                    type='number'
                    name='amount'
                  />
                </div>
                <div>
                  <label htmlFor=''>Description</label>
                  <input
                    onChange={this.handleChange}
                    type='text'
                    name='description'
                  />
                </div>

                <button onClick={this.submitForm}>Submit</button>
              </form>
            </div>
          ) : (
            <span />
          )}

          {this.state.viewBalance === true ? (
            <AccountBalance accountBalance={balance} />
          ) : (
            // span tag used to display nothing if ternary is false
            <span />
          )}
        </div>

        {/* Display debit */}
        <div className='debit-credit-title'>
          <p>Debit</p>
        </div>
        {this.state.debit.map((debit, index) => (
          <DisplayData
            key={index}
            amount={debit.amount}
            date={debit.date}
            description={debit.description}
            id={debit.id}
          />
        ))}
      </div>
    );
  }
}

export default Debits;
