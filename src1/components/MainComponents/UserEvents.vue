<template>
    <div class="latest_events_component">
        <transition-group name="zoomInDown" tag='div'>
            <div class="for_div" v-for="(user,index) in users" :key="index">
                <div class="user_wrapper_div" v-if="user" v-on:click.stop="show_allevents = !show_allevents">
                    <div class="user_div" :style="{ backgroundColor : user.color }"> {{user.nick_name}} </div>
                    <div style="width: 50%;">
                        <div class="name_div"> {{user.name}} </div>
                        <div class="updatenotification_div"> {{user.update_notification}} </div>
                    </div>
                    <div>
                        <div class="project_div"> Project: {{user.project}} </div>
                        <div class="datasetdate_div"> Dataset: {{user.dataset_date}} </div>
                    </div>
                </div>
                <div v-else style="height: 76px;"></div>
            </div>
        </transition-group>
        <PopupMenu v-if="show_allevents">
            <div v-for="(user, i) in users" :key="i">
                <ProjectListPopup :user="user"></ProjectListPopup>
            </div>
        </PopupMenu>
    </div>
</template>

<script>
import UserUpdateNotification from '../../store/UserUpdateNotification'
import PopupMenu from '../CommonComponent/PopupMenu-Ovelay'
import ProjectListPopup from '../CommonComponent/ProjectListPopup'
export default {
    components:{
        PopupMenu,
        ProjectListPopup
    },
    props:{
        users:{
            type: Array
        },
    },
    data(){
        return{
            show_allevents : false,
        }
    },
    mounted(){
        //Event listner active when click outside of this component
        window.addEventListener('click', (function(){
            this.show_allevents = false
        }).bind(this));
    },

    methods: {
        append_noti: function(){
            var new_user = {
                    id              : Math.floor(Math.random()*100000),
                    name            : 'New User',
                    nick_name       : 'NU',
                    update_notification : 'Has uploaded the pictures',
                    dataset_date    : 'January 2019',
                    project         : 'Squirrel Project',
                    color           : 'red',
                }
            this.users.splice(0, 0,new_user);
        },
        userCallBackFunction : function(name){
            console.log("You have click on call back function of " , name)
        },
    }

}
</script>

<style scoped>

.zoomInDown-enter-active{
    animation: zoomInDown .5s;
}
@keyframes zoomInDown {
  from {
    opacity: 0;
    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}


.latest_events_component{
    /* Font Style */
    font-family     : Sans-serif;
    font-size       : 16px;
    font-weight     : normal;
    font-style      : normal;
    font-stretch    : normal;
    line-height     : 1.38;
    letter-spacing  : normal;
    text-align      : left;
    color           : #14253c;
}
.for_div{
    border-bottom   : 1px solid #d6dde8;
}
.user_wrapper_div{
    padding-bottom  : 15px;
    padding-top     : 20px;
    padding-left    : 20px;

    display         : flex;
    justify-content : flex-start;
    cursor          : pointer;

}
.user_wrapper_div:hover{
    background-color: #f7f7f7
}
.user_div{
    width           : 25px;
    height          : 25px;
    margin-top      : 10px;
    color           : rgb(255 255 255);
    font-family     : Roboto Mono;
    font-size       : 14px;
    font-weight     : bold;
    line-height     : 1.36;
    letter-spacing  : 0.21px;
    color           : #ffffff;
    background-color: rgb( 27 32 78);
    display         : flex;
    justify-content : center;
    align-items     : center;
    border-radius   : 5px;
    margin-right    : 15px;
}
.name_div{
    font-weight     : bold;
}
.updatenotification_div{
    font-size       : 13px;
}
.project_div{
    margin-top      : 5px;
    font-size       : 13px;
    color           : #65768f;
}
.datasetdate_div{
    font-size       : 13px;
    color           : #65768f;
}
</style>
