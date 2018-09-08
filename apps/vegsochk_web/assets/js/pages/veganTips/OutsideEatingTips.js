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
    title: '網站群組'
  },
  {
    id: 'books',
    icon: '/images/book-icon.png',
    title: '書籍影片'
  },
  {
    id: 'shops',
    icon: '/images/desk-icon.png',
    title: '素食百貨'
  },
  {
    id: 'tutorials',
    icon: '/images/kitchen-icon.png',
    title: '素食烹飪'
  },
  {
    id: 'travel',
    icon: '/images/suitcase-icon.png',
    title: '素食旅遊'
  },
  {
    id: 'fitness',
    icon: '/images/fitness-icon.png',
    title: '純素健體'
  }
]

const WebsiteItem = ({link, name, description}) =>
  <div className='item uk-container'>
    <div className='website-info-container'>
      <a href={link} target='_blank'>
        <p className='website-name'>
          {name}
        </p>
      </a>
      <p className='website-description'>
        {description}
      </p>
    </div>
  </div>

const BookItem = ({name}) =>
  <div className='item uk-container'>
    <div className='website-info-container'>
      <p className='website-description'>
        {name}
      </p>
    </div>
  </div>

const MovieItem = ({name, link}) =>
  <div className='item uk-container'>
    <div className='website-info-container'>
      <p className='website-description'>
        {name}
      </p>
      <a href={link} target='_blank'>
        {link}
      </a>
    </div>
  </div>

const FitnessItem = ({link, name, description, address, phone}) =>
  <div className='item uk-container'>
    <div className='website-info-container'>
      <a href={link} target='_blank'>
        <p className='website-name'>
          {name}
        </p>
      </a>
      <p className='website-description'>
        {description}
      </p>
      <p className='website-description'>
        地址：{address}
      </p>
      <p className='website-description'>
        電話：{phone}
      </p>
    </div>
  </div>

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
                  <p className='restaurant-name'>素..邊度有得食（免費下載）</p>
                  <p className='restaurant-description'>一個專為素食人士提供，搜索全香港素食店、素材店、有機食品店、雜貨及蔬菜店的app。</p>
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
                  <p className='restaurant-name'>Happy Cow（快樂牛）</p>
                  <p className='restaurant-description'>在全球任何地方，通過「快樂牛」查找就近餐廳，或者閱覽周圍的純素食或素食健康食品店的評價。</p>
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
            <div className='item uk-container'>
              <div uk-grid='true'>
                <div className='uk-width-1-4'>
                  <div className='restaurant-image-container'>
                    <img src='/images/tips/openrice.jpg' />
                  </div>
                </div>
                <div className='restaurant-info-container uk-width-3-4'>
                  <p className='restaurant-name'>OpenRice（開飯喇！）（免費下載）</p>
                  <p className='restaurant-description'>可以搜尋「素食」或「無肉餐單」。</p>
                  <div className='uk-flex uk-flex-middle'>
                    <a href='https://itunes.apple.com/hk/app/openrice-%E9%96%8B%E9%A3%AF%E5%96%87/id310663323?mt=8' target='_blank'>
                      <img className='app-store-badge' src='/images/app-store-download.svg' />
                    </a>
                    <a href='https://play.google.com/store/apps/details?id=com.openrice.android'
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
            <h2 className='title'>
							Facebook群組
            </h2>
            <WebsiteItem
              link='https://www.facebook.com/groups/veggieyouth/'
              name='素食青年'
              description='歡迎素食新手加入，於群組得知各種素食資料，例如：素食煮意、素食餐館、素材店鋪素食問題等等。組員近55,000。'
            />
            <WebsiteItem
              link='https://www.facebook.com/groups/veganhongkong/'
              name='Hong Kong Vegan'
              description='以英語為主的香港純素者群組'
            />
            <WebsiteItem
              link='https://www.facebook.com/groups/veganshongkong/'
              name='Vegans Hong Kong'
              description='以英語為主的香港純素者群組，定期舉辦講座活動'
            />
            <WebsiteItem
							link='https://www.facebook.com/hongkongpigsave/'
              name='救救港豬（Hong Kong Pig Save）'
              description='為農場動物發聲的組織。透過在屠房外目送被送往屠宰的豬隻和教育大眾的工作，從而提高大眾對畜牧業的關注和反思。'
            />
            <WebsiteItem
              link='https://www.facebook.com/groups/722874564511496/'
              name='Super Veggie Kids 超級素BB谷'
              description='藉著不定期舉辦的大小活動，如醫生講座，bb派對，bb food工作坊，增強家長對素食信心，並互相分享育兒經驗，以及寶寶素食所面對的困難。'
            />
            <WebsiteItem
							link='https://www.facebook.com/EarthlingsExperienceHK/'
              name='The Earthlings Experience Hong Kong'
              description='定期在街頭以手提電腦放映紀錄片Earthlings（地球公民）的片段，喚醒途人對食用動物的關注。'
            />
            <h2 className='title'>
							網站
            </h2>
            <WebsiteItem
              link='http://www.asia.mercyforanimals.org'
              name='憫惜動物（Mercy For Animals)'
              description='專注於農場動物的國際愛護動物組織。亞洲分部。'
            />
            <WebsiteItem
              link='http://www.petaasia.cn'
              name='亞洲善待動物組織（PETA Asia）'
              description='國際愛護動物組織。亞洲分部。'
            />
            <WebsiteItem
              link='http://vegshopguide.wixsite.com/infos'
              name='素街（Veg Shop Guide）'
              description='由香港佛慈淨寺編製，搜羅全香港的素食餐廳，並以港鐵站分類，一目瞭然。'
            />
            <WebsiteItem
              link='http://www.buddhistcompassion.org/promot/2017-veg-170526.pdf'
              name='2017年全港九素Guide'
              description='由《溫暖人間》編製的素食餐廳大全。'
            />
            <WebsiteItem
              link='https://www.hkcva.org'
              name='香港天主教素食會 （網站/Facebook）'
              description='https://www.facebook.com/HKCVA'
            />
            <WebsiteItem
              link='http://www.meetup.com/Meat-Free-Hong-Kong/'
              name='Meat Free Hong Kong'
              description='由香港蔬食協會主辦，每星期在不同素食餐廳舉辦純素聚餐。'
            />
            <WebsiteItem
              link='https://www.thepurepanda.com'
              name='The Pure Panda'
              description='由香港人參與研發的純素化妝品及日用品搜尋平台。暫時全港有逾百處售賣點，全球則多達40,000處。'
            />
            <WebsiteItem
              link='https://www.thepurepanda.com'
              name='香港蔬食協會(Hong Kong Vegan Association)'
              description=''
            />
          </div>
        )
      case 'books':
        return (
          <div className='item-list uk-container'>
            <h2 className='title'>
							書籍
            </h2>
            <h2 className='subtitle'>
							健康
            </h2>
            <BookItem name='《我醫我素：健康素食小百科》——盧麗愛醫生' />
            <BookItem name='《醫學廚房》——梁淑芳醫生' />
            <BookItem name='《你可以不喝牛奶》——梁淑芳醫生' />
            <BookItem name='《營男素女》——小帕' />
            <BookItem name='《吃全蔬的女人不會老》——三無姐妹' />
            <BookItem name='《食療聖經》（”How Not to Die”）——麥克・葛雷格（Michael Greger）、吉恩・史東（Gene Stone）' />
            <BookItem name='《餐叉勝過手術刀》——吉恩．史東（Gene Stone）' />
            <BookItem name='《糖尿病有救了》——尼爾・柏納德醫師（Dr. Neal Barnard）' />
            <h2 className='subtitle'>
							心理
            </h2>
            <BookItem name='《盲目的肉食主義：我們愛狗卻吃豬、穿牛皮？》——梅樂妮・喬伊（Dr. Melanie Joy）' />
            <h2 className='subtitle'>
							其他
            </h2>
            <BookItem name='《動物解放》（”Animal Liberation”）——彼得・辛格（Peter Singer）' />
            <BookItem name='《世界和平飲食》（”The World Peace Diet”）——威爾・塔托博士（Dr. Will Tuttle）' />
            <BookItem name='《吃動物》——強納森・薩法（Jonathan Safran Foer）' />
            <BookItem name='《傷心農場》——索妮亞・法樂琪（Sonia Faruqi）' />
            <BookItem name='《壞農業：廉價肉品背後的恐怖真相》——菲利普・林伯里（Philip Lymbery）' />
            <BookItem name='《人道經濟》——韋恩・帕賽爾（Wayne Pacelle）' />
            <BookItem name='《食物霸權》——黃偉豪、吳曉鋒' />
            <h2 className='title'>
							影片
            </h2>
            <h2 className='subtitle'>
						紀錄片
            </h2>
            <MovieItem name='Cowspiracy（畜牧業的陰謀）' link='http://www.cowspiracy.com' />
            <MovieItem name='What The Health' link='http://www.whatthehealthfilm.com' />
            <MovieItem name='Forks Over Knives（刀叉下的秘密）' link='https://www.forksoverknives.com/the-film/#gs.zEr=JZ4' />
            <MovieItem name='Earthlings（地球公民）' link='http://www.nationearth.com' />
            <MovieItem name='Farm to Fridge' link='https://goo.gl/KZDWs6' />
            <MovieItem name='Fillet Oh Fish（魚肉的秘密）' link='http://freedocumentaries.org/documentary/fillet-oh-fish' />
            <MovieItem name='何以為食' link='https://www.youtube.com/watch?v=OQOQNlJnKTo' />
            <h2 className='subtitle'>
							紀錄片
            </h2>
            <MovieItem name='Okja（玉子）' link='https://www.netflix.com/hk/title/80091936' />
            <MovieItem name='小豬的教室' link='http://www.kubrick.com.hk/index.php/zh_hk/09edvd32.html' />
          </div>
        )
      case 'tutorials':
        return (
          <div className='item-list uk-container'>
            <h2 className='title'>
							素食KOL
            </h2>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <p className='website-name'>
									Vegan Mama Kitchen 純素媽媽廚房
                </p>
                <a href='https://www.facebook.com/profile.php?id=711014552310337' target='_blank'>
									https://www.facebook.com/profile.php?id=711014552310337
                </a>
              </div>
              <div className='website-info-container'>
                <p className='website-name'>
									Happy Vegan Cook 純素廚人
                </p>
                <a href='https://www.facebook.com/HappyVeganCook/' target='_blank'>
									https://www.facebook.com/HappyVeganCook/
                </a>
              </div>
              <div className='website-info-container'>
                <p className='website-name'>
									素食達人 Elvis Chan
                </p>
                <a href='https://www.facebook.com/veggiexpert' target='_blank'>
									https://www.facebook.com/veggiexpert
                </a>
              </div>
              <div className='website-info-container'>
                <p className='website-name'>
									Mimi Veggie 素食專頁
                </p>
                <a href='https://www.facebook.com/mimiveggie' target='_blank'>
									https://www.facebook.com/mimiveggie
                </a>
              </div>
              <div className='website-info-container'>
                <p className='website-name'>
									素食整色整水-尹嘉蔚Kriswan
                </p>
                <a href='https://www.facebook.com/vegcolourshomekitchen/' target='_blank'>
									https://www.facebook.com/vegcolourshomekitchen/
                </a>
              </div>
              <div className='website-info-container'>
                <p className='website-name'>
									Healing Kitchen 療悅廚房
                </p>
                <a href='https://www.facebook.com/cooktoheal' target='_blank'>
									https://www.facebook.com/cooktoheal
                </a>
              </div>
              <div className='website-info-container'>
                <p className='website-name'>
									素食教煮 - Ken Kwong
                </p>
                <a href='https://www.facebook.com/veggiesoeasy' target='_blank'>
									https://www.facebook.com/veggiesoeasy
                </a>
              </div>
            </div>
            <h2 className='title'>
							食譜
            </h2>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <p className='website-name'>
									綠色和平
                </p>
                <a href='https://medium.com/greenpeacecookbook/traditional-chinese/home' target='_blank'>
									https://medium.com/greenpeacecookbook/traditional-chinese/home
                </a>
              </div>
              <div className='website-info-container'>
                <p className='website-name'>
									台灣素食營養學會
                </p>
                <a href='https://www.twvns.org/info/recipe' target='_blank'>
									https://www.twvns.org/info/recipe
                </a>
              </div>
              <div className='website-info-container'>
                <p className='website-name'>
									《簡單素》——Club O
                </p>
              </div>
              <div className='website-info-container'>
                <p className='website-name'>
									《食啱素》——Club O
                </p>
              </div>
              <div className='website-info-container'>
                <p className='website-name'>
									《純素・隨想 Cook》——純素媽媽 Grace Wong
                </p>
              </div>
              <div className='website-info-container'>
                <p className='website-name'>
									《素做幸福滋味2：純素革命 Vegvolution》——素食達人 Elvis Chan
                </p>
              </div>
              <div className='website-info-container'>
                <p className='website-name'>
									《純素——肉食者也滿足的蔬食料理》——Doris Wong@Mimi Veggie
                </p>
              </div>
              <div className='website-info-container'>
                <p className='website-name'>
									《自煮．簡蔬食》——尹嘉蔚
                </p>
              </div>
              <div className='website-info-container'>
                <p className='website-name'>
									《我吃素，我跑步！——馬拉松少女的素食筆記》——Angie Li
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
									Club O店（所有收入均用作支援「綠色生活教育基金」的教育工作）
                </p>
                <a href='https://www.club-o.org/club-o-shop-info/' target='_blank'>
									https://www.club-o.org/club-o-shop-info/
                </a>
                <p className='website-description'>
									地址：旺角亞皆老街80號昌明大廈7樓
                </p>
                <p className='website-description'>
									電話：(+852) 2619 0000
                </p>
              </div>
            </div>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <p className='website-name'>
                  ONE VEGAN SHOP (可網購，購物滿三百免運費)
                </p>
                <a href='https://www.oneveganshop.com' target='_blank'>
									https://www.oneveganshop.com
                </a>
                <p className='website-description'>
									地址：元朗鳯翔路2-6號交通廣場地下1號舖
                </p>
                <p className='website-description'>
									電話：(+852) 3620 2212
                </p>
              </div>
            </div>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <p className='website-name'>
									Green Common
                </p>
                <a href='http://www.greencommon.com/locations/' target='_blank'>
									http://www.greencommon.com/locations/
                </a>
              </div>
            </div>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <p className='website-name'>
									甘薯葉（Batata Greens）
                </p>
                <a href='https://www.batatagreens.com.hk/pages/supermarket' target='_blank'>
									https://www.batatagreens.com.hk/pages/supermarket
                </a>
              </div>
            </div>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <p className='website-name'>
									素之樂（Vegelink）
                </p>
                <a href='https://www.vegelink.com/zh/home/' target='_blank'>
									https://www.vegelink.com/zh/home/
                </a>
                <p className='website-description'>
									地址：北角渣華道56號胡曰皆商業中心1字樓103室
                </p>
                <p className='website-description'>
									電話：(+852) 3427 9618
                </p>
              </div>
            </div>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <p className='website-name'>
									小麥芽（VeggieSmart）
                </p>
                <a href='https://www.veggiesmart.com.hk' target='_blank'>
									https://www.veggiesmart.com.hk
                </a>
                <p className='website-description'>
									地址：新蒲崗大有街32號泰力工業中心17樓13室
                </p>
                <p className='website-description'>
									電話：(+852) 2641 4488
                </p>
              </div>
            </div>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <p className='website-name'>
									綠盒子營養工房（Green Box Health Factory）
                </p>
                <a href='http://www.greenboxhealth.hk/index.php' target='_blank'>
									http://www.greenboxhealth.hk/index.php
                </a>
              </div>
            </div>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <p className='website-name'>
									其他有素食產品出售的商店
                </p>
                <p className='website-description'>
									Just Green
                </p>
                <a href='https://justgreen.com.hk/stores/' target='_blank'>
									https://justgreen.com.hk/stores/
                </a>
                <p className='website-description'>
									一田超市
                </p>
                <a href='http://www.yata.hk/tch/default.aspx' target='_blank'>
									http://www.yata.hk/tch/default.aspx
                </a>
                <p className='website-description'>
									city'super
                </p>
                <a href='https://www.citysuper.com.hk/tc/Footer-Pages/store-locator' target='_blank'>
									https://www.citysuper.com.hk/tc/Footer-Pages/store-locator
                </a>
                <p className='website-description'>
									崇光百貨Freshmart
                </p>
                <a href='http://www.sogo.com.hk/cwb/tc/about/location.php' target='_blank'>
									http://www.sogo.com.hk/cwb/tc/about/location.php
                </a>
                <p className='website-description'>
									大昌食品市場／專門店（部分分店）
                </p>
                <a href='https://www.dchfoodmartdeluxe.com/b5_address.php' target='_blank'>
									https://www.dchfoodmartdeluxe.com/b5_address.php
                </a>
                <p className='website-description'>
									裕華國貨（部分分店）
                </p>
                <a href='http://www.yuehwa.com/zh-hk/locator' target='_blank'>
									http://www.yuehwa.com/zh-hk/locator
                </a>
                <p className='website-description'>
									永安百貨（部分分店
                </p>
                <a href='https://shop.wingon.hk/2438' target='_blank'>
									https://shop.wingon.hk/2438
                </a>
                <p className='website-description'>
									iHerb
                </p>
                <a href='https://hk.iherb.com/hs/vegan' target='_blank'>
									https://hk.iherb.com/hs/vegan
                </a>
                <p className='website-description'>
									HKTVmall
                </p>
                <a href='https://www.hktvmall.com/hktv/zh/search?q=::category:BB01000021541:categoryHotPickOrder:BB01000021541' target='_blank'>
									https://www.hktvmall.com/hktv/zh/search?q=::category:BB01000021541:categoryHotPickOrder:BB01000021541
                </a>
              </div>
            </div>
          </div>
        )
      case 'travel':
        return (
          <div className='item-list uk-container'>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <a href='https://www.facebook.com/1-哥假期-素食團專頁-275905552770803' target='_blank'>
                  <p className='website-name'>
										1哥假期
                  </p>
                </a>
                <p className='website-description'>
									專營素食旅行團。
                </p>
              </div>
            </div>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <a href='https://www.gardencafe.com.hk' target='_blank'>
                  <p className='website-name'>
										大嶼山貝澳露營車
                  </p>
                </a>
                <p className='website-description'>
									由貝澳新輝茶室營運，可提供純素菜式。
                </p>
                <p className='website-description'>
									地址：大嶼山貝澳老圍村11A地下
                </p>
                <p className='website-description'>
									電話：(+852) 2984 2233
                </p>
              </div>
            </div>
            <div className='item uk-container'>
              <div className='website-info-container'>
                <a href='https://www.gardencafe.com.hk' target='_blank'>
                  <p className='website-name'>
										其他
                  </p>
                </a>
                <p className='website-description'>
									旅行團：一般都樂意安排素食，報團時可先向職員查詢
                </p>
                <p className='website-description'>
									飛機餐：一般於出發前最少三日透過電話或網上預訂素食便可
                </p>
              </div>
            </div>
          </div>
        )
      case 'fitness':
        return (
          <div className='item-list uk-container'>
            <FitnessItem
              name='Revol Yoga & Functional'
              description='秉持「素食健身」理念的瑜伽及體適能訓練中心，希望大眾能夠體驗「素食x運動」對健康的莫大益處。推廣純素理念'
              link='https://www.facebook.com/Revolfitness'
              address='荔枝角青山道489-491號香港工業中心B座3樓2B室'
              phone='(+852) 5533 7150'
            />
            <FitnessItem
              name='Revol Vegan fitness'
              description='香港首間提倡純素主義的健身中心，幫助大眾透過環保健康的飲食態度改善體型。推廣純素理念'
              link='https://www.facebook.com/Revolfitness'
              address='長沙灣青山道454號3樓'
              phone='(+852) 9854 0365'
            />
            <FitnessItem
              name='Positiv Wellness'
              description='一個簡約平和的地方給大家舒緩都市壓力和找回自己。由運動、瑜伽、普拉提、靜坐、到烹飪或營養班上都是本著純素和正念的宗旨。'
              link='https://www.facebook.com/positivwellness'
              address='灣仔譚臣道90號1樓'
              phone='(+852) 6557 4517'
            />
            <FitnessItem
              name='香港港安醫院'
              description='全港唯一只提供素食的醫院。設有「新起點」健康實踐計劃，讓大眾體驗素食對健康的好處。'
              link='https://www.hkah.org.hk/tc/main'
              address='司徒拔道40號'
              phone='(+852) 3651 8888'
            />
            <FitnessItem
              name='盈康純素醫療'
              description='提供「純素陪月服務」、「醫護純素坐月計劃」以及其他純素專業培訓課程。'
              link='http://snwmedical.com'
              address='銅鑼灣渣甸坊28號京華中心第二座21樓C室'
              phone='(+852) 2803 1998'
            />

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
                className='uk-width-1-4'>
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
