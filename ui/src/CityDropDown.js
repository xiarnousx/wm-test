import React, { Component } from 'react';
import { locationsQuery, PAYLOAD_KEY_LOCATIONS }  from './server/queries';
import { makeRemoteRequest } from './server/remote-request';

export class CityDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = { cities: [] };
    }

    async componentDidMount() {
        const cities = await makeRemoteRequest(PAYLOAD_KEY_LOCATIONS, locationsQuery);
        this.setState({ cities });
    }

    render() {
        const { cities } = this.state;
        const { onChange, name } = this.props;

        return (
            <div className="field">
                <label className="label">Choose Your City</label>
                <div className="control">
                    <div className="select">
                        <select name={name} onChange={onChange}>
                            <option value="">City</option>
                            { cities.map(this.renderOptions.bind(this)) }
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    renderOptions(city) {
        return (
            <option value={city.coordinates} key={city.id}>{city.city}</option>
        );
    }
}