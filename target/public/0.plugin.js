(window["eaPortal_bundle_jsonpfunction"] = window["eaPortal_bundle_jsonpfunction"] || []).push([[0],{

/***/ "./public/application.tsx":
/*!********************************!*\
  !*** ./public/application.tsx ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderApp = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "react-dom"));

var _app = __webpack_require__(/*! ./components/app */ "./public/components/app.tsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const renderApp = ({
  notifications,
  http
}, {
  navigation
}, {
  appBasePath,
  element
}) => {
  _reactDom.default.render(_react.default.createElement(_app.EaPortalApp, {
    basename: appBasePath,
    notifications: notifications,
    http: http,
    navigation: navigation
  }), element);

  return () => _reactDom.default.unmountComponentAtNode(element);
};

exports.renderApp = renderApp;

/***/ }),

/***/ "./public/components/ADPs.js":
/*!***********************************!*\
  !*** ./public/components/ADPs.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _eui = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function cards(buildingBlocks, setFlyoutVisibility) {
  const cardNodes = Object.keys(buildingBlocks).map(function (key, index) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      style: {
        width: 400
      },
      grow: false,
      key: index
    }, _react.default.createElement(_eui.EuiCard, {
      icon: _react.default.createElement(_eui.EuiIcon, {
        size: "xl",
        type: "usersRolesApp"
      }),
      title: buildingBlocks[key]['name'],
      description: buildingBlocks[key]['description'],
      betaBadgeLabel: buildingBlocks[key]['entity'],
      onClick: () => setFlyoutVisibility(true, buildingBlocks[key], key)
    }));
  });
  return cardNodes;
}

function flyout(isFlyoutVisible, setFlyoutVisibility, handleInputChange, handleSubmit, id, name, description, events, entity, expressionType, expression, entitiesList, eventsList, handleEntitySelection, handleEventSelection) {
  let flyout;

  if (isFlyoutVisible) {
    flyout = _react.default.createElement(_eui.EuiFlyout, {
      onClose: () => setFlyoutVisibility(false),
      "aria-labelledby": "flyoutTitle",
      size: 'm',
      maxWidth: 750
    }, _react.default.createElement(_eui.EuiFlyoutHeader, {
      hasBorder: true
    }, _react.default.createElement(_eui.EuiTitle, {
      size: "m"
    }, _react.default.createElement("h2", {
      id: "flyoutTitle"
    }, name))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true,
      label: "ID"
    }, _react.default.createElement(_eui.EuiFieldText, {
      fullWidth: true,
      name: "id",
      value: id,
      onChange: e => handleInputChange(e)
    })), _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true,
      label: "Name"
    }, _react.default.createElement(_eui.EuiFieldText, {
      fullWidth: true,
      name: "name",
      value: name,
      onChange: e => handleInputChange(e)
    })), _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true,
      label: "Description"
    }, _react.default.createElement(_eui.EuiFieldText, {
      fullWidth: true,
      name: "description",
      value: description,
      onChange: e => handleInputChange(e)
    })), _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true,
      label: "Events"
    }, _react.default.createElement(_eui.EuiComboBox, {
      fullWidth: true,
      selectedOptions: events,
      options: eventsList,
      onChange: e => handleEventSelection(e)
    })), _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true,
      label: "Entity"
    }, _react.default.createElement(_eui.EuiComboBox, {
      singleSelection: {
        asPlainText: true
      },
      fullWidth: true,
      selectedOptions: entity,
      options: entitiesList,
      onChange: e => handleEntitySelection(e)
    })), _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true,
      label: "Type"
    }, _react.default.createElement(_eui.EuiFieldText, {
      fullWidth: true,
      name: "expressionType",
      value: expressionType,
      onChange: e => handleInputChange(e)
    })), _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true,
      label: "Snippet"
    }, _react.default.createElement(_eui.EuiTextArea, {
      fullWidth: true,
      name: "expression",
      value: expression,
      onChange: e => handleInputChange(e)
    })), _react.default.createElement(_eui.EuiFormRow, {
      display: "center"
    }, _react.default.createElement(_eui.EuiButton, {
      type: "submit",
      fill: true,
      onClick: e => handleSubmit(e)
    }, "Submit"))));
  }

  return flyout;
}

class ADPs extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      buildingBlocks: {},
      flyoutVisibility: false,
      selectedBuildingBlock: {}
    };
    this.setFlyoutVisibility = this.setFlyoutVisibility.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEventSelection = this.handleEventSelection.bind(this);
    this.handleEntitySelection = this.handleEntitySelection.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let selectedEvents = [];
    this.state.events.map((item, index) => {
      selectedEvents.push(item['label']);
    });
    let thisBuildingBlock = {
      'name': this.state.name,
      'description': this.state.description,
      'expression': this.state.expression,
      'entity': this.state.entity[0]['label'],
      'events': selectedEvents,
      'expressionType': this.state.expressionType
    };
    alert(JSON.stringify(thisBuildingBlock));
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(thisBuildingBlock)
    };
    let thisurl = 'http://localhost:8111/api/v1/adps/'.concat(this.state.id);
    fetch(thisurl, requestOptions).then(res => res.json()).then(data => {
      this.setState({
        buildingBlocks: data
      });
    }).catch(console.log);
    this.setFlyoutVisibility(false, {}, '');
  }

  handleInputChange(event) {
    const target = event.target;
    if (target.name === 'name') this.setState({
      name: target.value
    });
    if (target.name === 'id') this.setState({
      id: target.value
    });
    if (target.name === 'description') this.setState({
      description: target.value
    });
    if (target.name === 'expression') this.setState({
      expression: target.value
    });
    if (target.name === 'expressionType') this.setState({
      expressionType: target.value
    });
  }

  handleEventSelection(selectedEvent) {
    this.setState({
      events: selectedEvent
    });
  }

  handleEntitySelection(selectedEntity) {
    this.setState({
      entity: selectedEntity
    });
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
        expressionType: buildingBlock['expressionType']
      });
      var entityVal = [];
      entityVal.push({
        label: buildingBlock['entity']
      });
      var eventsVal = [];
      buildingBlock['events'].map((key, index) => {
        eventsVal.push({
          label: key
        });
      });
      this.setState({
        events: eventsVal,
        entity: entityVal
      });
    }
  }

  componentDidMount() {
    fetch('http://localhost:8111/api/v1/adps', {
      mode: 'cors'
    }).then(res => res.json()).then(data => {
      this.setState({
        buildingBlocks: data
      });
    }).catch(console.log);
    fetch('http://localhost:8111/api/v1/entities', {
      mode: 'cors'
    }).then(res => res.json()).then(data => {
      var options = [];
      Object.keys(data).map((key, index) => {
        options.push({
          label: key
        });
      });
      this.setState({
        entitiesList: options
      });
    }).catch(console.log);
    fetch('http://localhost:8111/api/v1/events', {
      mode: 'cors'
    }).then(res => res.json()).then(data => {
      var options = [];
      Object.keys(data).map((key, index) => {
        options.push({
          label: key
        });
      });
      this.setState({
        eventsList: options
      });
    }).catch(console.log);
  }

  render() {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      wrap: true,
      gutterSize: "l"
    }, cards(this.state.buildingBlocks, this.setFlyoutVisibility), flyout(this.state.flyoutVisibility, this.setFlyoutVisibility, this.handleInputChange, this.handleSubmit, this.state.id, this.state.name, this.state.description, this.state.events, this.state.entity, this.state.expressionType, this.state.expression, this.state.entitiesList, this.state.eventsList, this.handleEntitySelection, this.handleEventSelection));
  }

}

var _default = ADPs;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./public/components/app.tsx":
/*!***********************************!*\
  !*** ./public/components/app.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EaPortalApp = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _ADPs = _interopRequireDefault(__webpack_require__(/*! ./ADPs */ "./public/components/ADPs.js"));

var _eui = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const EaPortalApp = ({
  basename,
  notifications,
  http,
  navigation
}) => {
  const [selectedItemName, setSelectedItem] = (0, _react.useState)('Lion stuff');

  const selectItem = name => {
    setSelectedItem(name);
  };

  const createItem = (name, url, data = {}) => {
    // NOTE: Duplicate `name` values will cause `id` collisions.
    return { ...data,
      id: name,
      name,
      isSelected: selectedItemName === name,
      onClick: () => selectItem(name),
      href: url
    };
  };

  const tabs = [{
    id: 'events',
    name: _react.default.createElement("span", null, _react.default.createElement(_eui.EuiIcon, {
      type: "aggregate"
    }), "\xA0EVENTS"),
    content: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h3", null, "Cobalt")), _react.default.createElement(_eui.EuiText, null, "Cobalt is a chemical element with symbol Co and atomic number 27. Like nickel, cobalt is found in the Earth\u2019s crust only in chemically combined form, save for small deposits found in alloys of natural meteoric iron. The free element, produced by reductive smelting, is a hard, lustrous, silver-gray metal."))
  }, {
    id: 'entities',
    name: _react.default.createElement("span", null, _react.default.createElement(_eui.EuiIcon, {
      type: "users"
    }), "\xA0ENTITIES"),
    content: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h3", null, "Entities")), _react.default.createElement(_eui.EuiText, null, "Entities could be people or airlines or any real world object that we want to collect insights about..."))
  }, {
    id: 'ADPs',
    name: _react.default.createElement("span", null, _react.default.createElement(_eui.EuiIcon, {
      type: "usersRolesApp"
    }), "\xA0ADPs"),
    content: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_ADPs.default, null))
  }, {
    id: 'states',
    name: _react.default.createElement("span", null, _react.default.createElement(_eui.EuiIcon, {
      type: "tag"
    }), "\xA0STATES"),
    content: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h3", null, "Monosodium Glutamate")), _react.default.createElement(_eui.EuiText, null, "Monosodium glutamate (MSG, also known as sodium glutamate) is the sodium salt of glutamic acid, one of the most abundant naturally occurring non-essential amino acids. Monosodium glutamate is found naturally in tomatoes, cheese and other foods."))
  }, {
    id: 'entity360',
    name: _react.default.createElement("span", null, _react.default.createElement(_eui.EuiIcon, {
      type: "searchProfilerApp"
    }), "\xA0ENTITY 360"),
    content: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h3", null, "Monosodium Glutamate")), _react.default.createElement(_eui.EuiText, null, "Monosodium glutamate (MSG, also known as sodium glutamate) is the sodium salt of glutamic acid, one of the most abundant naturally occurring non-essential amino acids. Monosodium glutamate is found naturally in tomatoes, cheese and other foods."))
  }]; // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.

  return _react.default.createElement(_eui.EuiPage, null, _react.default.createElement(_eui.EuiPageBody, {
    component: "div"
  }, _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiPageContentHeader, null, _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, _react.default.createElement(_eui.EuiIcon, {
    type: "graphApp",
    color: "primary",
    size: "xl"
  }), "\xA0\xA0Entity Analytics")))), _react.default.createElement(_eui.EuiPageContentBody, null, _react.default.createElement(_eui.EuiTabbedContent, {
    tabs: tabs,
    initialSelectedTab: tabs[0]['id'],
    autoFocus: "selected",
    onTabClick: tab => {
      console.log('clicked tab', tab);
    }
  })))));
};

exports.EaPortalApp = EaPortalApp;

/***/ })

}]);
//# sourceMappingURL=0.plugin.js.map