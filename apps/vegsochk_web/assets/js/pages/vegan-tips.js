import React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios';

const tabNames = ['在外素食貼士', '素食餐廳名錄', '健康錦囊'];

const Tabs = ({activeTabIndex, handleTabOnClick}) =>
	<ul uk-tab="true">
  {
    tabNames.map((name, index) =>
      <li
        key={name}
        className={`tab-item ${index === activeTabIndex && "active"}`}
        onClick={handleTabOnClick.bind(null, index)}>
        {name}
      </li>
    )
  }
	</ul>

const categories = [
  {
    id: 'mobile-apps',
    icon: 'http://via.placeholder.com/150x150',
    title: '手機程式'
  },
  {
    id: 'websites',
    icon: 'http://via.placeholder.com/150x150',
    title: '網站'
  },
  {
    id: 'blogs',
    icon: 'http://via.placeholder.com/150x150',
    title: '群組/專頁/BLOGGER'
  },
  {
    id: 'books',
    icon: 'http://via.placeholder.com/150x150',
    title: '書籍推介'
  },
  {
    id: 'tutorials',
    icon: 'http://via.placeholder.com/150x150',
    title: '學素廚房'
  },
  {
    id: 'shops',
    icon: 'http://via.placeholder.com/150x150',
    title: '素食百貨'
  },
  {
    id: 'desserts',
    icon: 'http://via.placeholder.com/150x150',
    title: '自製純素甜品'
  },
  {
    id: 'travel',
    icon: 'http://via.placeholder.com/150x150',
    title: '旅行貼士'
  }
];

class OutsideEatingTips extends Component {
  state = {
    selectedCategory: 0
  }
  render() {
		return (
      <div className="outside-eating-tips">
        <div className="uk-flex uk-flex-wrap uk-flex-wrap-around">
          {
            categories.map( ({id, icon, title}) =>
              <div
                key={id}
                className="uk-width-1-5">
                <div className="tip-category">
                  <div className="tip-category-icon-container">
                    <img src={icon}/>
                  </div>
                  <p>{title}</p>
                  <div className="down-icon-container">
                    <span uk-icon="icon: triangle-down; ratio: 2"></span>
                  </div>
                </div>
              </div>
            )
          }
        </div> 
      </div>
		)
  }
}

class RestaurantTips extends Component {
	render() {
		return (
			<div>Restaurant</div>
		);
	}
}

class HealthTips extends Component {
	render() {
		return (
			<div>Health</div>
		);
	}
}

class App extends Component {
  state = {
    activeTabIndex: 0
  }

  handleTabOnClick(index) {
    this.setState(() => ({activeTabIndex: index}))
  }

  _renderMainContent() {
    switch(this.state.activeTabIndex) {
      case 0:
        return <OutsideEatingTips/>;
      case 1:
        return <RestaurantTips/>;
      case 2:
        return <HealthTips/>;
    }
  }
  render() {
    const {activeTabIndex} = this.state;
    return (
      <div>
        <Tabs
          activeTabIndex={activeTabIndex}
          handleTabOnClick={this.handleTabOnClick.bind(this)}/>
        {this._renderMainContent()}
      </div>
    );
  }
}

render(
	<App />,
	document.getElementById('mount')
);
