<template>
    <div class="table-item" :style="{width:width}">
        <Cardx class="goods-item-warp">
            <div class="goods-img">
                <img :src="props.info.img">
            </div>
            <div class="good-info">
                <div class="good-name" :class="props.info.icon?'':'no-icon'">
                    <img v-if="props.info.icon" class="good-icon" :src="props.info.icon">{{ props.info.name }}
                </div>
                <div class="good-row">
                    <div v-if="props.info.price" class="good-row-price">
                        ¥<span class="good-row-price-enlarge">{{ price[0]}}</span>.{{price[1]}}
                    </div>
                    <div class="good-more">
                        <div v-if="props.info.remark" class="good-row-remark"> {{ props.info.remark }}</div>
                        <div v-else-if="props.info.comment" class="good-row-comment"> {{ commentStr }}</div>
                        <div class="more-btn"> 看相识 </div>
                    </div>
                </div>
                <div class="good-row-bottom"></div>
            </div>
            <div class="feed-back"></div>
        </Cardx>
    </div>
</template>

<script lang="ts" setup>
import Cardx from './Cardx.vue';
import { computed } from 'vue'

const props = defineProps({
  item: {
    type:Number, // 参数类型
    default: 2, //默认值
    required: false, //是否必传
  },
  info:{
      type:Object,
      default:{img:'',name:'',icon:''},
      required:true
  }
})

const width = computed(()=>{
    return ( 100 / props.item ) + "%"
})

const price = computed(()=>{
    let array = []
    if(props.info.price){
       array = props.info.price.split(".")
    }
    return array
})

const commentStr = computed(()=>{
    let mun = props.info.comment
    const suffix = "条评论"
    //5000
    if(mun >= 100000000){
        return mun.substring(0,mun.length - 8) + '亿+'+ suffix
    }
    
    if(mun >= 10000000){
        return mun.substring(0,mun.length - 7) + '千万+'+ suffix
    }

    if(mun >= 1000000){
        return mun.substring(0,mun.length - 6) + '百万+'+ suffix
    }

    if(mun >= 10000){
        return mun.substring(0,mun.length - 4) + '万+'+ suffix
    }

    if(mun >= 1000){
        return mun.substring(0,mun.length - 3) + '千+'+ suffix  
    }
    return mun + suffix
})


</script>
<style lang="less" scoped>
.table-item{
    display: flex; 
}
.goods-item-warp{
    width: 100%;
    margin: 0.2rem;
    padding: 0;
}

.goods-img{
    width: 100%;
    height: 10rem;
    background: #fff url("/goods/loding.png");
    background-position-x: 0%;
    background-position-y: 0%;
    background-repeat: repeat;
    background-size: auto;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 8.625rem;
    img{
        border-radius: 5px 5px 0 0;
        display: block;
        height: 100%;
        width: 100%;
        margin: 0 auto;
    }
}

.good-info{
    padding: 0.3rem;
    .good-name{
        text-align: left;
        line-height: 1.05rem;
        height: 2.6rem;
        font-size: 0.8rem;
        font-family: -apple-system, Helvetica, sans-serif;
        overflow: hidden;
        color: #434343;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        word-break: break-all;
        -webkit-box-orient: vertical;
        &.no-icon{
            height: 2.1rem;
        }
    }
    .good-icon{
        width: 1.5rem;
        display: inline-block;
        vertical-align: bottom;
        margin-right: .2rem;
    }
    .good-row{
        padding: 0.2rem 0;
        color: #ff6868;
        font-size: 0.6rem;
        
        .good-more{
            position: relative;
            .more-btn{
                background: #f6f6f6;
                position:absolute;
                top:0;
                right: 0;
                color: #434343;
                font-weight: bold;
                padding: .1rem .6rem;
                border-radius: 50% 5% 50% 5%;
              
                
             
            }
        }
        .good-row-remark{
            display: inline-block;
            border-radius: 5px;
            padding: 0.1rem 0.3rem ;
            background: #f6f6f6;
        }
        .good-row-comment{
            font-size: .8rem;
            color: #434343;
        }
        .good-row-price{
            font-size: 0.8rem;
            padding-top: 0rem;
            color: #e43130;
            .good-row-price-enlarge{
                font-size: 1.2rem;
            }
        }
        
    }
}


</style>