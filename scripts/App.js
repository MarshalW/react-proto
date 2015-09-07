'use strict';
import React from 'react';
import MenuBar from './MenuBar';
import TemplatePannel from './TemplatePannel';
import PagePannel from './PagePannel';
import CanvasPannel from './CanvasPannel';

import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

export default class App extends React.Component {
	render() {
		return (
			<div id="root">
				<MenuBar></MenuBar>
				<div id="content">
					<TemplatePannel />
					<RouteHandler/>
					<PagePannel />
				</div>
				<div id="bottomBar"></div>
			</div>
		);
	}
}