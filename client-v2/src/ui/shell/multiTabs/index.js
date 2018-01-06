//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
//
// Microsoft Bot Framework: http://botframework.com
//
// Bot Framework Emulator Github:
// https://github.com/Microsoft/BotFramwork-Emulator
//
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

import { css } from 'glamor';
import PropTypes from 'prop-types';
import React from 'react';

import TabBar from './tabBar';
import TabBarTab from './tabBarTab';
import TabbedDocument, { Tab as TabbedDocumentTab, Content as TabbedDocumentContent } from './tabbedDocument';
import { filterChildren } from '../../utils';

const CSS = css({
    backgroundColor: 'orange',
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
});

export default class MultiTabs extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(nextValue) {
        this.props.onChange && this.props.onChange(nextValue);
    }

    render() {
        return (
            <div className={ CSS }>
                <TabBar>
                    {
                        React.Children.map(this.props.children, (tabbedDocument, index) =>
                            <TabBarTab onClick={ this.handleTabClick.bind(this, index) }>
                                { filterChildren(tabbedDocument.props.children, child => child.type === TabbedDocumentTab) }
                            </TabBarTab>
                        )
                    }
                </TabBar>
                { filterChildren(React.Children.toArray(this.props.children)[this.props.value].props.children, child => child.type === TabbedDocumentContent) }
            </div>
        );
    }
}

MultiTabs.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.number
};
