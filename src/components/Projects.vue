<template>
    <div class="projects">

        <div class="project_wrapper_div">
            <div>
                <!-- Send Array of object {containg name, custom_width, content_allign, padding, icon, image_icon} as props  -->
                <TableComponent :columns_array="columns_array"
                                :data_array="$store.getters.doneFetchingProjects"
                                :check_box="$store.state.delete_project"
                                @row-click="rowClick"
                                @top-row-click="sortBy"
                                @check-box-emit="checkBoxEmit">
                </TableComponent>
            </div>

        </div>
        <button class="deleteproject_button" v-if="$store.state.delete_project" v-on:click="deleteProject">Delete Project({{project_ids.length}})</button>
        <button class="deleteproject_button cancel" v-if="$store.state.delete_project" v-on:click="cancelDeletingProject">Cancel</button>
    </div>
</template>

<script>
import OptionMenu       from './MenuComponent/MenuOption'
import DeleteProject    from './MainContent/ProjectMainContent componnet/DeleteProject'
import {projectService} from '../dao/services'
import TableComponent   from './CommonComponent/TableComponent'
import UserComponent    from './TopNavBarComponent/UserComponent'
import IconComponent    from './CommonComponent/IconComponent'

    export default {
        components:{
            OptionMenu,
            DeleteProject,
            TableComponent,
            IconComponent
        },
        data(){
            return{
                project_ids : [],

                columns_array : [
                    {
                        key : 'favorite',
                        title : require("../assets/star_favourite.svg"),
                        type : 'icon',
                        component : IconComponent,
                        precompute: function(arr){
                            if(arr){
                                return {
                                    src: require("../assets/star_favourite.svg"),
                                }
                            }
                            else{
                                return {
                                    src: require("../assets/star_unfavourite.svg"),
                                }
                            }
                        },
                        width: "60px"
                    },
                    {
                        key : 'name',
                        title : 'Project',
                        type : 'text',
                        value_style: {
                            fontWeight: 'bold',
                        },
                    },
                    {
                        key : 'updated_at',
                        title : 'Date',
                        type : 'text',
                        precompute: function(val){
                            var date = new Date(val)
                            var year = date.getUTCFullYear();
                            var month = date.getUTCMonth() + 1;  // months start at zero
                            var day = date.getUTCDate();
                            return day+'.'+month+'.'+year
                        }
                    },
                    //we dont have dataset so we are using tree_id instead
                    {
                        key : 'tree_id',
                        type : 'text',
                        title : 'Dataset',
                        width: "90px",
                        value_style: {
                            textAlign: 'end'
                        }
                    },
                    {
                        key : 'collaborators',
                        title : 'Users',
                        type : 'component',
                        component: UserComponent,
                        precompute: function(arr){
                            return {
                                users: arr,
                                from_project_list: true,
                            }
                        },
                        value_style: {
                            float: 'right'
                        }
                    },
                ],
            }
        },
        mounted(){
            //Updating the path track in Vuex
            this.$store.dispatch('UpdateRouterAddress', this.$router.currentRoute.path)

            //Display Users FALSE on Top Nav Bar
            this.$store.dispatch('setUserComponentVisibility', false)
        },
        computed:{

            shrinkScreen: function(){
                return this.$store.state.shrink_screen

            }
        },
        methods:{
            checkBoxEmit: function(project_obj, ischeck){
                if(ischeck)
                    this.project_ids.push(project_obj)
                else{
                    for( var j = 0; j < this.project_ids.length; j++){
                        if ( this.project_ids[j] === project_obj)
                            this.project_ids.splice(j, 1)
                    }
                }
            },
            rowClick: function(obj){
                this.$router.push({ path: 'Projects/'+obj.id })
            },
            sortBy: function(title, sort_by){
                console.log(title, sort_by)
            },
             deleteProject: function(){
                console.log("Deleting Projects...")
            },
            cancelDeletingProject: function(){
                this.$store.commit('toggleDeleteProject')
                this.project_ids = []
            }
        }
    }
</script>

<style scoped>
.projects{
    padding-top         : 20px;
    font-size           : 16px;
    font-weight         : normal;
    font-style          : normal;
    font-stretch        : normal;
    line-height         : 1.89;
    letter-spacing      : normal;
    display             : flex;
    justify-content     : center;
    color               : #66778a;
}
.alphabate_div{
    margin-top          : 100px;
    width               : 50px;
    height              : 400px;
    color               : #1b204e;
}
.purplestar_div{
    width               : 100%;
    height              : 20px;
    background-image    : url('../assets/star.svg');
    background-repeat   : no-repeat;
    background-position : center;
    margin-bottom       : 10px;
}

.project_wrapper_div{
    width: 80%;
}
.sort_div{
    height              : 100px;
    display             : flex;
    justify-content     : space-between;
    font-size           : 16px;
    line-height         : 1.38;
    color               : #14253c;
}
.sort_by_div{
    width               : 225px;
    height              : 40px;
    border-radius       : 8px;
    border              : solid 1px #cecece;
    background-color    : #ffffff;
    background-image    : url('../assets/triangle down.svg');
    background-repeat   : no-repeat;
    background-position : center;
    background-size     : 15px;
    background-position-x: 85%;
    background-position-y: 8px;
}
/* .project_wrapper_div{
    width               : 800px;
    display             : flex;
} */
.select_project{
    width               : 20px;
    height              : 20px;
    margin-top          : 23px;
    margin-left         : -23px;

    position            : relative;
    right               : -45px;

    -ms-transform       : scale(1.5); /* IE */
    -moz-transform      : scale(1.5); /* FF */
    -webkit-transform   : scale(1.5); /* Safari and Chrome */
    -o-transform        : scale(1.5); /* Opera */
    transform           : scale(1.5);
}
.select_project:focus{
    outline             : none;
}
.select_project:hover{
    cursor              : pointer;
}
.allprojects_sort_div:hover{
    cursor              : pointer;
}
.character_div:hover{
    cursor              : pointer;
    color               : #3ebdb7;
}
.dropdown_items_div{
    padding-left        : 25px;
}
.dropdown_items_div:hover{
    cursor              : pointer;
    background-color    :rgba(194, 194, 194, 0.288);
}
.deleteproject_button{
    width: 150px;
    height: 40px;
    position: fixed;
    right: 30px;
    bottom: 80px;
}
.deleteproject_button.cancel{
    bottom: 30px;
}
.deleteproject_button:hover{
    cursor: pointer;
}
</style>
