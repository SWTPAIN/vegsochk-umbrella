import React, {Component} from 'react'

const DistrictButton = ({isSelected, title, onClick}) => (
  <button
    onClick={onClick}
    className={`uk-button uk-button-default uk-button-small ${isSelected && 'selected'}`}
  >
    {title}
  </button>
)

const TERRITORIES = [
  {id: 'hong_kong_island', name: '香港島'},
  {id: 'kowloon', name: '九龍區'},
  {id: 'new_territory', name: '新界區及離島'}
]

export default class RestaurantTips extends Component {
  constructor () {
    super()
    this.state = {
      selectedTerritory: 'hong_kong_island'
    }
  }

  render () {
    const {selectedTerritory} = this.state
    return (
      <div className='restaurants-tips'>
        <div className='district-selector-container uk-container uk-child-width-1-2@m' uk-grid='true'>
          <div>
            <div className='district-selector uk-flex uk-flex-left uk-flex-middle'>
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
          <div className='little-tip'>
            <p>小貼士:</p>
            <p>寶田源及愛家均可預訂整個VEGAN生日蛋糕。 若去一般蛋奶素素食店，炒飯記得走蛋喔!:)</p>
          </div>
        </div>
        <div className='item-list uk-container'>
          {
            this.props.restaurants
              .filter(r => r.territory === selectedTerritory)
              .map(r =>
                <div key={r.name} className='item uk-container'>
                  <div uk-grid='true'>
                    <div className='uk-width-1-3'>
                      <div className='restaurant-image-container'>
                        <img src={r.image} />
                      </div>
                    </div>
                    <div className='restaurant-info-container uk-width-2-3'>
                      <p className='restaurant-name'>{r.name}</p>
                      <p className='restaurant-address'>{r.address}</p>
                      <p className='restaurant-telephone-number'>T:{r.telephoneNumber}</p>
                      <p>-</p>
                      <p className='restaurant-description'>{r.description}</p>
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
