import React, { Component } from 'react';

export default class Q5Icon extends Component {
    render() {

        return <i className={`${this.props.className} widget__icon widget__icon--quinte`} data-reactid="1068">
            <img style={this.props.style} src={require('../assets/images/icons/pmu_QUINTE-PLUS_rvb.svg')} alt=""/>
        </i>
    }
};
