import React, { Component } from 'react'

const categories = [
  {
    id: 'mobile-apps',
    icon: '/images/phone-icon.png',
    title: '手機程式'
  },
  {
    id: 'websites',
    icon: '/images/web-icon.png',
    title: '網站'
  },
  {
    id: 'blogs',
    icon: '/images/facebook-icon.png',
    title: '群組/專頁/BLOGGER'
  },
  {
    id: 'books',
    icon: '/images/book-icon.png',
    title: '書籍推介'
  },
  {
    id: 'tutorials',
    icon: '/images/kitchen-icon.png',
    title: '學素廚房'
  },
  {
    id: 'shops',
    icon: '/images/desk-icon.png',
    title: '素食百貨'
  },
  {
    id: 'desserts',
    icon: '/images/cake-icon.png',
    title: '自製純素甜品'
  },
  {
    id: 'travel',
    icon: '/images/suitcase-icon.png',
    title: '旅行貼士'
  }
]

export default class OutsideEatingTips extends Component {
  constructor () {
    super()
    this.state = {
      selectedCategoryId: 'mobile-apps'
    }
  }

  _renderItems () {
    switch (this.state.selectedCategoryId) {
      case 'mobile-apps':
        return (
          <div className='item-list uk-container'>
            <div className='item uk-container'>
              <div uk-grid='true'>
                <div className='uk-width-1-4'>
                  <div className='restaurant-image-container'>
                    <img src='/images/tips/tip-4.jpg' />
                  </div>
                </div>
                <div className='restaurant-info-container uk-width-3-4'>
                  <p className='restaurant-name'>香港土製「素..邊度有得食...」 (免費下載)</p>
                  <p className='restaurant-description'>能搜索全香港素食店、素材店、有機食品店、雜貨及蔬菜店的APP,GPS定位後能顯示鄰近的 素店資料以及位置</p>
                  <div className='uk-flex uk-flex-middle'>
                    <a href='https://itunes.apple.com/hk/app/%E7%B4%A0-%E9%82%8A%E5%BA%A6%E6%9C%89%E5%BE%97%E9%A3%9F/id719402448?mt=8' target='_blank'>
                      <img className='app-store-badge' src='/images/app-store-download.svg' />
                    </a>
                    <a href='https://play.google.com/store/apps/details?id=com.caalstudio.hkvegetarian'
                      target='_blank'>
                      <img className='google-play-badge' src='/images/google-play-badge.png' />
                    </a>

                  </div>
                </div>
              </div>
            </div>
            <div className='item uk-container'>
              <div uk-grid='true'>
                <div className='uk-width-1-4'>
                  <div className='restaurant-image-container'>
                    <img src='/images/tips/tip-2.png' />
                  </div>
                </div>
                <div className='restaurant-info-container uk-width-3-4'>
                  <p className='restaurant-name'>HAPPY COW(英文)</p>
                  <p className='restaurant-description'>如果去外國旅行的話，推薦大家下載HAPPY COW,網站內容免費，手機版可定位搜尋(需付費)</p>
                  <div className='uk-flex uk-flex-middle'>
                    <a href='https://itunes.apple.com/us/app/happycow-find-vegan-food/id435871950?mt=8' target='_blank'>
                      <img className='app-store-badge' src='/images/app-store-download.svg' />
                    </a>
                    <a href='https://play.google.com/store/apps/details?id=com.hcceg.veg.compassionfree'
                      target='_blank'>
                      <img className='google-play-badge' src='/images/google-play-badge.png' />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'websites':
        return (
          <div className='item-list uk-container'>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <a href='https://www.openrice.com' target='_blank'>
                  <p className='website-name'>
                    OPENRICE網站，搜索素食/無肉餐單
                  </p>
                </a>
                <p className='website-description'>
                  要注意有時有些餐廳有素食的選擇，可能多屬蛋奶素。
                </p>
              </div>
            </div>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <a href='https://www.openrice.com' target='_blank'>
                  <p className='website-name'>
                    素街 VEG SHOP GUIDE(全港素食餐廳指南)
                  </p>
                </a>
                <p className='website-description'>
                  地鐵站分類，非常方便!由香港佛慈淨寺編製。
                </p>
              </div>
            </div>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <a href='https://fooduncovered.org/' target='_blank'>
                  <p className='website-name'>
                    食物知情權
                  </p>
                </a>
                <a href='https://21dayhealthychallenge.net/' target='_blank'>
                  <p className='website-name'>
                    PCRM美國責任醫師協會(21天健康挑戰)
                  </p>
                </a>
                <a href='http://leeyuming.com/' target='_blank'>
                  <p className='website-name'>
                    李宇銘中醫博士個人網站(有素食健康專欄)
                  </p>
                </a>
                <a href='http://dodoshare.org/' target='_blank'>
                  <p className='website-name'>
                    多些芽(純素生活指南)
                  </p>
                </a>
              </div>
            </div>
          </div>
        )
      case 'blogs':
        return (
          <div className='item-list uk-container'>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <a href='https://www.facebook.com/groups/veggieyouth/?fref=ts' target='_blank'>
                  <p className='website-name'>
                    素食青年
                  </p>
                </a>
                <p className='website-description'>
                  是一個很活躍的群組，逾四萬成員，主要是香港的成員，可以獲得很多不同的飲食資訊，定期會舉辦各式聚會。
                </p>
                <p className='website-name'>無肉週一(香港蔬食協會主辦，每週一的聚會)</p>
                <p className='website-name'>RO VEGAN FITNESS 純素食健體教練團隊</p>
                <p className='website-name'>樂悠行(定期舉辦各式活動，素食友好)</p>
                <p className='website-name'>素友遊世界</p>
                <p className='website-name'>SUPER VEGGIE KIDS 超級素BB谷(適合有子女的素食家庭)</p>
                <p className='website-name'>香港素食 (分享素食食物資訊的群組)</p>
                <p className='website-name'>素..邊度有得食</p>
                <p className='website-description'>
                  愛動物推純素的平台，有純素資訊，肉食背後，健康，娛樂，食譜等
                </p>
                <p className='website-name'>香港素食</p>
                <p className='website-description'>
                  香港素食群組附頁，介紹肉店吃素易，素食資訊等
                </p>
                <p className='website-name'>花花純素自遊行</p>
                <p className='website-name'>班女講素</p>
                <p className='website-name'>無肉肌肉</p>
              </div>
            </div>
          </div>
        )
      case 'books':
        return (
          <div className='item-list uk-container'>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <p className='website-description'>
                  《我醫我素》《簡單素》 | 《飲食 · 愛 · 生機》 | 《純素隨想cook》 | 《醫學廚房》
                </p>
                <p className='website-description'>
                  《你可以不喝牛奶》 | 《餐叉勝過手術刀》 | 《糖尿病有救了》 | 《吃蔬的女人不會老》
                </p>
              </div>
            </div>
          </div>
        )
      case 'tutorials':
        return (
          <div className='item-list uk-container'>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <p className='website-description'>
                  CLUB O | 綠野林 | 香港品味高素食學會 | HAPPY PLANTARIAN
                </p>
              </div>
            </div>
          </div>
        )
      case 'shops':
        return (
          <div className='item-list uk-container'>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <p className='website-name'>
                  ONE VEGAN SHOP (可網購，購物滿三百免運費)
                </p>
                <p className='website-description'>
                  元朗鳯翔路2-6號交通廣場地下1號舖
                </p>
                <p className='website-description'>
                  可購買純素芝士、巧克力、植物奶等。
                </p>
              </div>
              <div className='website-info-container'>
                <p className='website-name'>
                  甘薯葉素食超市
                </p>
                <p className='website-description'>
                  太子洗衣街241號(太子地鐵站A出口步行約5分鐘)
                </p>
              </div>
              <div className='website-info-container'>
                <p className='website-name'>
                  GREEN COMMON
                </p>
                <p className='website-description'>
                  灣仔皇后大道東222號/中環德輔道中173號南豐大廈1樓
                </p>
                <p className='website-description'>
                  可購買純素芝士、奶油、薄餅、各式植物奶
                </p>
              </div>
              <div className='website-info-container'>
                <p className='website-name'>
                  綠盒子素食超市 GREEN BOX
                </p>
                <p className='website-description'>
                  新界荃灣沙咀道40-50號榮豐工業大廈605室
                </p>
              </div>
              <div className='website-info-container'>
                <p className='website-name'>
                  CLUB O
                </p>
                <p className='website-description'>
                  旺角亞皆老街80-86號昌明大廈7字樓G、H室
                </p>
              </div>
            </div>
          </div>
        )
      case 'desserts':
        return (
          <div className='item-list uk-container'>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <p className='website-name'>花花純素甜品屋</p>
                <p className='website-name'>PLANT CAKEHTTPS</p>
                <p className='website-name'>PLANTY - RAW VEGAN PATISSERIE</p>
                <p className='website-name'>MERCY CAKEHTTPS</p>
                <p className='website-name'>T.U.P (THE UNIQUE PEACE)</p>
                <p className='website-name'>REBEL GIRL</p>
              </div>
            </div>
          </div>
        )
      case 'travel':
        return (
          <div className='item-list uk-container'>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <p className='website-description'>一般旅行團都可以預先安排素食，報團可提前說明</p>
                <p className='website-description'>·飛機餐(一般至少早3日預訂)</p>
                <p className='website-description'>選擇VEGAN純素食餐。(注意要選擇純素，一般中式/西式/印度素食可能含蛋奶)建議登機櫃台前再確定一次</p>
                <p className='website-name'>·香港1哥假期有辦素食旅行團</p>
                <p className='website-description'>·TRIPADVISOR網站，有素食餐廳的選項</p>
                <p className='website-description'>·手機APP:VEGAN PASSPORT</p>
                <p className='website-description'>素食者護照，涵蓋世界70多種語言的素食護照，就不必擔心溝通問題了!(下載需16元港幣)</p>
              </div>
            </div>
          </div>
        )
    };
  }

  render () {
    const selectedCategoryId = this.state.selectedCategoryId
    return (
      <div className='outside-eating-tips'>
        <div className='uk-flex uk-flex-wrap uk-flex-wrap-around'>
          {
            categories.map(({id, icon, title}) =>
              <div
                key={id}
                className='uk-width-1-5@m uk-width-1-4'>
                <div
                  onClick={() => this.setState(() => ({selectedCategoryId: id}))}
                  className={`tip-category ${id === selectedCategoryId && 'active'}`}>
                  <div className='tip-category-icon-container'>
                    <img src={icon} />
                  </div>
                  <p>{title}</p>
                </div>
              </div>
            )
          }
        </div>
        {
          this._renderItems()
        }
      </div>
    )
  }
}
