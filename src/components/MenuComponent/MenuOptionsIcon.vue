/* Menu Option WITH Icon */
<template>
    <div class="option_div" v-on:click.stop="show_menu = !show_menu" :style="{ backgroundSize : backgroundSize+'px',
                                                                                width : div_width+'%' }">
        <transition name="dropDown">
            <div class="dropdown_div" ref='dropdown_id' v-if="show_menu"
                :style="{ borderTopRightRadius : topright_radius+'px' ,
                          top : top+'px',
                          right : right+'px'}" >
                <div class="three_dot" v-if="three_dots"></div>
                <div v-for="(ol, index) in option_list" :key="index" class="dropdown_wrapper" v-on:click="$emit('button-trigger', ol.option )">
                    <img class="option_image" :src=ol.icon>
                    <div >{{ol.option}}</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props:{
        div_width:{
            type: Number,
        },
        right:{
            type: Number,
        },
        top:{
            type: Number,
        },
        topright_radius:{
            type: Number,
        },
        option_list:{
            type: Array,
        },
        three_dot:{
            type: Boolean,
            required: false,
            default: false
        },
        backgroundSize:{
            type: Number,
        },
        three_dots:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            show_menu : false,
        }
    },
    mounted(){
        //Event listner active when click outside of this component
        window.addEventListener('click', (function(){

            this.show_menu = false
        }).bind(this));
    },
    methods:{
        callBackFunction: function(option_name){
            this.$emit('button-trigger', option_name)
            //console.log("You have click on ", option_name)
        }
    },
}
</script>

<style scoped>
.option_div{
    width               : 10%;
    height              : 100%;
    position            : relative;
    background-image    : url('../../assets/three dot options.svg');
    background-repeat   : no-repeat;
    background-position : center;
    background-size     : 20px;

    font-size           : 16px;
    font-weight         : bold;
    line-height         : 1.89;
    color: #1b204e;
}
.option_div:hover{
    cursor              : pointer;
}
.menuoptions_div{
    width               : 225px;
    position            : relative;
    right               : 120px;
    top                 : 15px;
    border-radius       : 15px 0px 15px 15px;
    background-color    : rgba(255, 0, 0, 0.081);

}
.dropdown_div{
    width               : 225px;
    position            : absolute;
    top                 : 10px;
    right               : 10px;
    border-radius       : 8px;

    box-shadow          : 0 2px 6px 0 rgba(0, 0, 0, 0.16);
    border              : solid 1px #cecece;
    background-color    : #ffffff;
    z-index             : 1;
    padding-top         : 10px;
    padding-bottom      : 10px
}
.three_dot{
    width               : 40px;
    height              : 40px;
    position            : absolute;
    right               : 0px;
    background-image    : url('../../assets/three dot options focus.svg');
    background-repeat   : no-repeat;
    background-position : center;
    background-size     : 15px;
    background-position-x: 50%;
    background-position-y: 50%;
    background-color    : transparent;
}
.dropdown_wrapper{
    display             : flex;
    padding-left        : 25px;
    font-size           : 13px;
    font-weight         : 600;
    line-height         : 1.38;
    margin-top          : 5px;
    margin-bottom       : 5px;
    padding-top         : 5px;
    padding-bottom      : 5px;
}
.dropdown_wrapper:hover{
    background-color: #cecece;
}
.option_image{
    width               : 15px;
    height              : 15px;
    padding-right       : 10px;

}

/* Transition */



/* .dropDown-enter,
.dropDown-leave-to {
    opacity: 0;
}
.dropDown-enter-to,
.dropDown-leave {
    opacity: 1;
}
.dropDown-enter-active,
.dropDown-leave-active {
    transition: opacity;
}
.dropDown {
    -webkit-animation-name: dropDown;
    animation-name: dropDown;
} */
@keyframes dd {
    0% {
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}

.dropDown-enter-active{
    animation: dd 0.1s;
}
.dropDown-leave-active{
    animation: dd 0.1s reverse;
}

.dropDown {
    -webkit-animation-name: dropDown;
    animation-name: dropDown;
}

</style>