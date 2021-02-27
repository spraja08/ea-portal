import React, { Component } from 'react';
import { EuiCard, EuiIcon, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import {
    EuiFlyout,
    EuiFlyoutBody,
    EuiFlyoutHeader,
    EuiTitle,
    EuiButton,
    EuiComboBox,
    EuiFieldText,
    EuiFormRow,
    EuiTextArea
} from '@elastic/eui';
import GeoFence from './GeoFence';

function cards(buildingBlocks, setFlyoutVisibility) {
    const cardNodes = Object.keys(buildingBlocks).map(function (key, index) {
        return (
            <EuiFlexItem style={{ width: 300 }} grow={false} key={index}>
                <EuiCard
                    icon={<EuiIcon size="xl" type="users" />}
                    title={buildingBlocks[key]['name']}
                    description={buildingBlocks[key]['description']}
                    onClick={() => setFlyoutVisibility(true, buildingBlocks[key], key)}
                />
            </EuiFlexItem>
        );
    });
    return cardNodes;
}

function flyout(isFlyoutVisible, setFlyoutVisibility, handleInputChange, handleSubmit, id, name, 
                description, geoFence, handleRemoveGeoFence, groupKeys) {
    let flyout;
    if (isFlyoutVisible) {
        flyout = (
            <EuiFlyout onClose={() => setFlyoutVisibility(false)} aria-labelledby="flyoutTitle"
                size={'m'}
                maxWidth={750}>
                <EuiFlyoutHeader hasBorder>
                    <EuiTitle size="m">
                        <h2 id="flyoutTitle">{name}</h2>
                    </EuiTitle>
                </EuiFlyoutHeader>
                <EuiFlyoutBody>
                    <EuiFormRow fullWidth label="Id Field (from Events Schema)">
                        <EuiFieldText fullWidth name="id" value={id} onChange={e => handleInputChange(e)} />
                    </EuiFormRow>
                    <EuiFormRow fullWidth label="Name">
                        <EuiFieldText fullWidth name="name" value={name} onChange={e => handleInputChange(e)} />
                    </EuiFormRow>
                    <EuiFormRow fullWidth label="Description">
                        <EuiFieldText fullWidth name="description" value={description} onChange={e => handleInputChange(e)} />
                    </EuiFormRow>
                    <EuiFormRow fullWidth label="Entity Hierarchy">
                        <EuiFieldText fullWidth name="hiterarcy" value={groupKeys} onChange={e => handleInputChange(e)} />
                    </EuiFormRow>
                    <EuiFormRow fullWidth label="GeoFence">
                        <GeoFence ref="GeoFenceComponent" geoFenceCoords={geoFence} />
                    </EuiFormRow>
                    <EuiFormRow display="center">
                        <div>
                            <EuiButton type="submit" fill onClick={e => handleRemoveGeoFence(e)}>Remove</EuiButton>&nbsp;&nbsp;&nbsp;&nbsp;
                            <EuiButton type="submit" fill onClick={e => handleSubmit(e)}>Submit</EuiButton>
                        </div>
                    </EuiFormRow>
                </EuiFlyoutBody>
            </EuiFlyout>
        );
    }
    return flyout;
}

class Entities extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            buildingBlocks: {},
            flyoutVisibility: false,
            selectedBuildingBlock: {}
        }
        this.setFlyoutVisibility = this.setFlyoutVisibility.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeGeoFence = this.removeGeoFence.bind(this);
        console.log("This is read from the env file : " + process.env.REACT_APP_ENV_VAR1);
    }

    removeGeoFence(event) {
        this.refs.GeoFenceComponent.removeShape();
    }

    handleSubmit(event) {
        event.preventDefault();

        let latArray = [];
        let lngArray = [];
        this.refs.GeoFenceComponent.getGeoFence().map( ( coord, index ) => { 
            latArray.push( coord[ 0 ] ); 
            lngArray.push( coord[ 1 ] );
        } );
        let thisBuildingBlock = {
            'id' : this.state.id,
            'name': this.state.name,
            'description': this.state.description,
            'groupByKeys' : [this.state.id],
            'geoFence' : this.refs.GeoFenceComponent.getGeoFence(),
            'latArray' : latArray,
            'lngArray' : lngArray
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(thisBuildingBlock)
        };
        let thisurl = 'http://54.255.195.248:8111/api/v1/entities/'.concat(this.state.id);
        fetch(thisurl, requestOptions)
            .then(res => res.json())
            .then((data) => {
                this.setState({ buildingBlocks: data })
            })
            .catch(console.log)

        this.setFlyoutVisibility(false, {}, '');
    }

    handleInputChange(event) {
        const target = event.target;
        if (target.name === 'name')
            this.setState({ name: target.value });
        if (target.name === 'id')
            this.setState({ id: target.value });
        if (target.name === 'description')
            this.setState({ description: target.value });
    }

    setFlyoutVisibility(visibility, buildingBlock, buildingBlockId) {
        this.setState({
            flyoutVisibility: visibility,
            selectedBuildingBlock: buildingBlock
        });
        if (visibility) {
            var groupKeysStr = "";
            buildingBlock[ 'groupByKeys' ].map((key, index) => { 
                if( index == 0 ) 
                    groupKeysStr += key;
                else 
                    groupKeysStr += " --> " + key; });
            this.setState({
                id: buildingBlock['id'],
                name: buildingBlock['name'],
                description: buildingBlock['description'],
                geoFence: buildingBlock['geoFence'],
                groupKeys : groupKeysStr,
            });
        }
    }

    componentDidMount() {
        fetch('http://54.255.195.248:8111/api/v1/entities', { mode: 'cors' })
            .then(res => res.json())
            .then((data) => {
                this.setState({ buildingBlocks: data });
            })
            .catch(console.log);
    }

    render() {
        return (
            <EuiFlexGroup wrap gutterSize="l">
                {cards(this.state.buildingBlocks, this.setFlyoutVisibility)}
                {flyout(this.state.flyoutVisibility, this.setFlyoutVisibility,
                    this.handleInputChange, this.handleSubmit, this.state.id, this.state.name,
                    this.state.description, this.state.geoFence, this.removeGeoFence, this.state.groupKeys)}
            </EuiFlexGroup>
        );
    }
}

export default Entities;
