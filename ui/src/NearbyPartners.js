import React, { Component } from 'react';
import { PartnerFinderForm } from './PartnerFinderForm';
import { PartnersList } from './PartnersList';
import { makeRemoteRequest, makeRemoteSubscription } from './server/remote-request';
import { 
    partnersFinderQuery, 
    partnerFinderMatchedSubscription,
    PAYLOAD_KEY_PARTNERS_MATCHED,
    PAYLOAD_KEY_PARTNERS_FINDER
} from './server/queries';
import { getUuid } from './server/auth';

export class NearbyPartners extends Component {
    subscription = null;

    constructor(props) {
        super(props);
        this.state = {processing: null, partners: []};
    }

    componentDidMount() {
        this.subscription =  makeRemoteSubscription(
            PAYLOAD_KEY_PARTNERS_MATCHED,
            (result) => this.setState({partners: result, processing: false}) ,
            partnerFinderMatchedSubscription
        );
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    async handlePartnerFinder(search) {
        
        const { status } = await makeRemoteRequest(PAYLOAD_KEY_PARTNERS_FINDER, partnersFinderQuery, { input:search });
        this.setState({processing: status});
    }

    render() {
        const { partners, processing } = this.state;



        let componentResult;
        if (partners.length > 0) {
            componentResult = <PartnersList partners={partners}></PartnersList>
        } else if (processing && partners.length == 0) {
            componentResult = <h2 className="is-size-1 has-text-danger">No Matches Found!</h2>
        } else if (processing) {
            componentResult = <div className="has-background-success-light p-5">Processing...</div>
        }

        return (
            <div>
                <PartnerFinderForm payloadCb={this.handlePartnerFinder.bind(this)}></PartnerFinderForm>
                <br/>
                {componentResult}
            </div>
        );
    }
}