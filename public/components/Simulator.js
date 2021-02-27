import React, { Component } from 'react';
import { EuiCard, EuiIcon, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import {
    EuiFlyout,
    EuiFlyoutBody,
    EuiFlyoutHeader,
    EuiTitle,
    EuiButton,
    EuiPanel,
    EuiFieldText,
    EuiFormRow,
    EuiTextArea,
    EuiText,
    EuiSpacer
} from '@elastic/eui';
import { EuiForm } from '@elastic/eui';

function formatJsonAttributes( document ) {
    const cards = Object.keys( document ).map( ( key, index) => { 
        return( 
        <EuiText size="s">{key + ' : ' + document[key]}</EuiText>
        ) } );
    return cards;    
}

function entityCards(entity360) {
  const cardNodes = Object.keys(entity360).map(function (key, index) {
    return (
      <EuiFlexItem style={{ width: 350 }} grow={false} key={index}>
        <EuiCard textAlign="left" title={key}>
        <EuiText size="s"><b>ADPs:</b></EuiText>    
        {formatJsonAttributes( entity360[key]['ADPs'] )}
        <EuiSpacer/>
        <EuiText size="s"><b>STATES:</b></EuiText>    
        {formatJsonAttributes( entity360[key]['states'] )}
        </EuiCard>
      </EuiFlexItem>
    );
  });
  return cardNodes;
}

function cards(buildingBlocks, setFlyoutVisibility) {
    const cardNodes = Object.keys(buildingBlocks).map(function (key, index) {
        return (
            <EuiFlexItem style={{ width: 300 }} grow={false} key={index}>
                <EuiCard
                    icon={<EuiIcon size="xl" type="aggregate" />}
                    title={buildingBlocks[key]['name']}
                    onClick={() => setFlyoutVisibility(true, buildingBlocks[key], key, buildingBlocks[key]['name'])}
                />
            </EuiFlexItem>
        );
    });
    return cardNodes;
}

function flyout(isFlyoutVisible, setFlyoutVisibility, handleInputChange, handleSubmit, id, name, schema) {
    let flyout;
    if (isFlyoutVisible) {
        flyout = (
            <EuiFlyout onClose={() => setFlyoutVisibility(false)} aria-labelledby="flyoutTitle"
                size={'s'}
                maxWidth={750}>
                <EuiFlyoutHeader hasBorder>
                    <EuiTitle size="m">
                        <h2 id="flyoutTitle">{name}</h2>
                    </EuiTitle>
                </EuiFlyoutHeader>
                <EuiFlyoutBody>
                    <EuiFormRow fullWidth label="ID">
                        <EuiFieldText fullWidth name="id" value={id} onChange={e => handleInputChange(e)} />
                    </EuiFormRow>
                    <EuiFormRow fullWidth label="Schema">
                        <EuiTextArea style={{ height: 350 }} fullWidth name="schema" value={JSON.stringify(schema, null, 4)} onChange={e => handleInputChange(e)} />
                    </EuiFormRow>
                    <EuiFormRow display="center">
                        <EuiButton type="submit" fill onClick={e => handleSubmit(e)}>
                            Submit
                            </EuiButton>
                    </EuiFormRow>
                </EuiFlyoutBody>
            </EuiFlyout>
        );
    }
    return flyout;
}

class Simulator extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            buildingBlocks: {},
            flyoutVisibility: false,
            entity360: {}
        }
        this.setFlyoutVisibility = this.setFlyoutVisibility.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(this.state.schema)
        };
        let thisurl = 'http://54.255.195.248:8111/api/v1/getOffers';
        fetch(thisurl, requestOptions)
            .then(res => res.json())
            .then((data) => {
                this.setState({ entity360: data });
                console.log(data);
            })
            .catch(console.log)

        this.setFlyoutVisibility(true, {}, this.state.id, this.state.name);
    }

    handleInputChange(event) {
        const target = event.target;
        if (target.name === 'id')
            this.setState({ id: target.value });
        if (target.name === 'schema')
            this.setState({ schema: JSON.parse(target.value) });
    }

    setFlyoutVisibility(visibility, buildingBlock, buildingBlockId, buildingBlockName) {
        let eventData = {};
        if (buildingBlockId === 'FlightBooking')
            eventData = {
                "event": "FlightBooking",
                "customerId": "raja",
                "timestamp": 1590847184000,
                "latitude": -6.194772,
                "longitude": 106.815968,
                "origin": "Jakarta",
                "destination": "Singapore",
                "departureTime": 1590847184000,
                "airline": "SQ",
                "flightId": "SQ065",
                "amount": 257.00,
                "paymentMode": "CreditCard"
            }
        else if (buildingBlockId === 'TrainBooking')
            eventData = {
                "event": "TrainBooking",
                "customerId": "raja",
                "timestamp": 1590847184000,
                "origin": "Jakarta",
                "destination": "Bali",
                "departureTime": 1590847184000,
                "operator": "Northern Railways",
                "coachId": "R0293",
                "amount": 120,
                "paymentMode": "CreditCard"
            }
        else if (buildingBlockId == 'AccommodationBooking')
            eventData = {
                "event": "AccommodationBooking",
                "customerId": "raja",
                "timestamp": 1590847184000,
                "checkInDate": 1590847184000,
                "stayDuration": 3,
                "hotelOperator": "InterContinental",
                "hotelStarValue": 5,
                "roomType": "Deluxe",
                "amount": 750,
                "paymentMode": "Credit Card"
            }

        this.setState({
            flyoutVisibility: visibility,
        });
        if (visibility) {
            this.setState({
                id: buildingBlockId,
                name: buildingBlockName,
                schema: eventData
            });
        }
    }

    componentDidMount() {
        fetch('http://54.255.195.248:8111/api/v1/events', { mode: 'cors' })
            .then(res => res.json())
            .then((data) => {
                this.setState({ buildingBlocks: data });
            })
            .catch(console.log);
    }

    render() {
        return (
            <div>
                <EuiPanel>
                    <EuiFlexGroup wrap gutterSize="l">
                        {cards(this.state.buildingBlocks, this.setFlyoutVisibility)}
                        {flyout(this.state.flyoutVisibility, this.setFlyoutVisibility,
                            this.handleInputChange, this.handleSubmit, this.state.id, this.state.name,
                            this.state.schema)}
                    </EuiFlexGroup>
                </EuiPanel>
                <EuiPanel>
                    <EuiFormRow fullWidth label="Entities 360 After Event Processing :">
                        <EuiFlexGroup wrap gutterSize="l">
                            {entityCards(this.state.entity360)}
                        </EuiFlexGroup>
                    </EuiFormRow>
                </EuiPanel>
            </div>
        );
    }
}

export default Simulator;
