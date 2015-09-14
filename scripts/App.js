'use strict';
import React from 'react';
import MenuBar from './MenuBar';
import TemplatePannel from './TemplatePannel';
import PagePannel from './PagePannel';
import CanvasPannel from './CanvasPannel';

import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

var HTML5Backend = require('react-dnd/modules/backends/HTML5');
var DragDropContext = require('react-dnd').DragDropContext;

var App=React.createClass({
	mixins: [ Router.State ],
	render:function(){
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
});

export default DragDropContext(HTML5Backend)(App);
// export default App;