/* Menu Option WITHOUT Icon */
<template>
    <div class="allprojects_sort_div" v-on:click.stop="show_menu = !show_menu">
        <span style="margin-left : 25px;"> {{selected_option}} </span>
        <transition name="dropDown">
            <div class="dropdown_div" v-if="show_menu">

            <div>
                <div class="dropdown_items_div" v-for="(item, index) in project_list" v-on:click="setDropDown(index)">{{item}}</div>
            </div>
            </div>        
        </transition>
    </div>    
</template>

<script>
export default {
    props:{
        project_list:{
            type: Array,
        },
    },
    data(){
        return{
            selected_option : '' ,
            
            show_menu : false,
        }
    },
    mounted(){
        this.selected_option  = this.project_list[0]

        //Event listner active when click outside of this component
        var th = this;
        window.addEventListener('click', function(){

            th.show_menu = false

        });
    },
    methods:{
        //
        setDropDown: function(i){
            this.selected_option = this.project_list[i]
            console.log("you have click on ", this.project_list[i])
        },
    }
}
</script>

<style scoped>
.allprojects_sort_div{
    width               : 225px;
    height              : 34px;
    border-radius       : 8px;
    border              : solid 1px #cecece;
    background-color    : #ffffff;
    background-image    : url('../../assets/triangle down.svg');
    background-repeat   : no-repeat;
    background-position : center; 
    background-size     : 15px;
    background-position-x: 85%; 
    background-position-y: 8px; 
    padding-top: 6px;
}
.dropdown_div{
    width               : 225px;
    position            : relative;
    bottom              : 31px;
    right               : 1px;
    border-radius       : 8px;
    background-image    : url('../../assets/triangle down focus.svg');
    background-repeat   : no-repeat;
    background-position : center; 
    background-size     : 15px;
    background-position-x: 85%; 
    background-position-y: 8px; 
    box-shadow          : 0 2px 6px 0 rgba(0, 0, 0, 0.16);
    border              : solid 1px #cecece;
    background-color    : #ffffff;
}
.dropdown_items_div{
    padding-left: 25px;
    font-size: 13px;
    font-weight: 600;
    color: #000000;
    padding-top: 5px;
padding-bottom: 5px;
}
.dropdown_items_div:hover{
    background-color: rgba(194, 194, 194, 0.288);
}

/* Transition */
.dropDown-enter,
.dropDown-leave-to {
    opacity: 0;
    transform: rotateX(90deg) translateY(-20px);
}.dropDown-enter-to,
.dropDown-leave {
    opacity: 1;
    transform: rotateX(0deg) translateY(0px);
}.dropDown-enter-active,
.dropDown-leave-active {
    transition: opacity, transform 100ms linear;
}
.dropDown {
    -webkit-animation-name: dropDown;
    animation-name: dropDown;
}
</style>
