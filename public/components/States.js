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
    EuiTextArea,
    EuiSwitch,
    EuiPanel
} from '@elastic/eui';

function cards(buildingBlocks, setFlyoutVisibility) {
    const cardNodes = Object.keys(buildingBlocks).map(function (key, index) {
        return (
            <EuiFlexItem style={{ width: 300 }} grow={false} key={index}>
                <EuiCard
                    icon={<EuiIcon size="xl" type="tag" />}
                    title={buildingBlocks[key]['name']}
                    description={buildingBlocks[key]['description']}
                    betaBadgeLabel={JSON.stringify( buildingBlocks[key]['entity'] ).replace("[", "").replace( "]", "").replace(/"/g, '')}
                    onClick={() => setFlyoutVisibility(true, buildingBlocks[key], key)}
                />
            </EuiFlexItem>
        );
    });
    return cardNodes;
}

function flyout(isFlyoutVisible, setFlyoutVisibility, handleInputChange, handleSubmit, id, name, description,
    entity, expression, entitiesList, handleEntitySelection) {
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
                    <EuiFormRow fullWidth label="Name">
                        <EuiFieldText fullWidth name="name" value={name} onChange={e => handleInputChange(e)} />
                    </EuiFormRow>
                    <EuiFormRow fullWidth label="Description">
                        <EuiFieldText fullWidth name="description" value={description} onChange={e => handleInputChange(e)} />
                    </EuiFormRow>
                    <EuiFormRow fullWidth label="Entity">
                        <EuiComboBox 
                            fullWidth
                            selectedOptions={entity}
                            options={entitiesList} onChange={e => handleEntitySelection(e)} />
                    </EuiFormRow>
                    <EuiFormRow fullWidth >
                            <EuiSwitch
                                label="Capture State Changes"
                                checked={false}
                            />
                    </EuiFormRow>
                    <EuiFormRow fullWidth label="Snippet">
                        <EuiTextArea fullWidth name="expression" value={expression} onChange={e => handleInputChange(e)} />
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

class States extends Component {

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
        this.handleEntitySelection = this.handleEntitySelection.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let selectedEntity = [];
        this.state.entity.map((item, index) => { selectedEntity.push(item['label']) });
        let thisBuildingBlock = {
            'id' : this.state.id,
            'name': this.state.name,
            'description': this.state.description,
            'expression': this.state.expression,
            'entity': selectedEntity
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(thisBuildingBlock)
        };
        let thisurl = 'http://localhost:8111/api/v1/states/'.concat(this.state.id);
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
        if (target.name === 'expression')
            this.setState({ expression: target.value });
    }

    handleEntitySelection(selectedEntity) {
        this.setState({
            entity: selectedEntity
        })
    }

    setFlyoutVisibility(visibility, buildingBlock, buildingBlockId) {
        this.setState({
            flyoutVisibility: visibility,
            selectedBuildingBlock: buildingBlock
        });
        if (visibility) {
            this.setState({
                id: buildingBlockId,
                name: buildingBlock['name'],
                description: buildingBlock['description'],
                expression: buildingBlock['expression'],
            });
            var entityVal = [];
            //entityVal.push({ label: buildingBlock['entity'] });
            buildingBlock['entity'].map((key, index) => { entityVal.push({ label: key }) });
            this.setState({
                entity: entityVal
            })
        }
    }

    componentDidMount() {
        fetch('http://localhost:8111/api/v1/states', { mode: 'cors' })
            .then(res => res.json())
            .then((data) => {
                this.setState({ buildingBlocks: data });
            })
            .catch(console.log);

        fetch('http://localhost:8111/api/v1/entities', { mode: 'cors' })
            .then(res => res.json())
            .then((data) => {
                var options = [];
                Object.keys(data).map((key, index) => { options.push({ label: key }) });
                this.setState({ entitiesList: options });
            })
            .catch(console.log)
    }

    render() {
        return (
            <EuiFlexGroup wrap gutterSize="l">
                {cards(this.state.buildingBlocks, this.setFlyoutVisibility)}
                {flyout(this.state.flyoutVisibility, this.setFlyoutVisibility,
                    this.handleInputChange, this.handleSubmit, this.state.id, this.state.name,
                    this.state.description, this.state.entity,
                    this.state.expression, this.state.entitiesList,
                    this.handleEntitySelection)}
            </EuiFlexGroup>
        );
    }
}

export default States;
