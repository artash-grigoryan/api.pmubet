import React, { Component } from 'react';

export default class UserIconBlock extends Component {
    render() {
        const { src } = this.props;
        let url = (src && src.indexOf("http") === -1 ? API_URL + "/" : "") + src;

        const sectionStyle = {
            backgroundImage: "url(" +  url + ")",

        };

        return <div className="user-icon-wrap">
            <div className="user-icon" style={sectionStyle}></div>
        </div>
    }
};