// import React, {Component} from 'react';
// import { Typography } from '@material-ui/core';

// class HomeGuest extends React.Component {

//     constructor() {
//         super('');
//         this.state = {
//             customers: []
//         }
//     }

//     componentDidMount() {
//         fetch('/auth/login')
//         .then(res => res.json())
//         .then(customers => this.setState({customers}, () => console.log('customers fetched', customers)))
//     }

//     render() {
//     return(
//   <div>
//   <h2>Sign in with:</h2>

//    <button>test</button>
//    <ul>
//    {this.state.customers.map(customer =>
//    <li key={customer.id}> {customer.firstName}</li>
//    )}
//    </ul>
//   </div>
// )}};

// export default HomeGuest;
