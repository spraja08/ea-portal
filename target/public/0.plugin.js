(window["eaPortal_bundle_jsonpfunction"] = window["eaPortal_bundle_jsonpfunction"] || []).push([[0],{

/***/ "../../node_modules/process/browser.js":
/*!************************************************************************************!*\
  !*** /Users/rspamzn/cloudLabs/dependencies/kibana/node_modules/process/browser.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

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
        width: 300
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
      betaBadgeLabel: JSON.stringify(buildingBlocks[key]['entity']).replace("[", "").replace("]", "").replace(/"/g, ''),
      onClick: () => setFlyoutVisibility(true, buildingBlocks[key], key)
    }));
  });
  return cardNodes;
}

function flyout(isFlyoutVisible, setFlyoutVisibility, handleInputChange, handleSubmit, id, name, description, events, entity, expressionType, expressionTypesList, handleExpressionTypeSelection, expression, entitiesList, eventsList, handleEntitySelection, handleEventSelection, status, statusTypesList, handleStatusSelection) {
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
    }, _react.default.createElement("h5", {
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
      fullWidth: true,
      selectedOptions: entity,
      options: entitiesList,
      onChange: e => handleEntitySelection(e)
    })), _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true,
      label: "Window"
    }, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiFlexGroup, {
      wrap: true,
      gutterSize: "l"
    }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCheckbox, {
      id: "hourly",
      label: "Hourly",
      checked: false
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCheckbox, {
      id: "daily",
      label: "Daily",
      checked: false
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCheckbox, {
      id: "monthly",
      label: "Monthly",
      checked: false
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCheckbox, {
      id: "yearly",
      label: "Yealy",
      checked: false
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCheckbox, {
      id: "session",
      label: "Session",
      checked: false
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCheckbox, {
      id: "perpetual",
      label: "Perpetual",
      checked: true
    }))))), _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true,
      label: "Type"
    }, _react.default.createElement(_eui.EuiComboBox, {
      singleSelection: {
        asPlainText: true
      },
      fullWidth: true,
      selectedOptions: expressionType,
      options: expressionTypesList,
      onChange: e => handleExpressionTypeSelection(e)
    })), _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true,
      label: "Snippet"
    }, _react.default.createElement(_eui.EuiTextArea, {
      fullWidth: true,
      name: "expression",
      value: expression,
      onChange: e => handleInputChange(e)
    })), _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true,
      label: "Status"
    }, _react.default.createElement(_eui.EuiComboBox, {
      singleSelection: {
        asPlainText: true
      },
      fullWidth: true,
      selectedOptions: status,
      options: statusTypesList,
      onChange: e => handleStatusSelection(e)
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
    this.handleExpressionTypeSelection = this.handleExpressionTypeSelection.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let selectedEvents = [];
    this.state.events.map((item, index) => {
      selectedEvents.push(item['label']);
    });
    let selectedEntity = [];
    this.state.entity.map((item, index) => {
      selectedEntity.push(item['label']);
    });
    let thisBuildingBlock = {
      'id': this.state.id,
      'name': this.state.name,
      'description': this.state.description,
      'expression': this.state.expression,
      'entity': selectedEntity,
      'events': selectedEvents,
      'expressionType': this.state.expressionType[0]['label'],
      'status': this.state.status[0]['label']
    };
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(thisBuildingBlock)
    };
    let thisurl = 'http://54.255.195.248:8111/api/v1/adps/'.concat(this.state.id);
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

  handleExpressionTypeSelection(selectedExpressionType) {
    this.setState({
      expressionType: selectedExpressionType
    });
  }

  handleStatusChange(selectedStatus) {
    this.setState({
      status: selectedStatus
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
        expression: buildingBlock['expression']
      });
      var expTypeVal = [];
      expTypeVal.push({
        label: buildingBlock['expressionType']
      });
      var entityVal = []; //entityVal.push({ label: buildingBlock['entity'] });

      buildingBlock['entity'].map((key, index) => {
        entityVal.push({
          label: key
        });
      });
      var eventsVal = [];
      buildingBlock['events'].map((key, index) => {
        eventsVal.push({
          label: key
        });
      });
      var statusVal = [];
      statusVal.push({
        label: buildingBlock['status']
      });
      this.setState({
        events: eventsVal,
        entity: entityVal,
        expressionType: expTypeVal,
        status: statusVal
      });
    }
  }

  componentDidMount() {
    fetch('http://54.255.195.248:8111/api/v1/adps', {
      mode: 'cors'
    }).then(res => res.json()).then(data => {
      this.setState({
        buildingBlocks: data
      });
    }).catch(console.log);
    fetch('http://54.255.195.248:8111/api/v1/entities', {
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
    fetch('http://54.255.195.248:8111/api/v1/events', {
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
    const expTypesArray = ['int', 'long', 'double', 'String'];
    const expTypesOptions = [];
    expTypesArray.map((item, index) => {
      expTypesOptions.push({
        label: item
      });
    });
    this.setState({
      expressionTypesList: expTypesOptions
    });
    const statuses = ['Active', 'InActive'];
    const statusOptions = [];
    statuses.map((item, index) => {
      statusOptions.push({
        label: item
      });
    });
    this.setState({
      statusTypesList: statusOptions
    });
  }

  render() {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      wrap: true,
      gutterSize: "l"
    }, cards(this.state.buildingBlocks, this.setFlyoutVisibility), flyout(this.state.flyoutVisibility, this.setFlyoutVisibility, this.handleInputChange, this.handleSubmit, this.state.id, this.state.name, this.state.description, this.state.events, this.state.entity, this.state.expressionType, this.state.expressionTypesList, this.handleExpressionTypeSelection, this.state.expression, this.state.entitiesList, this.state.eventsList, this.handleEntitySelection, this.handleEventSelection, this.state.status, this.state.statusTypesList, this.handleStatusChange));
  }

}

var _default = ADPs;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./public/components/Entities.js":
/*!***************************************!*\
  !*** ./public/components/Entities.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _eui = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");

var _GeoFence = _interopRequireDefault(__webpack_require__(/*! ./GeoFence */ "./public/components/GeoFence.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function cards(buildingBlocks, setFlyoutVisibility) {
  const cardNodes = Object.keys(buildingBlocks).map(function (key, index) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      style: {
        width: 300
      },
      grow: false,
      key: index
    }, _react.default.createElement(_eui.EuiCard, {
      icon: _react.default.createElement(_eui.EuiIcon, {
        size: "xl",
        type: "users"
      }),
      title: buildingBlocks[key]['name'],
      description: buildingBlocks[key]['description'],
      onClick: () => setFlyoutVisibility(true, buildingBlocks[key], key)
    }));
  });
  return cardNodes;
}

function flyout(isFlyoutVisible, setFlyoutVisibility, handleInputChange, handleSubmit, id, name, description, geoFence, handleRemoveGeoFence, groupKeys) {
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
      label: "Id Field (from Events Schema)"
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
      label: "Entity Hierarchy"
    }, _react.default.createElement(_eui.EuiFieldText, {
      fullWidth: true,
      name: "hiterarcy",
      value: groupKeys,
      onChange: e => handleInputChange(e)
    })), _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true,
      label: "GeoFence"
    }, _react.default.createElement(_GeoFence.default, {
      ref: "GeoFenceComponent",
      geoFenceCoords: geoFence
    })), _react.default.createElement(_eui.EuiFormRow, {
      display: "center"
    }, _react.default.createElement("div", null, _react.default.createElement(_eui.EuiButton, {
      type: "submit",
      fill: true,
      onClick: e => handleRemoveGeoFence(e)
    }, "Remove"), "\xA0\xA0\xA0\xA0", _react.default.createElement(_eui.EuiButton, {
      type: "submit",
      fill: true,
      onClick: e => handleSubmit(e)
    }, "Submit")))));
  }

  return flyout;
}

class Entities extends _react.Component {
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
    this.refs.GeoFenceComponent.getGeoFence().map((coord, index) => {
      latArray.push(coord[0]);
      lngArray.push(coord[1]);
    });
    let thisBuildingBlock = {
      'id': this.state.id,
      'name': this.state.name,
      'description': this.state.description,
      'groupByKeys': [this.state.id],
      'geoFence': this.refs.GeoFenceComponent.getGeoFence(),
      'latArray': latArray,
      'lngArray': lngArray
    };
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(thisBuildingBlock)
    };
    let thisurl = 'http://54.255.195.248:8111/api/v1/entities/'.concat(this.state.id);
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
  }

  setFlyoutVisibility(visibility, buildingBlock, buildingBlockId) {
    this.setState({
      flyoutVisibility: visibility,
      selectedBuildingBlock: buildingBlock
    });

    if (visibility) {
      var groupKeysStr = "";
      buildingBlock['groupByKeys'].map((key, index) => {
        if (index == 0) groupKeysStr += key;else groupKeysStr += " --> " + key;
      });
      this.setState({
        id: buildingBlock['id'],
        name: buildingBlock['name'],
        description: buildingBlock['description'],
        geoFence: buildingBlock['geoFence'],
        groupKeys: groupKeysStr
      });
    }
  }

  componentDidMount() {
    fetch('http://54.255.195.248:8111/api/v1/entities', {
      mode: 'cors'
    }).then(res => res.json()).then(data => {
      this.setState({
        buildingBlocks: data
      });
    }).catch(console.log);
  }

  render() {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      wrap: true,
      gutterSize: "l"
    }, cards(this.state.buildingBlocks, this.setFlyoutVisibility), flyout(this.state.flyoutVisibility, this.setFlyoutVisibility, this.handleInputChange, this.handleSubmit, this.state.id, this.state.name, this.state.description, this.state.geoFence, this.removeGeoFence, this.state.groupKeys));
  }

}

var _default = Entities;
exports.default = _default;
module.exports = exports.default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/process/browser.js */ "../../node_modules/process/browser.js")))

/***/ }),

/***/ "./public/components/Events.js":
/*!*************************************!*\
  !*** ./public/components/Events.js ***!
  \*************************************/
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
        width: 300
      },
      grow: false,
      key: index
    }, _react.default.createElement(_eui.EuiCard, {
      icon: _react.default.createElement(_eui.EuiIcon, {
        size: "xl",
        type: "aggregate"
      }),
      title: buildingBlocks[key]['name'],
      onClick: () => setFlyoutVisibility(true, buildingBlocks[key], key)
    }));
  });
  return cardNodes;
}

function flyout(isFlyoutVisible, setFlyoutVisibility, handleInputChange, handleSubmit, id, name, schema) {
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
      label: "Schema"
    }, _react.default.createElement(_eui.EuiTextArea, {
      style: {
        height: 350
      },
      fullWidth: true,
      name: "schema",
      value: JSON.stringify(schema, null, 4),
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

class Events extends _react.Component {
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
  }

  handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(this.state.schema)
    };
    let thisurl = 'http://54.255.195.248:8111/api/v1/events/'.concat(this.state.id);
    fetch(thisurl, requestOptions).then(res => res.json()).then(data => {
      this.setState({
        buildingBlocks: data
      });
    }).catch(console.log);
    this.setFlyoutVisibility(false, {}, '');
  }

  handleInputChange(event) {
    const target = event.target;
    if (target.name === 'id') this.setState({
      id: target.value
    });
    if (target.name === 'schema') this.setState({
      schema: JSON.parse(target.value)
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
        schema: buildingBlock
      });
    }
  }

  componentDidMount() {
    fetch('http://54.255.195.248:8111/api/v1/events', {
      mode: 'cors'
    }).then(res => res.json()).then(data => {
      this.setState({
        buildingBlocks: data
      });
    }).catch(console.log);
  }

  render() {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      wrap: true,
      gutterSize: "l"
    }, cards(this.state.buildingBlocks, this.setFlyoutVisibility), flyout(this.state.flyoutVisibility, this.setFlyoutVisibility, this.handleInputChange, this.handleSubmit, this.state.id, this.state.name, this.state.schema));
  }

}

var _default = Events;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./public/components/GeoFence.js":
/*!***************************************!*\
  !*** ./public/components/GeoFence.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class GeoFence extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "googleMapRef", _react.default.createRef());

    _defineProperty(this, "searchBoxRef", _react.default.createRef());

    _defineProperty(this, "overlayComplete", event => {
      let path = [];
      let fencePoints = event.overlay.getPath();
      fencePoints.forEach(function (xy, i) {
        path.push([xy.lat(), xy.lng()]);
      });
      this.setState({
        vertices: path
      });
      this.setState({
        geofenceOverlay: event.overlay
      });
    });

    _defineProperty(this, "createGoogleMap", () => new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 13,
      center: {
        lat: 1.3053603738630137,
        lng: 103.91608884736023
      },
      mapTypeControl: false
    }));

    _defineProperty(this, "addSearchBox", map => {
      // Create the search box and link it to the UI element.
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(this.searchBoxRef.current);
      var searchBox = new window.google.maps.places.SearchBox(this.searchBoxRef.current);
      window.google.maps.event.addListener(searchBox, 'places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        } // For each place, get the icon, place name, and location.


        var markers = [];
        var bounds = new window.google.maps.LatLngBounds();

        for (var i = 0, place; place = places[i]; i++) {
          var image = {
            url: place.icon,
            size: new window.google.maps.Size(71, 71),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(17, 34),
            scaledSize: new window.google.maps.Size(25, 25)
          }; // Create a marker for each place.

          var marker = new window.google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
          });
          markers.push(marker);
          bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
      }); // Bias the SearchBox results towards places that are within the bounds of the
      // current map's viewport.

      window.google.maps.event.addListener(map, 'bounds_changed', function () {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
      });
    });

    let incomingFence = [];
    if (props.geoFenceCoords != null && props.geoFenceCoords.length > 0) incomingFence = props.geoFenceCoords;
    this.state = {
      vertices: incomingFence
    };
    this.removeShape = this.removeShape.bind(this);
  }

  initialiseFence(map) {
    if (this.state.vertices.length == 0) return;
    var initialfenceCoords = [];
    var bounds = new window.google.maps.LatLngBounds();

    for (var i = 0; i < this.state.vertices.length; i++) {
      var pt = new window.google.maps.LatLng(this.state.vertices[i][0], this.state.vertices[i][1]);
      initialfenceCoords.push(pt);
      bounds.extend(pt);
    }

    var initialfence = new window.google.maps.Polygon({
      paths: initialfenceCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map
    });
    initialfence.setMap(map);
    map.fitBounds(bounds);
    this.setState({
      geofenceOverlay: initialfence
    });
  }

  componentDidMount() {
    this.createMapWithSearchBox();
  }

  createMapWithSearchBox() {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDNky_CeUScOyH3-d-NGfXEAQVhP-n9PK8&libraries=places,geometry,drawing';
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener('load', () => {
      this.googleMap = this.createGoogleMap();
      this.drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [window.google.maps.drawing.OverlayType.POLYGON]
        },
        polygonOptions: {
          editable: true
        }
      });
      this.drawingManager.setMap(this.googleMap);
      window.google.maps.event.addListener(this.drawingManager, 'overlaycomplete', this.overlayComplete);
      this.initialiseFence(this.googleMap);
      this.addSearchBox(this.googleMap);
    });
  }

  removeShape() {
    this.state.geofenceOverlay.setMap(null);
    this.setState({
      vertices: null
    });
  }

  getGeoFence() {
    return this.state.vertices;
  }

  render() {
    return _react.default.createElement("div", null, _react.default.createElement("div", null, _react.default.createElement("input", {
      id: "pac-input",
      style: {
        width: '300px',
        height: '20px'
      },
      class: "controls",
      type: "text",
      placeholder: "Search Box",
      ref: this.searchBoxRef
    })), _react.default.createElement("div", {
      id: "google-map",
      ref: this.googleMapRef,
      style: {
        height: '400px'
      }
    }));
  }

}

var _default = GeoFence;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./public/components/Simulator.js":
/*!****************************************!*\
  !*** ./public/components/Simulator.js ***!
  \****************************************/
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

function formatJsonAttributes(document) {
  const cards = Object.keys(document).map((key, index) => {
    return _react.default.createElement(_eui.EuiText, {
      size: "s"
    }, key + ' : ' + document[key]);
  });
  return cards;
}

function entityCards(entity360) {
  const cardNodes = Object.keys(entity360).map(function (key, index) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      style: {
        width: 350
      },
      grow: false,
      key: index
    }, _react.default.createElement(_eui.EuiCard, {
      textAlign: "left",
      title: key
    }, _react.default.createElement(_eui.EuiText, {
      size: "s"
    }, _react.default.createElement("b", null, "ADPs:")), formatJsonAttributes(entity360[key]['ADPs']), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiText, {
      size: "s"
    }, _react.default.createElement("b", null, "STATES:")), formatJsonAttributes(entity360[key]['states'])));
  });
  return cardNodes;
}

function cards(buildingBlocks, setFlyoutVisibility) {
  const cardNodes = Object.keys(buildingBlocks).map(function (key, index) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      style: {
        width: 300
      },
      grow: false,
      key: index
    }, _react.default.createElement(_eui.EuiCard, {
      icon: _react.default.createElement(_eui.EuiIcon, {
        size: "xl",
        type: "aggregate"
      }),
      title: buildingBlocks[key]['name'],
      onClick: () => setFlyoutVisibility(true, buildingBlocks[key], key, buildingBlocks[key]['name'])
    }));
  });
  return cardNodes;
}

function flyout(isFlyoutVisible, setFlyoutVisibility, handleInputChange, handleSubmit, id, name, schema) {
  let flyout;

  if (isFlyoutVisible) {
    flyout = _react.default.createElement(_eui.EuiFlyout, {
      onClose: () => setFlyoutVisibility(false),
      "aria-labelledby": "flyoutTitle",
      size: 's',
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
      label: "Schema"
    }, _react.default.createElement(_eui.EuiTextArea, {
      style: {
        height: 350
      },
      fullWidth: true,
      name: "schema",
      value: JSON.stringify(schema, null, 4),
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

class Simulator extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      buildingBlocks: {},
      flyoutVisibility: false,
      entity360: {}
    };
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
    fetch(thisurl, requestOptions).then(res => res.json()).then(data => {
      this.setState({
        entity360: data
      });
      console.log(data);
    }).catch(console.log);
    this.setFlyoutVisibility(true, {}, this.state.id, this.state.name);
  }

  handleInputChange(event) {
    const target = event.target;
    if (target.name === 'id') this.setState({
      id: target.value
    });
    if (target.name === 'schema') this.setState({
      schema: JSON.parse(target.value)
    });
  }

  setFlyoutVisibility(visibility, buildingBlock, buildingBlockId, buildingBlockName) {
    let eventData = {};
    if (buildingBlockId === 'FlightBooking') eventData = {
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
    };else if (buildingBlockId === 'TrainBooking') eventData = {
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
    };else if (buildingBlockId == 'AccommodationBooking') eventData = {
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
    };
    this.setState({
      flyoutVisibility: visibility
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
    fetch('http://54.255.195.248:8111/api/v1/events', {
      mode: 'cors'
    }).then(res => res.json()).then(data => {
      this.setState({
        buildingBlocks: data
      });
    }).catch(console.log);
  }

  render() {
    return _react.default.createElement("div", null, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiFlexGroup, {
      wrap: true,
      gutterSize: "l"
    }, cards(this.state.buildingBlocks, this.setFlyoutVisibility), flyout(this.state.flyoutVisibility, this.setFlyoutVisibility, this.handleInputChange, this.handleSubmit, this.state.id, this.state.name, this.state.schema))), _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true,
      label: "Entities 360 After Event Processing :"
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      wrap: true,
      gutterSize: "l"
    }, entityCards(this.state.entity360)))));
  }

}

var _default = Simulator;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./public/components/States.js":
/*!*************************************!*\
  !*** ./public/components/States.js ***!
  \*************************************/
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
        width: 300
      },
      grow: false,
      key: index
    }, _react.default.createElement(_eui.EuiCard, {
      icon: _react.default.createElement(_eui.EuiIcon, {
        size: "xl",
        type: "tag"
      }),
      title: buildingBlocks[key]['name'],
      description: buildingBlocks[key]['description'],
      betaBadgeLabel: JSON.stringify(buildingBlocks[key]['entity']).replace("[", "").replace("]", "").replace(/"/g, ''),
      onClick: () => setFlyoutVisibility(true, buildingBlocks[key], key)
    }));
  });
  return cardNodes;
}

function flyout(isFlyoutVisible, setFlyoutVisibility, handleInputChange, handleSubmit, id, name, description, entity, expression, entitiesList, handleEntitySelection) {
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
      label: "Entity"
    }, _react.default.createElement(_eui.EuiComboBox, {
      fullWidth: true,
      selectedOptions: entity,
      options: entitiesList,
      onChange: e => handleEntitySelection(e)
    })), _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true
    }, _react.default.createElement(_eui.EuiSwitch, {
      label: "Capture State Changes",
      checked: false
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

class States extends _react.Component {
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
    this.handleEntitySelection = this.handleEntitySelection.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let selectedEntity = [];
    this.state.entity.map((item, index) => {
      selectedEntity.push(item['label']);
    });
    let thisBuildingBlock = {
      'id': this.state.id,
      'name': this.state.name,
      'description': this.state.description,
      'expression': this.state.expression,
      'entity': selectedEntity
    };
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(thisBuildingBlock)
    };
    let thisurl = 'http://54.255.195.248:8111/api/v1/states/'.concat(this.state.id);
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
        expression: buildingBlock['expression']
      });
      var entityVal = []; //entityVal.push({ label: buildingBlock['entity'] });

      buildingBlock['entity'].map((key, index) => {
        entityVal.push({
          label: key
        });
      });
      this.setState({
        entity: entityVal
      });
    }
  }

  componentDidMount() {
    fetch('http://54.255.195.248:8111/api/v1/states', {
      mode: 'cors'
    }).then(res => res.json()).then(data => {
      this.setState({
        buildingBlocks: data
      });
    }).catch(console.log);
    fetch('http://54.255.195.248:8111/api/v1/entities', {
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
  }

  render() {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      wrap: true,
      gutterSize: "l"
    }, cards(this.state.buildingBlocks, this.setFlyoutVisibility), flyout(this.state.flyoutVisibility, this.setFlyoutVisibility, this.handleInputChange, this.handleSubmit, this.state.id, this.state.name, this.state.description, this.state.entity, this.state.expression, this.state.entitiesList, this.handleEntitySelection));
  }

}

var _default = States;
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

var _Entities = _interopRequireDefault(__webpack_require__(/*! ./Entities */ "./public/components/Entities.js"));

var _States = _interopRequireDefault(__webpack_require__(/*! ./States */ "./public/components/States.js"));

var _Events = _interopRequireDefault(__webpack_require__(/*! ./Events */ "./public/components/Events.js"));

var _Simulator = _interopRequireDefault(__webpack_require__(/*! ./Simulator */ "./public/components/Simulator.js"));

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
    content: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_Events.default, null))
  }, {
    id: 'entities',
    name: _react.default.createElement("span", null, _react.default.createElement(_eui.EuiIcon, {
      type: "users"
    }), "\xA0ENTITIES"),
    content: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_Entities.default, null))
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
    content: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_States.default, null))
  }, {
    id: 'generator',
    name: _react.default.createElement("span", null, _react.default.createElement(_eui.EuiIcon, {
      type: "menuRight"
    }), "\xA0GENERATE EVENTS"),
    content: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_Simulator.default, null))
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