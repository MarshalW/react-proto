'use strict';
import React , { PropTypes } from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import axios from 'axios';
import _ from 'lodash';
import { DragSource } from 'react-dnd';
import PageStore from './PageStore';
import AppDispatcher from './AppDispatcher';

var PageItem=React.createClass({
	mixins: [ Router.State ],
	handleClick:function(){
		console.log('handle item click');
		AppDispatcher.dispatch({
			eventName:'loadPage',
			pageId:this.props.pageItem.id
		});

		var params={
			pageId:this.props.pageItem.id,
			magazineId:this.getParams().magazineId
		};

		this.context.router.transitionTo('switchPage',params);
	},
	render: function() {
		console.log('=====>>>>>render page item');
		let backgroundColor='Turquoise';

		if(this.props.pageItem.id==this.getParams().pageId){
			console.log('===>>>selected! ');
			backgroundColor='SpringGreen'; 
		}

		let style = {
			margin: '5px 5px 5px 5px',
			width: '95%', // TODO 右空白边有问题才这么做的
			height: '40px',
			minHeight: '40px',
			backgroundColor:backgroundColor,
  			display: 'flex',
 		  	alignItems: 'center'
		};

		return ( 
			< div className = "pageItem"
				style = {style} onClick={this.handleClick}>
				<span>{this.props.pageIndex}.</span>
				<div>{this.props.pageItem.name}</div>
			< /div>
		);
	}
});

var _PageList=React.createClass({
	mixins: [ Router.State],
	getInitialState:function(){
		return {pageList:[]};
	},
	componentDidMount:function(){
		PageStore.on('pageListLoadded',function(){
			this.setState({
				pageList:PageStore.pageList
			});
		}.bind(this));

		AppDispatcher.dispatch({
			eventName:'loadPageList',
			magazineId:this.getParams().magazineId
		});
	},
	render:function(){
		console.log('>>>>>>>>>>>>>>render page list');
		var pageIndex=0;
		var pageItems=this.state.pageList.map(function(pageItem){
			pageIndex++;
			return (
				<PageItem key={pageItem.id} pageIndex={pageIndex} pageItem={pageItem}/>
			);
		});

		var pageListStyle={
			display: 'flex',
  			flexFlow: 'column',
  			flex:1
		};

		return (
			<div id="pageItemsList" style={pageListStyle}>
				{pageItems}
			</div>
		);
	}
});

var PageList=DragSource('pageList',{
	beginDrag: function (props) {
		console.log('>>>>>props');
		var item = { id: props.id };
    	return item;
	}
},function(connect, monitor){
	console.log('==>>>>connect: '+connect.dragSource);
	return {
	    // Call this function inside render()
	    // to let React DnD handle the drag events:
	    connectDragSource: connect.dragSource(),
	    // You can ask the monitor about the current drag state:
	    isDragging: monitor.isDragging()
	};
})(_PageList);

var PagePannel=React.createClass({
	mixins: [ Router.State],
	handleAddClick:function(){
		AppDispatcher.dispatch({
			eventName:'createPage'
		});
	},
	handleDeleteClick:function(){
		//TODO 默认未带pageId的url，应考虑做router redirect
		var pageId=this.getParams().pageId; 

		if(pageId){
			AppDispatcher.dispatch({
				eventName:'deletePage',
				pageId:this.getParams().pageId
			});
		}
	},
	render:function(){
		var buttonStyle={
			width:'95%',
			margin: '5px 5px 5px 5px',
			height:'30px'
		};

		return ( 
			< div id = "rightPannel" >
				<PageList></PageList>
				<button style={buttonStyle} onClick={this.handleAddClick}>添加</button>
				<button style={buttonStyle} onClick={this.handleDeleteClick}>删除</button>
			</div>
		);
	}
});

export default PagePannel;

