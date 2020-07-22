import React, { Component, Fragment } from 'react';
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
    EuiCheckbox,
    EuiPanel
} from '@elastic/eui';

function cards(buildingBlocks, setFlyoutVisibility) {
    const cardNodes = Object.keys(buildingBlocks).map(function (key, index) {
        return (
            <EuiFlexItem style={{ width: 300 }} grow={false} key={index}>
                <EuiCard
                    icon={<EuiIcon size="xl" type="usersRolesApp" />}
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
    events, entity, expressionType, expressionTypesList, handleExpressionTypeSelection, expression, entitiesList, eventsList,
    handleEntitySelection, handleEventSelection, status, statusTypesList, handleStatusSelection) {
    let flyout;
    if (isFlyoutVisible) {
        flyout = (
            <EuiFlyout onClose={() => setFlyoutVisibility(false)} aria-labelledby="flyoutTitle"
                size={'m'}
                maxWidth={750}>
                <EuiFlyoutHeader hasBorder>
                    <EuiTitle size="m">
                        <h5 id="flyoutTitle">{name}</h5>
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
                    <EuiFormRow fullWidth label="Events">
                        <EuiComboBox
                            fullWidth
                            selectedOptions={events}
                            options={eventsList} onChange={e => handleEventSelection(e)} />
                    </EuiFormRow>
                    <EuiFormRow fullWidth label="Entity">
                        <EuiComboBox
                            fullWidth
                            selectedOptions={entity}
                            options={entitiesList} onChange={e => handleEntitySelection(e)} />
                    </EuiFormRow>
                    <EuiFormRow fullWidth label="Window">
                        <EuiPanel>
                            <EuiFlexGroup wrap gutterSize="l" >
                                <EuiFlexItem><EuiCheckbox id="hourly" label="Hourly" checked={false}/></EuiFlexItem>   
                                <EuiFlexItem><EuiCheckbox id="daily" label="Daily" checked={false}/></EuiFlexItem>       
                                <EuiFlexItem><EuiCheckbox id="monthly" label="Monthly" checked={false}/></EuiFlexItem>       
                                <EuiFlexItem><EuiCheckbox id="yearly" label="Yealy" checked={false}/></EuiFlexItem>   
                                <EuiFlexItem><EuiCheckbox id="session" label="Session" checked={false}/></EuiFlexItem>             
                                <EuiFlexItem><EuiCheckbox id="perpetual" label="Perpetual" checked={true}/></EuiFlexItem>   
                            </EuiFlexGroup>  
                        </EuiPanel>        
                    </EuiFormRow>
                    <EuiFormRow fullWidth label="Type">
                        <EuiComboBox singleSelection={{ asPlainText: true }}
                            fullWidth
                            selectedOptions={expressionType}
                            options={expressionTypesList} onChange={e => handleExpressionTypeSelection(e)} />
                    </EuiFormRow>
                    <EuiFormRow fullWidth label="Snippet">
                        <EuiTextArea fullWidth name="expression" value={expression} onChange={e => handleInputChange(e)} />
                    </EuiFormRow>
                    <EuiFormRow fullWidth label="Status">
                        <EuiComboBox singleSelection={{ asPlainText: true }}
                            fullWidth
                            selectedOptions={status}
                            options={statusTypesList} onChange={e => handleStatusSelection(e)} />
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

class ADPs extends Component {

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
        this.handleEventSelection = this.handleEventSelection.bind(this);
        this.handleEntitySelection = this.handleEntitySelection.bind(this);
        this.handleExpressionTypeSelection = this.handleExpressionTypeSelection.bind( this );
        this.handleStatusChange = this.handleStatusChange.bind( this );
    }

    handleSubmit(event) {
        event.preventDefault();
        let selectedEvents = [];
        this.state.events.map((item, index) => { selectedEvents.push(item['label']) });
        let selectedEntity = [];
        this.state.entity.map((item, index) => { selectedEntity.push(item['label']) });
        let thisBuildingBlock = {
            'id' : this.state.id,
            'name': this.state.name,
            'description': this.state.description,
            'expression': this.state.expression,
            'entity': selectedEntity,
            'events': selectedEvents,
            'expressionType': this.state.expressionType[0]['label'],
            'status' : this.state.status[0]['label']
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(thisBuildingBlock)
        };
        let thisurl = 'http://localhost:8111/api/v1/adps/'.concat(this.state.id);
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

    handleEventSelection(selectedEvent) {
        this.setState({
            events: selectedEvent,
        })
    }

    handleEntitySelection(selectedEntity) {
        this.setState({
            entity: selectedEntity
        })
    }

    handleExpressionTypeSelection( selectedExpressionType ) {
        this.setState( { 
            expressionType : selectedExpressionType
        } );
    }

    handleStatusChange( selectedStatus ) {
        this.setState( { 
            status : selectedStatus
        } );
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
            var expTypeVal = [];
            expTypeVal.push( { label : buildingBlock[ 'expressionType' ] } )
            var entityVal = [];
            //entityVal.push({ label: buildingBlock['entity'] });
            buildingBlock['entity'].map((key, index) => { entityVal.push({ label: key }) });
            var eventsVal = [];
            buildingBlock['events'].map((key, index) => { eventsVal.push({ label: key }) });
            var statusVal = [];
            statusVal.push( { label : buildingBlock[ 'status' ] } )
            this.setState({
                events: eventsVal,
                entity: entityVal,
                expressionType : expTypeVal,
                status : statusVal
            })
        }
    }

    componentDidMount() {
        fetch('http://localhost:8111/api/v1/adps', { mode: 'cors' })
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
        fetch('http://localhost:8111/api/v1/events', { mode: 'cors' })
            .then(res => res.json())
            .then((data) => {
                var options = [];
                Object.keys(data).map((key, index) => { options.push({ label: key }) });
                this.setState({ eventsList: options });
            })
            .catch(console.log)
        const expTypesArray = [ 'int', 'long', 'double', 'String' ];
        const expTypesOptions = [];
        expTypesArray.map( ( item, index ) => {expTypesOptions.push( { label : item } ) } );
        this.setState({ expressionTypesList : expTypesOptions });

        const statuses = [ 'Active', 'InActive' ];
        const statusOptions = [];
        statuses.map( ( item, index ) => {statusOptions.push( { label : item } ) } );
        this.setState({ statusTypesList : statusOptions });
    }

    render() {
        return (
            <EuiFlexGroup wrap gutterSize="l">
                {cards(this.state.buildingBlocks, this.setFlyoutVisibility)}
                {flyout(this.state.flyoutVisibility, this.setFlyoutVisibility,
                    this.handleInputChange, this.handleSubmit, this.state.id, this.state.name,
                    this.state.description, this.state.events, this.state.entity, this.state.expressionType, 
                    this.state.expressionTypesList, this.handleExpressionTypeSelection, 
                    this.state.expression, this.state.entitiesList, this.state.eventsList,
                    this.handleEntitySelection, this.handleEventSelection,
                    this.state.status, this.state.statusTypesList, this.handleStatusChange )}
            </EuiFlexGroup>
        );
    }
}

export default ADPs;
