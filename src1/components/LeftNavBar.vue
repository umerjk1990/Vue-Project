<template>
    <div class="left-nav-wrapper">
        <div class="left-nav">
            <div class="Epigarmlogo_wrapper">
                <div class="Epigram_logo"></div>
                <div class="text_div" style="font-weight: 500" v-if="!shrinkLeftNavBar()">Epigram AI</div>
            </div>
            <div class="detail_div_wrapper">
                <div class="detail_div_inner">
                    <div class="dashboard_icon focus" v-if="setOptionStatus == 'Dashboard' || (setOptionStatus == '')"> </div>
                    <div class="dashboard_icon" v-else></div>
                    <div ref='db_text' :class="{focused: (setOptionStatus == 'Dashboard') || (setOptionStatus == '')}" v-if="!shrinkLeftNavBar()">Dashboard</div>
                    <router-link to="/Dashboard" tag="div" class="router_div"></router-link>
                </div>
                <div class="detail_div_inner">
                    <div class="project_icon focus" v-if="setOptionStatus == 'Projects' "></div>
                    <div class="project_icon" v-else></div>
                    <div ref='p_text' :class="{focused: (setOptionStatus == 'Projects')}"  v-if="!shrinkLeftNavBar()">Projects</div>
                    <router-link to="/Projects" tag="div" class="router_div">  </router-link>
                </div>
                <div class="detail_div_inner">
                    <div class="setting_icon focus" v-if="setOptionStatus == 'Setting' "></div>
                    <div class="setting_icon" v-else></div>
                    <div ref='i_text' :class="{focused: (setOptionStatus == 'Setting')}"  v-if="!shrinkLeftNavBar()">Settings</div>
                    <router-link to="/Setting" tag="div" class="router_div"></router-link>
                </div>

            </div>
            <div class="profile_div">
                <div style="display:flex;" v-if="returnLoginStatus">
                    <div class="profile_login">{{getShorName}}</div>
                    <span v-if="!shrinkLeftNavBar()">
                        <div class="text_div">{{user.username}}</div>
                        <div class="text_epigram">Epigram</div>
                    </span>
                </div>
                <div class="hide_leftnavbar_wrapper" v-on:click="toggleLeftNavBar()">
                    <div class="hide_leftnavbar" v-if="shrinkLeftNavBar()"></div>
                    <div class="hide_leftnavbar invert" v-else></div>
                    <div class="text_epigram" style="color: rgb( 171 193 224)" v-if="!shrinkLeftNavBar()">Collapse</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserStore from '../store/UsersStore'
    import { mapState } from '../store/VuexStore';

    export default {
        name: 'LeftNavBar',
        data() {
            return {
                //users: UserStore.data.users,
                user : {},
                n: 1,
                windowwidth: window.innerWidth,
                router_path : ''
            }
        },
        mounted() {
            this.$store.watch( () => this.$store.getters.RetrieveRouterAddress, router_address => {
                    this.router_path = router_address
                }
            )
        },
        computed: {
            setOptionStatus : function(){

                var string_arr = this.router_path.split("/")

                return string_arr[1]
            },

            returnLoginStatus: function () {
                //need to be fix (first time its give error when we remove username from this.user.username)

                this.user = this.$store.getters.RetrieveUserServices

                if(this.user.username)
                    return true
                else
                 return false
            },

            getShorName: function(){
                var name_array = this.user.username.split(' ')

                var shortname = name_array[0].charAt(0) + name_array[1].charAt(0)

                return shortname
            }
        },

        methods: {

            toggleLeftNavBar: function () {

                if (this.$store.state.shrink_screen)
                    this.$store.commit("shrinkScreenFalse")
                else
                    this.$store.commit("shrinkScreenTrue")
            },

            shrinkLeftNavBar: function () {

                return this.$store.state.shrink_screen
            },
        }
    }
</script>

<style scoped>
.left-nav-wrapper {
    grid-area       : left_nav_bar;
    width           : 100%;
    height          : 100vh;
    flex-direction  : column;
    justify-content : space-between;
}
.left-nav {
    height          : 100%;
    width           : var(--leftNavWidth);
    position        : fixed;
    background-color: rgb(27 32 78);
    transition      : all 0.5s;
    justify-content : space-between;
    display         : flex;
    flex-direction  : column;
}
.text_div {
    font-size       : 14px;
    color           : #ffffff;
    margin-top      : 0px;
}
.text_epigram {
    font-size       : 12px;
    color           : #3ebdb7
}
.router_div {
    width           : 150px;
    height          : 80px;
    position        : absolute;
}
.hide_leftnavbar {
    width           : 15px;
    height          : 15px;
    background-image: url('../assets/triangle invert.svg');
    background-repeat: no-repeat;
}
.hide_leftnavbar.invert {
    width           : 15px;
    height          : 15px;
    background-image: url(../assets/triangle.svg);
    background-repeat: no-repeat;
}
.hide_leftnavbar:hover {
    cursor          : pointer;
}
.Epigarmlogo_wrapper {
    width           : 100%;
    height          : 15%;
    display         : flex;
    justify-content : center;
    align-items     : center;
}
.Epigram_logo {
    width           : 50px;
    height          : 50px;
    background-image: url('../assets/logo.svg');
    background-repeat: no-repeat;
    background-size : 100% 100%;
    background-position: center;
    margin-right    : 5px;
    /* animation       : spin 3s linear infinite; */
}
/* @keyframes spin {
    100% {
        transform   : rotate(360deg);
    }
} */
.detail_div_wrapper {
    width           : 100%;
    height          : 70%;
    display         : flex;
    flex-direction  : column;
    justify-content : center;
    align-items     : center;
    font-size       : 16px;
    color           : white
}
.profile_div {
    width           : 100%;
    display         : flex;
    flex-direction  : column;
    align-items     : center;
    justify-content : center;
}
.profile_login {
    width           : 40px;
    height          : 40px;
    color           : rgb(171 193 224);
    font-weight     : bold;
    font-size       : 16px;
    background-color: rgb(44 50 102);
    display         : flex;
    justify-content : center;
    align-items     : center;
    border-radius   : 5px;
    margin-right    : 5px;
}
.detail_div_inner {
    width           : 100%;
    height          : 15%;
    display         : flex;
    flex-direction  : row;
    align-items     : center;
}
.detail_div_inner:hover {
    cursor          : pointer;
}
.hide_leftnavbar_wrapper {
    width           : 100%;
    height          : 50px;
    margin-top      : 25px;
    justify-content : center;
    align-items     : center;
    display         : flex;
    background-color: rgb(44 50 102);
}
.hide_leftnavbar_wrapper:hover {
    cursor          : pointer;
}
.dashboard_icon {
    width           : 30px;
    height          : 30%;
    background-image: url('../assets/dashboard.svg');
    background-repeat: no-repeat;
    background-size : 30px;
    background-position: center;
    padding-bottom  : 10px;
    padding-left    : 35px;
}
.dashboard_icon.focus {
    background-image: url('../assets/dashboard-focus.svg');
}
.project_icon {
    width           : 30px;
    height          : 30%;
    background-image: url('../assets/dashboard.svg');
    background-repeat: no-repeat;
    background-size : 30px;
    background-position: center;
    padding-bottom  : 10px;
    padding-left    : 35px;
}
.project_icon.focus {
    background-image: url('../assets/dashboard-focus.svg');
}
.setting_icon {
    width           : 30px;
    height          : 30%;
    background-image: url('../assets/settings-work-tool.svg');
    background-repeat: no-repeat;
    background-size : 30px;
    background-position: center;
    padding-bottom  : 10px;
    padding-left    : 35px;
}
.setting_icon.focus {
    background-image: url('../assets/settings-work-tool-focus.svg');
}
.focused {
    color: rgb(62 189 183)
}
</style>
