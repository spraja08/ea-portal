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

import React, { Fragment, useState } from 'react';
import { i18n } from '@kbn/i18n';
import { FormattedMessage, I18nProvider } from '@kbn/i18n/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ADPs from './ADPs';

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
  EuiIcon,
  EuiSpacer,
  EuiText,
  EuiTabbedContent
} from '@elastic/eui';

import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';

import { PLUGIN_ID, PLUGIN_NAME } from '../../common';

interface EaPortalAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}

export const EaPortalApp = ({ basename, notifications, http, navigation }: EaPortalAppDeps) => {

  const [selectedItemName, setSelectedItem] = useState('Lion stuff');

  const selectItem = name => {
    setSelectedItem(name);
  };

  const createItem = (name, url, data = {}) => {
    // NOTE: Duplicate `name` values will cause `id` collisions.
    return {
      ...data,
      id: name,
      name,
      isSelected: selectedItemName === name,
      onClick: () => selectItem(name),
      href: url
    };
  };

  const tabs = [
    {
      id: 'events',
      name: (
        <span>
          <EuiIcon type="aggregate" />
          &nbsp;EVENTS
        </span>
      ),
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiTitle>
            <h3>Cobalt</h3>
          </EuiTitle>
          <EuiText>
            Cobalt is a chemical element with symbol Co and atomic number 27.
            Like nickel, cobalt is found in the Earth&rsquo;s crust only in
            chemically combined form, save for small deposits found in alloys of
            natural meteoric iron. The free element, produced by reductive
            smelting, is a hard, lustrous, silver-gray metal.
          </EuiText>
        </Fragment>
      ),
    },
    {
      id: 'entities',
      name: (
        <span>
          <EuiIcon type="users" />
          &nbsp;ENTITIES
        </span>
      ),
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiTitle>
            <h3>Entities</h3>
          </EuiTitle>
          <EuiText>
            Entities could be people or airlines or any real world object that we want to collect insights about...
          </EuiText>
        </Fragment>
      ),
    },
    {
      id: 'ADPs',
      name: (
        <span>
          <EuiIcon type="usersRolesApp" />
          &nbsp;ADPs
        </span>
      ),
      content: (
        <Fragment>
          <EuiSpacer />
          <ADPs />
        </Fragment>
      ),
    },
    {
      id: 'states',
      name: (
        <span>
          <EuiIcon type="tag" />
          &nbsp;STATES
        </span>
      ),
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiTitle>
            <h3>Monosodium Glutamate</h3>
          </EuiTitle>
          <EuiText>
            Monosodium glutamate (MSG, also known as sodium glutamate) is the
            sodium salt of glutamic acid, one of the most abundant naturally
            occurring non-essential amino acids. Monosodium glutamate is found
            naturally in tomatoes, cheese and other foods.
          </EuiText>
        </Fragment>
      ),
    },
    {
      id: 'entity360',
      name: (
        <span>
          <EuiIcon type="searchProfilerApp" />
          &nbsp;ENTITY 360
        </span>
      ), content: (
        <Fragment>
          <EuiSpacer />
          <EuiTitle>
            <h3>Monosodium Glutamate</h3>
          </EuiTitle>
          <EuiText>
            Monosodium glutamate (MSG, also known as sodium glutamate) is the
            sodium salt of glutamic acid, one of the most abundant naturally
            occurring non-essential amino acids. Monosodium glutamate is found
            naturally in tomatoes, cheese and other foods.
          </EuiText>
        </Fragment>
      ),
    },
  ];


  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.
  return (
    <EuiPage>
      <EuiPageBody component="div">
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h2><EuiIcon type="graphApp" color="primary" size="xl" />&nbsp;&nbsp;Entity Analytics</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <EuiTabbedContent
              tabs={tabs}
              initialSelectedTab={tabs[0]['id']}
              autoFocus="selected"
              onTabClick={tab => {
                console.log('clicked tab', tab);
              }}
            />
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
