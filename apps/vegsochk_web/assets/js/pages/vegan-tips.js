import React, { Component } from 'react'
import {render} from 'react-dom'
import agent from '../agent'
import OutsideEatingTips from './veganTips/OutsideEatingTips.js'
import RestaurantTips from './veganTips/RestaurantTips.js'

const tabNames = ['在外素食貼士', '素食餐廳名錄']

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
    return <OutsideEatingTips />
  }
  render () {
    const {activeTabIndex} = this.state
    return (
      <div>
        {this._renderMainContent()}
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('mount')
)
