import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import Atcomponent from "../../common/component"
import classNames from 'classnames'
import { getDateDay, getWeekday } from '../../common/utils'

interface props {
    dateRange: Array<string>,
    isShow: boolean,
    className?: string
    onChange: (date:Array<string>) => void
}
interface dateRenderList {
    year: number,
    month: number,
    children: Array<Array<rowDate>>
}
interface rowDate {
    time: string,
    day: number, 
    disable ?: true
}
interface dayDate {
    id: number | string,
    value: string
}
interface state {
    dateTitle:Array<string>,
    activeArray: Array<string>,
    initDate: Array<string> | string,
    dateRenderList:  Array<dateRenderList>,
    floatTitle: string,
    listData: Array<dayDate>,
    itemSize: number,
    screenHeight: number,
    startOffset: number,
    start: number,
    end: null | number,
    visibleCount: number,
    visibleData: Array<dateRenderList>,
    listHeight: number,
    scrollTop: number,
    listItemHeight: string
   
}
const createDayList = (date) => {
    let currentDays: any = []
    let lastDays:any = []
    let newList: Array<Array<rowDate>> = []
    const year: number = new Date(date).getFullYear()
    const month: number = new Date(date).getMonth() + 1
    const currentDay = getDateDay(date)
    let lastDay = getDateDay(date, 0)
    const deviationIndex = getWeekday(date)
    const preYear = deviationIndex ? new Date(new Date(date).setDate(0)).getFullYear(): year
    const preMonth = deviationIndex ? new Date(new Date(date).setDate(0)).getMonth() + 1: month
    for(let x = 1; x <= currentDay; x++) {
        currentDays.push({time: `${year}/${month}/${x}`, day: x})
    }
    for(let x = 1; x <= deviationIndex; x++) {
        lastDays.unshift({time: `${preYear}/${preMonth}/${lastDay}`, day: lastDay, disable: true})
        lastDay--
    }
    const pageList = [...lastDays,...currentDays]
   // const remainderNum = pageList.length % 7 
   //  remainderNum ? 7 - remainderNum: 0
    const tailNum = 42 - pageList.length
    const nextYear = tailNum ? new Date(new Date(date).setDate(32)).getFullYear(): year
    const nextMonth = tailNum ? new Date(new Date(date).setDate(32)).getMonth() + 1: month
    
    for(let j = 1;j <= tailNum; j++) {
        pageList.push({time: `${nextYear}/${nextMonth}/${j}`, day: j, disable: true})
    }
    for(let j =0; j<pageList.length; j+=7){
        newList.push(pageList.slice(j, j + 7))
    }
    return {year, month, children: JSON.parse(JSON.stringify(newList))} 

  }

const getDefaultDate = (date = ['2018/1/1', '2040/1/1']) => {
    const [startDate, endDate] = date.map(item => {
        return item.split('/')
    })
    const defaultDate:any = [];
    for (let i = Number(startDate[0]); i <= Number(endDate[0]); i++) {
       let startMonth = i === Number(startDate[0]) ? Number(startDate[1]): 1
       let endMonth = i === Number(endDate[0]) ? Number(endDate[1]): 12
        for(let j = startMonth; j<= endMonth; j++) {
            defaultDate.push({ id: i+j, value: i+'/'+j+'/1' });
        }
    }
    return defaultDate
}


const getType = Object.prototype.toString
let timer:any = ''
let start = 0;
let end = 0 
let isLocking:boolean = false;
export default class Calendar extends Atcomponent<props, state> {
    static defaultProps: props
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.state = {
            dateTitle: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            activeArray: [],
            initDate: [],
            dateRenderList: [],
            floatTitle: '',
            listData: getDefaultDate(props.dateRange),
            itemSize: 323,
            //可视区域高度
            screenHeight: 0,
            //偏移量
            startOffset: 0,
            //起始索引
            start:1,
            //结束索引
            end: null,
            visibleCount: 0,
            visibleData: [],
            listHeight: 0,
            scrollTop: 0,
            listItemHeight: 'auto'
        }
        
    }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
    */
    config: Config = {
        navigationBarTitleText: '用户中心'
    }

    componentWillMount () {
        const { listData, itemSize, initDate} = this.state
        if((getType.call(initDate) !== '[object Array]')) {
            console.error('日历组件dateRange应该是Array<string> 类型')
        } else {

        }
        let activeArray:Array<string> = []
        if(getType.call(initDate) === '[object String]') {
            activeArray = [initDate as string]
        } else if (getType.call(initDate) === '[object Array]') {
            activeArray = initDate as Array<string>
        }

        const dataList: Array<dateRenderList>  = []
        listData.forEach((item) => {
            dataList.push(createDayList(item.value))
        })
        
        // -----------------------
        const screenHeight = 597;
       
        const scrollTop = 0;
        const listHeight = listData.length * itemSize;
        const visibleCount = Math.ceil(screenHeight / itemSize)
         end = start + visibleCount + 2
        let visibleData = dataList.slice(start, Math.min(end, dataList.length));
        const floatTitle = visibleData[0].year + '年' + visibleData[0].month + '月'
        console.log(listData, dataList)
        this.setState({
            screenHeight,
            visibleCount,
            visibleData,
            listHeight,
            scrollTop,
            activeArray,
            floatTitle,
            dateRenderList: dataList
        })
       
    }
    componentDidMount () { 
      
         const query = Taro.createSelectorQuery().in(this.$scope)
        
        const {listData,dateRenderList, initDate} = this.state
        let jumpDate: string = listData[0].value
        if(getType.call(initDate) === '[object String]') {
            jumpDate = initDate as string
        } else if (getType.call(initDate) === '[object Array]') {
            jumpDate = initDate[0]
        }
        const initDataTime = new Date(jumpDate)
        const searchTime = initDataTime.getFullYear() + '/' + (initDataTime.getMonth() + 1) + '/1'
        const searchTimeIndex = listData.findIndex(({value}) => {
            return value === searchTime
        })
        console.log(searchTime, searchTimeIndex)
        

        const fetchDom = (dom) => {
            return new Promise((resolve) => {
                setTimeout(()=> {
                    query
                    .select(dom)
                    .boundingClientRect((rect: any) => {
                        resolve(rect)
                    }).exec()
                }, 0)
        
            })
    
        }
       
        Promise.all([fetchDom('#scrollMain'), fetchDom('#listItem')]).then( (res: any) => {
            console.log(res)
            let [{height: screenHeight}, {height: itemSize}] = res
            itemSize = Math.ceil(itemSize)
            const listHeight = listData.length * itemSize;
            const visibleCount = Math.ceil(screenHeight / itemSize)
            end = start + visibleCount + 2
            let visibleData = dateRenderList.slice(start, Math.min(end, dateRenderList.length));
            this.setState({
                screenHeight,
                itemSize,
                visibleCount,
                visibleData,
                listHeight,
                listItemHeight: itemSize + 'px',
                scrollTop: searchTimeIndex * itemSize
            })
        })
       
    }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }
   
    handleClick(e){
            if(isLocking) {
                return false
            }
            const { activeArray } = this.state
            
            let [time, disable] = ["", ""]
            if(process.env.TARO_ENV === 'h5') {
                 time = e.target.getAttribute('data-time')
                 disable = e.target.getAttribute('data-disable')
            }
            if(process.env.TARO_ENV === 'weapp') {
                 time = e.target.dataset.time
                 disable = e.target.dataset.disable
            }
            if(disable || !time){
                return false
            }
            if(activeArray.length >= 2 || !activeArray.length ){
                this.setState({
                    activeArray: [time]
                })
            }else {
                let newActiveArray:Array<string> = []
                
                if(new Date(time).getTime() > new Date(activeArray[0]).getTime()) {
                    newActiveArray = [...activeArray, time]
                }
                else {
                    newActiveArray = [time]
                }
                if(newActiveArray.length === 2) {
                    isLocking = true
                    setTimeout(() => {
                        isLocking = false
                        this.props.onChange(newActiveArray)
                    }, 500)
                }
                this.setState({
                    activeArray: [...newActiveArray]
                })
                
            }
           
    }
    activeClassName({time, disable}) {
        const { activeArray } = this.state
        const [startTime, endTime] = activeArray
        const { length } = activeArray
        const startTimeDate = new Date(startTime).getTime()
        const endTimeDate = new Date(endTime).getTime()
        const nowTime = new Date(time).getTime()
        if(disable) {
            return 'day disable-select'
        }
        if(startTimeDate === nowTime) {
            if(length === 1) {
                return 'day start-active-single'
            }
            if( length === 2) {
                return startTime === endTime ? ' day start-active-double': 'day start-active'
            }
        }
        if(endTimeDate === nowTime) {
            return 'day end-active'
        }
        if(startTime && endTime) {
           if(startTimeDate <= nowTime && nowTime <= endTimeDate) {
               return 'day red'
           }
        }

        return 'day'
    }
    handleChangeDate(type) {
        const {scrollTop, itemSize} = this.state
       this.switchingTime(scrollTop + parseFloat(type + itemSize), true)
    }
    getTransform(){
        return `translate3d(0,${this.state.startOffset}px,0)`;
    }
    switchingTime(scrollTop, switchDate?) {
        let {itemSize, visibleCount, dateRenderList, listHeight, screenHeight} = this.state
        console.log(scrollTop)
        if(scrollTop < 0 || scrollTop > listHeight - screenHeight) {
            return
        }
        start = Math.floor(scrollTop / itemSize);
         end = start + visibleCount + 2;
        let startOffset = scrollTop - (scrollTop % itemSize)
        let visibleData = dateRenderList.slice(start, Math.min(end, dateRenderList.length));
        const floatTitle = visibleData[0].year + '年' + visibleData[0].month + '月'
       
        this.setState({
            startOffset,
            visibleData,
            floatTitle: floatTitle
            
           
        })
        if(switchDate || process.env.TARO_ENV === 'h5') {
            this.setState({
                scrollTop
            })
        } else {
            if(timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(()=> {
                this.setState({
                    scrollTop
                })
            }, 200)
        }
       
    }
    onScroll(e) {
        this.switchingTime(e.detail.scrollTop)
    }
    render () {
        const { dateTitle, floatTitle, visibleData, listHeight, scrollTop, listItemHeight ,activeArray} = this.state
        const { isShow } = this.props
        console.log('isShow', isShow)
        const scrollStyle = {
            height: 'calc(100vh - 70px)'
        }
        const rootClass = classNames(
            'calendar',
            {
              'calendar-hide': isShow
            },
            this.props.className
        )
        return (
           <View className={rootClass} >
                <View className='calendar-header'>
                    {/* <View onClick={()=> {this.handleChangeDate('-')}} className='btn-date'>-</View>
                    <View className='calendar-date'>{floatTitle}</View>
                    <View onClick={()=> {this.handleChangeDate('+')}}  className='btn-date'>+</View> */}
                    <View className='calendar-date'>{activeArray[0]}</View>
                    <View className="separator">至</View>
                    <View className='calendar-date'>{activeArray[1]}</View>
                    <View className='btn-close' onClick={() => {this.props.onChange([])}}>关闭</View>
                </View>
                <View className='date-title'>
                        {dateTitle.map( (val, index) => {
                            return(
                                <View className='date' data-index={index} key={index}>{val}</View>
                            )
                        })}
                </View>
                <View className='float-title'>{floatTitle}</View>
                
                <View className='calenda-container' id='scrollMain'>
                        
                    <ScrollView
                    className='scrollview'
                    scrollY
                    style={scrollStyle}
                    scrollTop={scrollTop}
                    onScroll={this.onScroll.bind(this)}
                    >
                        <View className='infinite-list-phantom' style={{ height: listHeight + 'px' }}></View>
                        <View className='infinite-list' style={{ transform: this.getTransform() }}>
                            {
                                visibleData.map( (list, index) => {
                                    return (
                                        <View className='main' style={{height: listItemHeight}} id={index === 0 ? 'listItem' : ''} onClick={this.handleClick} key={list.year + list.month}>
                                            <View className='main-year'>
                                                {list.year+ '年'+ list.month+ '月'}
                                            </View>
                                        {
                                            list.children.map( (item: any) => {
                                                return (
                                                    <View className='row' >
                                                        {
                                                            item.map( (val, index)=> {
                                                                return (
                                                                    <View className={this.activeClassName(val)}  >
                                                                        <View className='day-block' key={val.time} data-time={val.time} data-disable={val.disable} >{new Date(new Date().toLocaleDateString()).getTime() == new Date(val.time).getTime() ? '今天': val.day}</View>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                    )
                                })
                            }
                        </View>     
                    </ScrollView>
                </View>
            </View>
        )
  }
}
