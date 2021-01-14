import React, { Component } from 'react';
import { CityDropDown } from './CityDropDown';


export class PartnerFinderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {origin: '', distanceWithin: 0, hasErrors: false};
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleFindPartner(event) {
        event.preventDefault();
        const { origin, distanceWithin } = this.state;

        if (!(origin || distanceWithin)) {
            this.setState({ hasErrors: true });
            return;
        }

        if (distanceWithin <= 0) {
            this.setState({ hasErrors: true });
            return;
        }

        this.setState({ hasErrors: false });
        this.props.payloadCb({origin, distanceWithin: parseFloat(distanceWithin)});
    }

    render() {
        const { origin, distanceWithin, hasErrors } = this.state;

        let errorComponent;
        if (hasErrors) {
            errorComponent = <h3 className="has-text-danger">Invalid City or/and Distance</h3>
        }

        return (
                <div>
                    <h1 className="title">Partner's Within a Location</h1>
                    { errorComponent }
                    <div className="box">
                        <form>
                            <CityDropDown name="origin" value={origin} onChange={this.handleChange.bind(this)}></CityDropDown>
                            <div className="field">
                                <label className="label">Distance Within in KM</label>
                                <div className="control">
                                    <input className="input" type="number" name="distanceWithin" value={distanceWithin}
                                    onChange={this.handleChange.bind(this)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-primary" onClick={this.handleFindPartner.bind(this)}>Find Nearby Partners</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
        );
    }
}