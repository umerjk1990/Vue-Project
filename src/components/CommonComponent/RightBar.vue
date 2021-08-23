<template>
<div >
    <div class="wrapper_div" v-if="!hide">
        <div class="arrow_div" v-on:click="onClickfolding()"></div>
        <slot></slot>
    </div>
    <div v-else class="rightarrow_div_wrapper" :style="{ transform : noti ? 'scale(1.1)' : 'scale(1)' }" v-on:click="onClickfolding()">
        <div class="arrow_right_div" ></div>
    </div>
</div>
</template>

<script>
export default {
    props:{
        noti: {
            type: Boolean,
            default: false,
        },
        hide_bar:{
            type: Boolean,
            default : false
        }
    },
    data() {
        return{
            hide : false,
        }
    },
    watch:{
        hide_bar: function(){
            this.hide = this.hide_bar
        }
    },
    beforeDestroy: function () {
        window.removeEventListener('resize', this.handleWindowResize)
    },
    mounted(){
        //Detect the screen width
        window.addEventListener('resize', this.handleWindowResize);
    },
    methods: {
        onClickfolding: function(){
            this.hide = !this.hide
            this.$emit('is-hide', this.hide)
        },
         handleWindowResize(event) {

            this.windowwidth = event.currentTarget.innerWidth;
            if (this.windowwidth < 1100) {
                this.hide = true
            }
        },
    }
}
</script>

<style>
.wrapper_div{
    background-color: white;
    width: 270px;
    height: calc( 100vh - 167px );
    padding: 40px;
    background-color:
    rgb(255 255 255);
    box-shadow: 0px 5px 10px 0px
    rgba(0, 0, 0, 0.16);
    position: fixed;
    right: 0px;
    overflow: auto;
    top: 86px;

/*     background-color: white;
    width: 270px;
    height: 760px;
    padding: 40px;
    margin-top: -40px;
    margin-right: -30px;
    background-color: rgb(255 255 255);
    box-shadow : 0px 5px 10px 0px rgba(0, 0, 0, 0.16);
    position: fixed;
    right: 0; */
}
.arrow_div{

    width: 12px;
    height: 12px;
    position: relative;
    left: -15px;
    top: -15px;
    background-image: url('../../assets/trianle-left.svg');
    background-size: 12px;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
}
.arrow_right_div{
    width: 12px;
    height: 12px;
    position: relative;
    top: 8px;
    right: -5px;
    background-image: url('../../assets/triangle-right-lightgrey.svg');
    background-size: 12px;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
}
.rightarrow_div_wrapper{
    position: fixed;
    right: 0px;
    top: 150px;
    cursor: pointer;
    width: 25px;
    height: 30px;
    background-color: #1b204e;
    border: 1px solid #fafafa;
}
</style>