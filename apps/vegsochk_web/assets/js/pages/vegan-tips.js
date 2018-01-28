import React, { Component } from 'react'
import {render} from 'react-dom'
import agent from '../agent'
import OutsideEatingTips from './veganTips/OutsideEatingTips.js'
import RestaurantTips from './veganTips/RestaurantTips.js'

const tabNames = ['在外素食貼士', '素食餐廳名錄', '健康錦囊']

const Tabs = ({activeTabIndex, handleTabOnClick}) =>
  <ul className='tabs' uk-tab='true'>
    {
    tabNames.map((name, index) =>
      <li
        key={name}
        className={`tab-item ${index === activeTabIndex && 'active'}`}
        onClick={handleTabOnClick.bind(null, index)}>
        <span className='tab-text'>{name}</span>
      </li>
    )
  }
  </ul>

class HealthTips extends Component {
  render () {
    return (
      <div>Health</div>
    )
  }
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      activeTabIndex: 0,
      restaurants: []
    }
  }

  componentDidMount () {
    agent.Restaurant.getAll()
      .then(restaurants =>
        this.setState(() => ({
          restaurants
        }))
      )
      .catch(e =>
        console.log('e', e)
      )
  }

  handleTabOnClick (index) {
    this.setState(() => ({activeTabIndex: index}))
  }

  _renderMainContent () {
    const { activeTabIndex, restaurants } = this.state
    switch (activeTabIndex) {
      case 0:
        return <OutsideEatingTips />
      case 1:
        return (
          <RestaurantTips
            restaurants={restaurants} />
        )
      case 2:
        return <HealthTips />
    }
  }
  render () {
    const {activeTabIndex} = this.state
    return (
      <div>
        <Tabs
          activeTabIndex={activeTabIndex}
          handleTabOnClick={this.handleTabOnClick.bind(this)} />
        {this._renderMainContent()}
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('mount')
)
