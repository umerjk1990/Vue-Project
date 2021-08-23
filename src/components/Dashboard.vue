<template>
    <div class="dashboard">
        <div class="update_and_visit_div">

            <div class="last_event_div"> Last Events
                <button class="button_click" v-on:click="add_new_element">click</button>
                <div class="lastevent_inner">
                    <UserEvents ref='something' :users='users'></UserEvents>
                </div>
                <div    class="see_all_div"
                        v-on:click="showall_userevent = !showall_userevent"
                        v-if="users.length >5">
                    see all User Events
                </div>
            </div>

            <PopupMenuOvelay v-if="showall_userevent" @cancel-clicked=cancelClicked>
                <div v-for="(user, i) in users" :key="i">
                    <ProjectListPopup :user="user"></ProjectListPopup>
                </div>
            </PopupMenuOvelay>

            <div class="last_visited_project_div">Recently Visited Projects
                <div class="last_visited_project_div_inner">
                    <div v-for="(project, index) in $store.getters.doneFetchingProjects" v-if="index < 6">
                        <ProjectsListComponent :project="project"></ProjectsListComponent>
                    </div>
                </div>
            </div>
        </div>

        <div class="heading_and_button_div">
            <div>Last Visited BluePrint</div>
            <div class="expand_button_div" v-on:click="expand = !expand">
                <div v-if="expand">-</div>
                <div v-else>+</div>
            </div>
        </div>
        <div class="last_visited_blueprint_div" :style="{height : expand ? 'auto' : ''}">
            <div v-for="blueprint in $store.getters.RetrieveDataSet">
                <BluePrint :data_object="blueprint" v-if="blueprint.blueprint"></BluePrint>
            </div>
        </div>

        <div class="models_in_training_div" > Models under training
            <div class="model">
                <div v-for="model in $store.getters.RetrieveModels">
                    <ModelsList :model="model"></ModelsList>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserEvents           from "./MainComponents/UserEvents"
import BluePrint            from './MainComponents/BluePrint'
import ModelsList           from './MainComponents/ModelsList'
import ProjectsListComponent from './MainContent/ProjectMainContent componnet/ProjectsListComponent/ProjectsListComponent'

import PopupMenuOvelay      from './CommonComponent/PopupMenu-Ovelay'
import ProjectListPopup     from './CommonComponent/ProjectListPopup'
    export default {
        components : {
            UserEvents,
            BluePrint,
            ModelsList,
            ProjectsListComponent,
            PopupMenuOvelay,
            ProjectListPopup
        },
        data() {
            return{
                projects : [],
                expand : false,
                scroll_value : 80,
                temp_scroll : 0,

                dataset_list : {},

                showall_userevent: false,

                users : [
                    {
                        id              : Math.floor(Math.random()*100000),
                        name            : 'Forat Seif',
                        nick_name       : 'FS',
                        update_notification : 'Has uploaded the pictures',
                        dataset_date    : 'January 2019',
                        project         : 'Squirrel Project',
                        color           : 'green',
                    },
                    {
                        id              : Math.floor(Math.random()*100000),
                        name            : 'Olav Djupvik',
                        nick_name       : 'OD',
                        update_notification : 'has changed the facade',
                        dataset_date    : 'May 2019',
                        project         : 'Damage V3',
                        color           : 'red',
                    },
                    {
                        id              : Math.floor(Math.random()*100000),
                        name            : 'Forat Seif',
                        nick_name       : 'FS',
                        update_notification : 'Has uploaded the pictures',
                        dataset_date    : 'June 2019',
                        project         : 'Squirrel Project',
                        color           : 'green',
                    },
                    {
                        id              : Math.floor(Math.random()*100000),
                        name            : 'Asbjørn Sola',
                        nick_name       : 'AS',
                        update_notification : 'Updated the Pictures',
                        dataset_date    : 'December 2018',
                        project         : 'Horse Project',
                        color           : 'blue',
                    },
                    {
                        id              : Math.floor(Math.random()*100000),
                        name            : 'Oda Sofie Dahl Eide',
                        nick_name       : 'OE',
                        update_notification : 'Has upload the pictures',
                        dataset_date    : 'january 2019',
                        project         : 'Wolf Project',
                        color           : 'cyan',
                    },
                ],
            }
        },
        mounted(){

            //Fetching Projects from the backend
            this.$store.dispatch('fetchProjects')

            //Update Address in VuexStore
            this.$store.dispatch('UpdateRouterAddress', this.$router.currentRoute.path)

            //Dont display Users on Top Nav Bar
            this.$store.dispatch('setUserComponentVisibility', false)

            //get dataset list containing dataset object and store in dataset_list
            this.dataset_list = this.$store.getters.RetrieveDataSet

            //Soring the Blueprint_list with update date
            this.dataset_list.sort(function(a, b){
                var dateA=new Date(a.updated_at), dateB=new Date(b.updated_at)
                return dateB-dateA //sort by date decending
            })
            /* ***** */
        },

        methods: {
            add_new_element: function(){
                console.log(this.$refs['something'].append_noti())
                this.$refs['something'].append_noti();
            },
            cancelClicked: function(bool){
                this.showall_userevent = bool
            },
        }
    }
</script>

<style scoped>
.lastevent_inner{
    height              : 385px;
    overflow            : hidden;
    margin-top          : 20px;
    border-radius       : 20px;
    border              : 1px solid #ccc;
    background-color    : #ffffff;
}
.button_click{
    width               : 50px;
    height              : 20px;
    border              : 1px solid grey;
}
.button_click:hover{
    cursor              : pointer;
}
.dashboard{
    width               : 100%;
    height              : 100%;

    /* Font Style */
    font-size           : 13px;
    line-height         : 1.38;
    font-weight         : normal;
    color               : #65768f;
    /* color               : #747474; */
}
.update_and_visit_div{
    display             : flex;
}
.last_event_div{
    width               : 45%;
    padding-right       : 30px;
    font-weight         : bold;
}
.last_visited_project_div{
    width               : 55%;
    font-weight         : bold;
}
.heading_and_button_div{
    margin-top          : 50px;
    display             : flex;
    justify-content     : space-between;
    font-weight         : bold;
}
.expand_button_div{
    width               : 20px;
    height              : 20px;
}
.expand_button_div:hover{
    cursor              : pointer;
}
.last_visited_project_div_inner{
    margin-top          : 25px;
    padding-right       : 10px;
}
.last_visited_blueprint_div{
    height              : 200px;
    overflow            : hidden;
    padding-right       : 5px;
    display             : flex;
    flex-wrap           : wrap;
}
.models_in_training_div{
    margin-top          : 50px;
    margin-bottom       : 20px;
    padding-right       : 100px;
    font-weight         : bold;
}
.model{

    display:flex;
    flex-wrap: wrap

}
.see_all_div{
    margin-top: 20px;
    font-size: 13px;
    color: #65768f;
    text-decoration-line: underline;
    margin-right: 20px;
    font-weight: normal
}
.see_all_div:hover{
    cursor: pointer;
    color:#14253c
}
</style>
