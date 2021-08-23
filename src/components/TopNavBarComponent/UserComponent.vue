
/* Need to fix the problem on top nav bar to show user when user go to the specific project  */

<template>
<div class="usercomponent_div" @mouseleave="mouseLeave()" v-on:click.stop>
    <!-- display user -->
    <div v-for="(user, index) in users"
        :key="index"
        v-if="index < min_length && !show_user_list"
        @mouseover="mouseOver">

        <div class="user_div" :style="{backgroundColor : user.color}">
            {{getShorName(user.username)}}
        </div>
    </div>

    <!-- show more user that is three dot -->
    <div class="user_div" style="font-family: 'Open Sans', sans-serif" ref='user_ref' v-if="users.length > 0" v-on:click="fromProjetcList()">...</div>

    <!-- display user on dropdown menu -->
    <div class="userlist_container">
        <transition name="dropDown">
            <div class="userlist_wrapper" v-if="show_user_list" :style="dropDownStyle">
               <!--  <div class="adduser_div"> Add User </div> -->
                <div class="user_wrapper" v-for="user in users" v-on:click="userCallBackFunction(user.username)">
                    <div class="user_detail_wrapper">
                        <div class="user_div" style="margin-bottom: 20px;" :style="{backgroundColor : user.color}"> {{getShorName(user.username)}} </div>
                        <div class="userdetail_div">
                            <div class="name_div">{{user.username}}</div>
                            <div class="email_div">{{user.email}}</div>
                        </div>
                    </div>
                    <div class="remove_edit_user">
                        <div class="edit_icon_div"></div>
                        <div class="delete_icon_div"></div>
                    </div>
                </div>

                <!-- Added new user Section -->
                <div class="user_wrapper" v-on:click="addNewUser()">
                    <div style="display: flex;">
                        <div class="user_div ">+</div>
                        <div style="font-size: 15px;">Add new user</div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</div>
</template>

<script>


    export default {
        props: {
            users:              { type : Array  , default : function () { return [] } },
            from_project_list:  { type: Boolean , default: false },
            dropdown_top_style: { type : String , default: '' }
        },
        data() {
            return {
                show_user_list: false,
                shrink_user: false,
                min_length: 3
            }
        },
        mounted() {
            //click event trigger the closeDropDown function
            window.addEventListener('click', this.closeDropDown);
        },
        computed: {
            dropDownStyle: function(){
                return {
                    top : this.dropdown_top_style
                }
            },
            optionMenu() {
                return this.$store.state.close_menu
            },

        },

        methods: {
            getShorName: function(username){

                var name_array = username.split(' ')

                var shortname = name_array[0].charAt(0) + name_array[1].charAt(0)

                return shortname
            },
            userCallBackFunction: function(name){
                console.log("You have click on Call back function of ", name)
            },
            mouseOver: function(){
                if(!this.from_project_list)
                    this.show_user_list = true
            },
            mouseLeave : function(){
                if(!this.from_project_list)
                    this.show_user_list = false
            },
            fromProjetcList: function(){
                if(this.from_project_list)
                    this.show_user_list = !this.show_user_list
                return this.show_user_list
            },
            addNewUser: function(){

                console.log("Add new User")
            },
            closeDropDown: function (event) {
                //error handaling for undefine div
                if( this.$refs['user_ref'] == undefined)
                    return
                //is click outside drop down menu
                if (!this.$refs['user_ref'].contains(event.target))
                    this.show_user_list = false
            },
            shrinkUser: function () {
                return this.$store.state.shrink_screen
            },
        }
    }
</script>

<style scoped>
@keyframes dd {
    0% {
        height: 0%
    }
    100% {
        height: 100%
    }
}

.dropDown-enter-active{
    animation: dd .1s;
}
.dropDown-leave-active{
    animation: dd .1s reverse;
}

.dropDown {
    -webkit-animation-name: dropDown;
    animation-name: dropDown;
    }

.userlist_container{
    position: relative;

}
.userlist_wrapper{
    position: absolute;
    right: 10px;
    top: 43px;
    background-color: rgb(255, 255, 255);
    color: #382b53;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    box-shadow: inset 0 12px 9px -7px rgba(0, 0, 0, 0.16);
    border: 1px solid rgb(206 206 206);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    overflow: hidden;
    padding-bottom: 20px;
    padding-top: 10px;
}
.adduser_div{
    margin-top: 20px;
    margin-bottom : 10px;
    padding-left: 20px;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 1.38;
    text-align: left;
    color: #000000;
}
.adduser_div:hover{
    cursor: pointer;
}
.user_wrapper{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
    padding: 5px 20px;
}
.user_wrapper:hover{
    cursor: pointer;
    background-color: rgba(214, 221, 232, 0.50)
}
.user_detail_wrapper{
    display: flex;
    align-items: center;
}
.remove_edit_user{
    display: flex;
    margin-bottom: 20px;
}
.edit_icon_div{
    width: 20px;
    height: 20px;
    background-image: url('../../assets/pencil-edit-button.svg');
    background-repeat: no-repeat;
    background-size: 15px;
    background-position: center;
}
.edit_icon_div:hover{
    background-color: #00000016;
    background-size: 20px;
}
.delete_icon_div{
    width: 20px;
    height: 20px;
    margin-left: 10px;
    background-image: url('../../assets/close.svg');
    background-repeat: no-repeat;
    background-size: 15px;
    background-position: center;
}
.delete_icon_div:hover{
    background-color: #00000016;
    background-size: 20px;
}
.usercomponent_div {
    width: 132px;
    display: flex;
    justify-content: flex-end;
    /* padding-left: 10px;
    padding-bottom: 30px; */
}
.user_div {
    width: 25px;
    height: 25px;
    color: rgb(255 255 255);
    font-family: Roboto Mono;
    font-size: 14px;
    font-weight: bold;
    line-height: 1.36;
    letter-spacing: 0.21px;
    color: #ffffff;
    background-color: rgb(27 32 78);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-right: 8px;

}
.user_div:hover {
    cursor: pointer;
}
.user_div.dropdown {
    background-color: #382b53;
    color: #eaeaf1;
    width: 40px;
    height: 40px;;
}
.name_div {
    font-size: 16px;
    font-weight: bold;
    line-height: 1.5;
}
.email_div {
    font-size: 14px;
    font-weight: lighter;
}
</style>

