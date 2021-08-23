<template>
    <div class="body_div">
        <div v-if="loginDisplay">
            <div>User Name</div>
            <input type="text" id="username">
            <div>Password</div>

            <input type="text" id="password">
            <button v-on:click="loginButton()">Login</button>
        </div>
        <div id="dashboard" class="dashboard-grid-container" style="overflow: hidden; backgroundColor: #edf1f5; width: 100vw"
             v-if="dashboardDisplay">
            <LeftNavBar id="left-nav-bar"></LeftNavBar>
            <TopNavBar id="top-nav-bar" :style="{ marginLeft : $store.state.shrink_screen? '80px' : '' }"></TopNavBar>
            <div class="maincontent_div">
                <router-view to='/Dashboard'></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import LeftNavBar from './components/LeftNavBar'
    import TopNavBar from './components/TopNavBar'

    import {userService} from './dao/services';

    export default {
        name: 'app',
        components: {
            LeftNavBar,
            TopNavBar,
        },
        data() {
            return {
                login_display: true,

                user: {
                    username: '',
                    password: ''
                },
            }
        },
        beforeDestroy: function () {
            window.removeEventListener('resize', this.handleWindowResize)
        },
        created(){
            // send the request to fetch Prjects, Models, UserServices data from backend and store in VuexStore
            this.$store.dispatch('fetchModels')
            this.$store.dispatch('fetchProjects')
            this.$store.dispatch('fetchUserServices')
            this.$store.dispatch('fetchDataset')

        },
        mounted() {
            //Detect the screen width
            window.addEventListener('resize', this.handleWindowResize);


        },
        computed: {
            loginDisplay: function () {
                return !this.$store.state.login_status && !this.$store.state.loading
            },
            dashboardDisplay: function () {
                return this.$store.state.login_status && !this.$store.state.loading
            },
            shrinkScreen: function () {
                return this.$store.state.shrink_screen
            },
        },
        methods: {

            loginButton: function () {
                //Get username and password
                this.user.username = document.getElementById('username').value;
                this.user.password = document.getElementById('password').value;

                //Getting HTTP link
                let login = userService.login(this.user);

                login.then((value) => {
                    console.log('login response:', value)
                }, (error) => {
                    console.error('error', error)
                });

            },
            handleWindowResize(event) {

                this.windowwidth = event.currentTarget.innerWidth;
                if (this.windowwidth < 1100) {
                    this.$store.commit("shrinkScreenTrue");
                }
                //this.shrink_screen = true
                else {
                    this.$store.commit("shrinkScreenFalse");
                }
            }
        }
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800&display=swap');
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');

#dashboard {
    --leftNavWidth  : 180px;
}
#top-nav-bar {

    grid-area       : top_nav_bar;
    width           : -moz-available;           /* for FireFox */
    width           : -webkit-fill-available;   /* for Chrome */
    z-index         : 5;
    height          : 85px;
    position        : fixed;
    margin-left     : 175px;
}
#left-nav-bar {
    z-index         : 10;
}
.body_div{
    font-family     : 'Open Sans', sans-serif;
    font-size       : 24px;
    font-weight     : 600;
    font-style      : normal;
    font-stretch    : normal;
    line-height     : 1.38;
    letter-spacing  : normal;
    text-align      : left;
    color           : #1b204e;
    overflow-x      : hidden;
}
.maincontent_div {
    grid-area       : main_content;
    margin-top      : 20px;
    padding-left    : 30px;
    padding-right   : 30px;
    overflow-x      : hidden;
}
.dashboard-grid-container {
    background-color: #fafafa;
    display         : grid;
    grid-template-columns: var(--leftNavWidth) auto;
    grid-template-rows: 108px auto;
    grid-template-areas: "left_nav_bar top_nav_bar" "left_nav_bar main_content";

}
.dashboard-grid-container--fit{
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
.dashboard-grid-container--fill {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}
.dashboard-grid-container--fit {
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}


</style>
