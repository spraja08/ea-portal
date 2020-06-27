import React, { Component } from 'react';
import { EuiCard, EuiIcon, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import {
    EuiFlyout,
    EuiFlyoutBody,
    EuiFlyoutHeader,
    EuiTitle,
    EuiButton,
    EuiText,
    EuiFieldText,
    EuiFormRow,
    EuiTextArea
} from '@elastic/eui';

function cards(buildingBlocks, setFlyoutVisibility) {
    const cardNodes = Object.keys(buildingBlocks).map(function (key, index) {
        return (
            <EuiFlexItem style={{ width: 300 }} grow={false} key={index}>
                <EuiCard
                    icon={<EuiIcon size="xl" type="aggregate" />}
                    title={buildingBlocks[key]['name']}
                    onClick={() => setFlyoutVisibility(true, buildingBlocks[key], key)}
                />
            </EuiFlexItem>
        );
    });
    return cardNodes;
}

function flyout(isFlyoutVisible, setFlyoutVisibility, handleInputChange, handleSubmit, id, name, schema ) {
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
                    <EuiFormRow fullWidth label="ID">
                        <EuiFieldText fullWidth name="id" value={id} onChange={e => handleInputChange(e)} />
                    </EuiFormRow>
                    <EuiFormRow fullWidth label="Schema">
                        <EuiTextArea style={{ height: 350 }} fullWidth name="schema" value={JSON.stringify(schema, null, 4 )} onChange={e => handleInputChange(e)} />
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

class Events extends Component {

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
    }

    handleSubmit(event) {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(this.state.schema)
        };
        let thisurl = 'http://54.144.128.241:8111/api/v1/events/'.concat(this.state.id);
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
        if (target.name === 'id')
            this.setState({ id: target.value });
        if (target.name === 'schema')
            this.setState({ schema: JSON.parse( target.value ) });
    }

    setFlyoutVisibility(visibility, buildingBlock, buildingBlockId) {
        this.setState({
            flyoutVisibility: visibility,
            selectedBuildingBlock: buildingBlock
        });
        if (visibility) {
            this.setState({
                id: buildingBlockId,
                name : buildingBlock[ 'name' ], 
                schema : buildingBlock
            });             
        }
    }

    componentDidMount() {
        fetch('http://54.144.128.241:8111/api/v1/events', { mode: 'cors' })
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
                    this.state.schema )}
            </EuiFlexGroup>
        );
    }
}

export default Events;
