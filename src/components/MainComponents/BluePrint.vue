<template>
    <div class="template_blueprint_div" v-if="!editname_blueprint" v-on:click="moveToPage()">
        <div class="project_div">
            <div class="project_detail_div">
                <div class="projectname_div"> {{data_object.name}} </div>
                <div>Annotated Picture : {{data_object.pictures}} </div>
                <div style="margin-top: -15px;">Created : {{convertDate(data_object.created_at)}}</div>
            </div>
            <div class="project_option_div">
                <MenuOptionsIcon :option_list="option_list"
                                 :backgroundSize='15'
                                 :div_width='100'
                                 :top='-5'
                                 :right='-5'
                                 @button-trigger="menuButtonTrigger">
                </MenuOptionsIcon>
            </div>
        </div>
        <div class="progress_wrapper_div">
            <span style="color: #14253c">Completed : {{returnPercentageCompleted}}%</span>
            <div class="Progressbar_div">
                <div class="progressbar_completed_div" :style="{ width : percentage+'%',
                                                                 backgroundColor : isCompleted(percentage) ? '#56e156' : ''}"></div>
            </div>
        </div>
        <!-- Deleting Blueprint -->
        <PopupMenuOverlay v-if="delete_blueprint" @cancel-clicked="cancelButtonClicked">
            <DeleteBluePrint :name="data_object.name" :type="'BluePrint'" @cancel-clicked="cancelButtonClicked"></DeleteBluePrint>
        </PopupMenuOverlay>

    </div>

    <!-- Editing BlurPrint name -->
    <div class="template_div" v-else v-focus-ref-on-create:search_tb="editname_blueprint">
        <input  type="text"
                class="projectname_div input"
                :value="data_object.name"
                v-on:keyup.enter="editname_blueprint = !editname_blueprint"
                ref='search_tb'>
        <div class="button_wrapper">
            <div class="cancel_div" v-on:click="editname_blueprint = false">cancel</div>
            <div class="edit_div" v-on:click="editname_blueprint = !editname_blueprint">Edit</div>
        </div>
    </div>
</template>

<script>
import MenuOptionsIcon from '../MenuComponent/MenuOptionsIcon'
import PopupMenuOverlay from '../CommonComponent/PopupMenu-Ovelay'
import DeleteBluePrint from '../CommonComponent/DeleteComponent'

import vue_directives from '../../vue-directives'

export default {
    components:{
        MenuOptionsIcon,
        PopupMenuOverlay,
        DeleteBluePrint
    },
    props:{
        data_object : {
            type : Object,
        }
    },
    data (){
        return{
            delete_blueprint : false,
            editname_blueprint : false,
            open_menu: false,
            percentage : 0,

            option_list     : [
                {
                    icon    : require("../../assets/pencil-edit-button.svg"),
                    option  : 'Edit Name'
                },
                {
                    icon    : require("../../assets/Modell.svg"),
                    option  : 'Train Blueprint'
                },
                {
                    icon    : require("../../assets/archive.svg"),
                    option  : 'Archive'
                },
                {
                    icon    : require("../../assets/delete.svg"),
                    option  : 'Delete BluePrint'
                }
            ],
        }
    },
    mounted(){
        //Event listner active when click outside of this component
        window.addEventListener('click', (function(){
            this.open_menu = false
        }).bind(this));
    },
    computed: {
        returnPercentageCompleted: function(){

            this.percentage = (this.data_object.pictures_completed / this.data_object.pictures * 100).toFixed(2)
            return this.percentage
        }
    },
    methods: {
        moveToPage: function(){
            this.$emit('router-page', this.$route.path, this.data_object)
            //this.$router.push({ path : this.$route.path+'/Blueprint/'+ this.data_object.id })
        },
        cancelButtonClicked: function(event){
            this.delete_blueprint = event
        },
        menuButtonTrigger: function(event){
            console.log("Event : ", event)
            if( event == 'Delete BluePrint' )
                this.delete_blueprint = true
            else if( event == 'Edit Name')
            this.editname_blueprint = true
        },
        isCompleted: function(percentage){
            if(percentage == 100)
                return true
            else
                return false
        },
        convertDate: function(string_date){
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
.template_blueprint_div{
    /* Font Style */
    font-family         : Sans-serif;
    font-size           : 13px;
    font-weight         : normal;
    font-style          : normal;
    font-stretch        : normal;
    line-height         : 2.62;
    letter-spacing      : normal;
    text-align          : left;
    color               : #65768f;

    width               : 250px;
    height              : 120px;
    border-radius       : 20px;
    border              : solid 1px #cecece;
    background-color    : #ffffff;
    padding             : 20px;
    margin-right        : 10px;
    margin-top          : 20px;
    justify-content     : space-between;
    cursor              : pointer;
}
.projects_wrapper_div:hover{
    background-color    : #f7f7f7;
    border              : solid 1px #b9b9b9;
}
.project_div{
    display             : flex;
    justify-content     : space-between;
}
.projectname_div{
    font-weight         : bold;
    font-size           : 16px;
    line-height         : 1.38;
    color               : #14253c;
}
.projectname_div:hover{
    cursor              : pointer;
}
.project_option_div{
    position            : relative;
    width               : 20px;
    height              : 20px;
}
.project_option_div:hover{
    cursor              : pointer;
}
.progress_wrapper_div{}
.Progressbar_div{
    width               : 100%;
    height              : 10px;
    border-radius       : 7px;
    border              : solid 1px #d6dde8;
    background-color    : #d6dde8;
}
.progressbar_completed_div{
    height              : 100%;
    border-radius       : 7px;
    background-color    : #2c3266;
}
.projectname_div.input{
    background          : transparent;
    border              : transparent;
    color               : #14253c;
    font-size           : 18px;
}
.button_wrapper{
    display             : flex;
    float               : right;
    margin-right        : 15px;
    margin-top          : 50px;
}
.edit_div{
    width               : 80px;
    height              : 35px;
    border-radius       : 8px;
    color               : #ffffff;
    background-color    : #00b271ad;
    display             : flex;
    justify-content     : center;
    align-items         : center;
}
.cancel_div{
    width               : 80px;
    height              : 35px;
    border-radius       : 8px;
    display             : flex;
    justify-content     : center;
    align-items         : center;
}
.cancel_div:hover{
    cursor              : pointer;
}
.edit_div:hover{
    cursor              : pointer;
    background-color    : #00b270
}
</style>
