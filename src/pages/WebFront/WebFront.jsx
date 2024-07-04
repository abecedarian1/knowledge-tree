import './WebFront.scss'

export default function WebFront(){
    return(
        <div>
            <div className="user_bar">
               {/* onClick={goHome} */}
                <a href='/'  style={{ textDecoration: 'none',color:'#335f5b',marginLeft: '20px',float: 'left'}}>
                    回到首页
                </a>

                {/* onClick={goBack} */}
                <a  style={{textDecoration: 'none',color:'#335f5b',marginRight: '20px',float:'right'}}>
                    返回
                </a>            

                {/* {{titleName}} */}
                <div style={{textAlign:'center'}}><a style={{fontSize:'30px',fontWeight: 'bolder'}}>11222</a></div>
            </div>

            <div className="content">
                {/* className="fixed:isFixed" */}
                <div className="option_bar">
                    {/* <ul>
                        <li v-for="(item,index) in sideBarList" :class="selectId==item.id ? 'select-option' : '' " @click="selectOption(item.id)">
                            <router-link className="bg" :to="item.url">{{item.name}}</router-link>
                        </li>
                    </ul> */}
                </div>
                
                <div id="test" className="box_1">
                       {/* v-if={selectId==null} */}
                    <div  style={{textAlign: 'left',fontSize: '20px',padding: '10px'}}>请选择~~~</div>
                    {/* <div v-else>
                        <router-view></router-view>
                    </div> */}
                </div>
            </div>
      
      </div>
    )

}