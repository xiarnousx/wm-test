import React, { Component } from 'react';

export class PartnersList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { partners } = this.props;

        return (
            <ul className="box">
                { partners.map(this.renderPartner.bind(this)) }
            </ul>
        );
    }

    renderPartner(partner) {
        const {id, organization, offices } = partner;        
        return (
            <li className="media" key={id}>
                <div className="media-content">
                    <h1 className="has-text-danger-dark">{organization}</h1>
                    <br/>
                    { offices.map(({location }, index) => (<span key={"c" + index + "-" + id} className="tag is-info is-light mx-3" >{location}</span>)) }
                </div>
            </li>
        );
    }
}