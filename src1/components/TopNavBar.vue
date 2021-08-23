<template>
    <div class="topnavbar_div" ref='topnavbar_ref'>

        <SearchComponent></SearchComponent>

        <div class="detail_div">

            <PathTracker id="path-tracker"></PathTracker>

            <div id="setting-div" class="setting_div" v-if="getOptionList()">

                <UserComponent  v-if="$store.getters.RetrieveUserDisplayVisibile"
                                style="padding-top: 15px;"
                                :dropdown_top_style="'36px'"
                                :users="usersCollaboration">
                </UserComponent>

                <Option></Option>

            </div>
        </div>
    </div>
</template>

<script>
    import PathTracker from './TopNavBarComponent/PathTracker'
    import UserComponent from './TopNavBarComponent/UserComponent'
    import Option from './TopNavBarComponent/Option'
    import SearchComponent from './TopNavBarComponent/SearchComponent'
    import UsersStore from '../store/UsersStore'

    export default {
        name: 'TopNavBar',
        components: {
            PathTracker,
            UserComponent,
            Option,
            SearchComponent
        },
        data() {
            return {
                shrink_screen: false
            }
        },
        beforeDestroy: function () {
            window.removeEventListener('resize', this.handleWindowResize)
        },
        mounted() {
            window.addEventListener('resize', this.handleWindowResize);
        },
        computed: {

            shrinkScreen: function () {
                return this.$store.state.shrink_screen
            },
            usersCollaboration: function(){
                //if collaborators array is empty, then check it at the backend
                if( this.$store.getters.RetrieveProjectCollabortors.length == 0){

                    var array_c = []
                    //get current project ID
                    var project_id = this.$route.params.user_id
                    //getting list of projects from vuex
                    var project_l = this.$store.getters.doneFetchingProjects

                    for (let index = 0; index < project_l.length; index++) {

                        if(project_l[index].id == project_id){
                            //returning the array of user collaboration
                            return project_l[index].collaborators
                        }
                    }
                    return  this.$store.getters.RetrieveSingleProject.collaborators
                }

                return this.$store.getters.RetrieveProjectCollabortors
            },
        },
        methods: {

            getOptionList: function(){
                var route = this.$route.path.split('/')

                if(route[route.length-1] == 'Dashboard')
                    return false
                else
                    return true
            },

            //Shrinks the path if the path component and the setting component collides
            handleWindowResize(event) {
                let settingDiv = document.getElementById("setting-div");
                let pathNodes = document.getElementsByClassName("pathtracker_div");
                if(pathNodes[pathNodes.length - 1].getBoundingClientRect().right + 5 >= settingDiv.getBoundingClientRect().left){
                    this.$store.state.path_available--;
                } else {
                    let paths = document.getElementsByClassName("pathtracker_div");
                    try {
                        let nextPathUp = paths[this.$store.state.path_max_count - this.$store.state.path_available - 1];
                        if (pathNodes[pathNodes.length - 1].getBoundingClientRect().right + nextPathUp.offsetWidth
                            < settingDiv.getBoundingClientRect().left) {
                            nextPathUp.style.visibility = 'visible';
                            nextPathUp.style.position = 'relative';
                            this.$store.state.path_available++;
                        }
                    } catch (e) {
                    }
                }
            },
            textbox_click: function () {
                if (this.$refs['search_tb'].value == 'Search')
                    this.$refs['search_tb'].value = ''
            },
            textbox_blur: function () {
                if (!this.$refs['search_tb'].value)
                    this.$refs['search_tb'].value = 'Search'
            },
            returnLast: function (index) {
                if (index == this.pathtracker.length - 1)
                    return true
                else
                    return false
            },

        }
    }
</script>

<style scoped>
    #path-setting-spacer {
        grid-area       : path-setting-spacer;
    }
    .topnavbar_div {
        background-color: rgb(255 255 255);
        transition      : all 0.5s;
        box-shadow      : 0px 5px 10px 0px rgba(0, 0, 0, 0.16);
    }
    .detail_div {
        display         : grid;
        grid-template-columns: auto auto;
        grid-template-rows: 1fr;
        grid-template-areas: "path setting";
    }
    .setting_div {
        grid-area       : setting;
        float           : right;
        display         : flex;
        justify-content : flex-end;
    }
</style>