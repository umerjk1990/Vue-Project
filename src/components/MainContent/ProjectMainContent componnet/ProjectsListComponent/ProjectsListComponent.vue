<template>
    <router-link :to="{ path: '/Projects/'+project.id }" tag="div" v-if="!edit_projectname" class="project_div">
        <div class="star_div" v-if="favorite" v-on:click.stop="favorite=false"></div>
        <div class="star_div unfavourite" v-else v-on:click.stop="favorite=true"></div>
        <div class="project_discription_div" @click="storeProjectCollaborators()">
            <div style="display: flex">
                <div class="project_name">{{project.name}}</div>
                <div class="lastupdate_div">Last Update: {{updateDate(project.updated_at)}}</div>
            </div>
        </div>
        <div class="user_wrapper_div" v-on:click.stop>
            <UserComponent  :users="project.collaborators"
                            :from_project_list="true">
            </UserComponent>
        </div>

        <MenuOptionsIcon    :option_list="option_list"
                            :width="225"
                            :topright_radius="0"
                            :three_dots="true"
                            @button-trigger="menuButtonTrigger">
        </MenuOptionsIcon>

        <PopupMenuOverlay v-if="delete_project" @cancel-clicked="cancelButtonClicked">
            <DeleteProject :name="project.name" :type="'Project'" @cancel-click="cancelButtonClicked"></DeleteProject>
        </PopupMenuOverlay>
    </router-link>

    <div v-else class="project_div">
        <EditNameComponent  style="padding-top: 10px; padding-left: 50px"
                            :name="project.name"
                            @confirm-click="confirmButtonClicked"
                            @cancel-click="cancelButtonClicked">
        </EditNameComponent>
    </div>
</template>

<script>
import MenuOptionsIcon from '../../../MenuComponent/MenuOptionsIcon'
import PopupMenuOverlay from '../../../CommonComponent/PopupMenu-Ovelay'
import DeleteProject from '../../../CommonComponent/DeleteComponent'
import EditNameComponent from '../../../CommonComponent/EditNameComponent'

import UserComponent from '../../../TopNavBarComponent/UserComponent'
import UsersStore from '../../../../store/UsersStore'
import vue_directives from '../../../../vue-directives'

import {projectService} from '../../../../dao/services'
export default {

    props: {
        project : {
            Type : Object,
        }
    },
    components : {
        UserComponent,
        MenuOptionsIcon,
        PopupMenuOverlay,
        DeleteProject,
        EditNameComponent
    },
    data(){
        return{
            //getting user from store
            users: UsersStore.data.users,

            project_option  : false,
            delete_project : false,
            edit_projectname: false,
            favorite        : false,
            option_list     : [
                {
                    icon    : require("../../../../assets/pencil-edit-button.svg"),
                    option  : 'Edit Name'
                },
                {
                    icon    : require("../../../../assets/users.svg"),
                    option  : 'Add User'
                },
                {
                    icon    : require("../../../../assets/delete.svg"),
                    option  : 'Delete Project'
                }
            ],
        }
    },


    methods:{

        /* setFocus: function(){

            return this.edit_projectname
        },  */
        confirmButtonClicked: function(name){
            console.log(name)
            this.edit_projectname = false
        },
        cancelButtonClicked: function(event){
            this.delete_project = false
            this.edit_projectname = false
        },
        menuButtonTrigger: function(event){

            if( event == 'Delete Project' )
                this.delete_project = true
            else if(event == 'Edit Name'){
                this.edit_projectname = true
            }
        },
        storeProjectCollaborators: function(){

            this.$store.dispatch('storeProjectCollaborators', this.project.collaborators)
        },
        updateDate: function(string_date){
            var date = new Date(string_date)
            var year = date.getUTCFullYear();
            var month = date.getUTCMonth() + 1;  // months start at zero
            var day = date.getUTCDate();
            date = day+'.'+month+'.'+year
            return date
        },
    }

}
</script>

<style scoped>
.project_div{
    height              : 55px;
    width               : 100%;
    border-radius       : 15px;
    border              : solid 1px #cecece;
    background-color    : #ffffff;
    display             : flex;
    margin-bottom       : 15px;
    text-align          : left;
    line-height         : 1.2;
}
.project_div:hover{
    background-color    : #f7f7f7;
    border              : solid 1px #b9b9b9;
}

.star_div{
    width               : 70px;
    height              : 100%;
    background-image    : url('../../../../assets/star_favourite.svg');
    background-repeat   : no-repeat;
    background-position : center;
    background-size     : 30px;
}
.star_div.unfavourite{
    background-image    : url('../../../../assets/star_unfavourite.svg');
}
.star_div:hover{
    cursor              : pointer;
    background-image    : url('../../../../assets/favourite onfocus star.svg');
}
.star_div.unfavourite:hover{
    background-image    : url('../../../../assets/onfocus star.svg');
}
.user_wrapper_div{
    padding-top: 15px;
}
.project_discription_div{
    width               : 80%;
    padding-top         : 8px;
    display             : flex;
    flex-direction      : column;
    justify-content     : space-between;
}
.project_discription_div:hover{
    cursor              : pointer;
}
.project_name{
    font-size           : 16px;
    font-weight         : bold;
    line-height         : 1.13;
    color               : #1b204e;
    margin-right        : 5%;
    width               : 30%;
    padding-top         : 10px;
}
.lastupdate_div{
    font-size           : 13px;
    font-weight         : normal;
    line-height         : 2.62;
    color               : #65768f;
}

.dropdown_div{
    width               : 225px;
    position            : relative;
    top                 : 15px;
    right               : 160px;
    border-radius       : 8px;
    background-image    : url('../../../../assets/three dot options focus.svg');
    background-repeat   : no-repeat;
    background-position : center;
    background-size     : 15px;
    background-position-x: 92%;
    background-position-y: 15px;
    box-shadow          : 0 2px 6px 0 rgba(0, 0, 0, 0.16);
    border              : solid 1px #cecece;
    background-color    : #ffffff;
}
.dropdown_wrapper{
    display             : flex;
    padding-left        : 25px;
    padding-top         : 10px;
    padding-bottom      : 5px;
}
.dropdown_wrapper:hover{
    background-color    : rgba(194, 194, 194, 0.288);
}
.option_image{
    width               : 15px;
    height              : 15px;
    margin-top          : 10px;
    padding-right       : 10px;
}
</style>
