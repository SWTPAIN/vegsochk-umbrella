import React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import agent from '../agent';
const tabNames = ['在外素食貼士', '素食餐廳名錄', '健康錦囊'];

const Tabs = ({activeTabIndex, handleTabOnClick}) =>
	<ul className="tabs" uk-tab="true">
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

const DistrictButton = ({isSelected, title, onClick}) => (
  <button
    onClick={onClick}
    className={`uk-button uk-button-default uk-button-small ${isSelected && 'selected'}`}
  >
    {title}
  </button>
)

const TERRITORIES = [
  {id: 'hong_kong_island', name: "香港島"},
  {id: 'kowloon', name: "九龍區"},
  {id: 'new_territory', name: "新界區及離島"}
];

class RestaurantTips extends Component {

  state = {
    selectedTerritory: 'hong_kong_island'
  }
	render() {
    const {selectedTerritory} = this.state;
		return (
			<div className="restaurants-tips">
        <div className="district-selector-container uk-container uk-child-width-1-2" uk-grid="true">
          <div>
            <div className="district-selector uk-flex uk-flex-left uk-flex-middle">
              {
                TERRITORIES.map(({id, name}) =>
                  <DistrictButton
                    key={id}
                    isSelected={id === selectedTerritory}
                    title={name}
                    onClick={() => this.setState(() => ({selectedTerritory: id}))}
                    />
                )
              }
            </div>
          </div>
          <div className="little-tip">
            <p>小貼士:</p>
            <p>寶田源及愛家均可預訂整個VEGAN生日蛋糕。 若去一般蛋奶素素食店，炒飯記得走蛋喔!:)</p>
          </div>
        </div>
        <div className="restaurant-list uk-container">
          {
            this.props.restaurants
              .filter( r => r.territory === selectedTerritory)
              .map( r =>
              <div key={r.name} className="restaurant-item uk-container">
                <div uk-grid="true">
                  <div className="uk-width-1-3">
                    <div className="restaurant-image-container">
                      <img src={r.image}/>
                    </div>
                  </div>
                  <div className="restaurant-info-container uk-width-2-3">
                    <p className="restaurant-name">{r.name}</p>
                    <p className="restaurant-address">{r.address}</p>
                    <p className="restaurant-telephone-number">T:{r.telephone_number}</p>
                    <p>-</p>
                    <p className="restaurant-description">{r.description}</p>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
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
    activeTabIndex: 1,
    restaurants: []
  }

  componentDidMount() {
    agent.Restaurant.getAll()
      .then(restaurants =>
        this.setState(() => ({
          restaurants
        }))
      )
      .catch( e =>
        console.log('e', e)
      )
  }

  handleTabOnClick(index) {
    this.setState(() => ({activeTabIndex: index}))
  }

  _renderMainContent() {
    const { activeTabIndex, restaurants } = this.state;
    switch(this.state.activeTabIndex) {
      case 0:
        return <OutsideEatingTips/>;
      case 1:
        return (
          <RestaurantTips
            restaurants={restaurants}/>
        );
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
