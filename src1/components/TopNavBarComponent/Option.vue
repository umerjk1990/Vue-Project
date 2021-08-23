<template>
<div>
    <div id="setting_id" v-on:click="display_setting = !display_setting">
        <div class="setting_icon" v-if="!display_setting"></div>
        <div class="setting_icon open" v-else></div>
        <!-- <transition name="dropDown" > -->

            <div class="setting_detail_wrapper" v-if="(display_setting && !closeOption())">
                <div class="setting_detail_inner" v-for="(uo, index) in getOptionList" :key="index" v-on:click="optionCallBackFunction(uo.option)">
                    <div class="setting_detail_icon">
                        <img style="width: 18px;" :src=uo.icon>
                    </div>
                    <div class="options_name_div" >{{uo.option}}</div>
                </div>
            </div>
        <!-- </transition> -->
    </div>
    <PopupMenuOvelay v-if="returnStatus" @cancel-clicked="cancelButtonClicked">
        <AddNewProject    v-if="new_project"    @cancel-clicked="cancelButtonClicked"></AddNewProject>
        <AddNewDataset    v-if="new_dataset"    @cancel-clicked="cancelButtonClicked"></AddNewDataset>
        <AddNewBlueprint  v-if="new_blueprint"  @cancel-clicked="cancelButtonClicked"></AddNewBlueprint>
        <TrainModelPopup  v-if="$store.state.train_model"  @cancel-clicked="cancelButtonClicked"></TrainModelPopup>
    </PopupMenuOvelay>
</div>
</template>

<script>
    import UserOptionStore  from '../../store/UserOptionStore'
    import AddNewProject    from '../MainContent/ProjectMainContent componnet/AddNewProject'
    import PopupMenuOvelay  from '../CommonComponent/PopupMenu-Ovelay'
    import AddNewDataset    from '../MainContent/ProjectMainContent componnet/ProjectComponent/AddNewDataset'
    import AddNewBlueprint  from '../MainContent/ProjectMainContent componnet/ProjectComponent/datasets/AddNewBluePrint'
    import TrainModelPopup  from '../MainComponents/Models-SubComponent/TrainModelPopup/TrainModelPopupWrapper'

    export default {

        components : {
            AddNewProject,
            PopupMenuOvelay,
            AddNewDataset,
            AddNewBlueprint,
            TrainModelPopup,
        },
        data() {
            return {
                user_option: UserOptionStore.data.user_option,
                display_setting: false,
                new_project : false,
                new_dataset : false,
                new_model   : false,
                new_blueprint  : false,

                project_option : [
                    {
                        id : 9,
                        option : 'New Project',
                        icon  : require("../../assets/add_button_circle.svg")
                    },
                    {
                        id : 8,
                        option : 'Delete Project',
                        icon  : require("../../assets/delete.svg")
                    },
                ],
                dataset_option: [
                    {
                        id : 1,
                        option : 'Edit Name',
                        icon  : require("../../assets/pencil-edit-button.svg")
                    },
                    {
                        id : 7,
                        option : 'Delete Dataset',
                        icon  : require("../../assets/delete.svg")
                    },
                ],
                model_option: [
                    {
                        id : 1,
                        option : 'Edit Name',
                        icon  : require("../../assets/pencil-edit-button.svg")
                    },
                    {
                        id : 7,
                        option : 'Delete Model',
                        icon  : require("../../assets/delete.svg")
                    },
                ]
            }
        },
        mounted() {
            window.addEventListener('click', this.closeMenus);
            this.$store.watch( () => this.$store.getters.RetrieveRouterAddress, router_address => {
                this.display_setting = false
            })
        },
        computed: {

            returnStatus: function(){
                if( this.new_project ||
                    this.new_dataset ||
                    this.new_blueprint ||
                    this.$store.state.train_model )
                    return true
                else
                     return false
            },

            getOptionList: function(){
                var route = this.$route.path.split('/')

                //check in which Page we are in through link
                if(route[route.length-1] == 'Projects')
                    return this.project_option
                else if(route[route.length-2] == 'datasets')
                    return this.dataset_option
                else if(route[route.length-2] == 'models')
                    return this.model_option
                else
                    return this.user_option
            },
            optionMenu() {
                return this.$store.state.close_menu
            }
        },
        methods: {
            cancelButtonClicked: function(event){
                this.new_project    = false
                this.new_dataset    = false
                this.new_blueprint  = false
                if( this.$store.state.train_model )
                    this.$store.commit('TOGGLE_TRAIN_MODEL')
            },
            optionCallBackFunction: function(name){

                if(name == 'New Project')
                    this.new_project = true

                else if(name == 'Delete Project')
                    this.$store.commit('toggleDeleteProject')

                else if(name == 'Change Name')
                    this.$store.commit('toggleRenameProject')

                else if(name == 'New Dataset')
                    this.new_dataset = true

                else if(name == 'Delete Dataset')
                    this.$store.commit('toggleDeleteDataset')

                else if(name == 'New Model')
                    this.new_model = true

                else if(name == 'New Blueprint')
                    this.new_blueprint = true

                else if(name == 'New Prediction')
                    this.$store.commit('toggleAddPrediction')

                else if( name == 'Train Model' )
                    this.$store.commit('TOGGLE_TRAIN_MODEL')

            },
            closeOption: function () {
                if (this.display_setting && this.optionMenu)
                    this.display_setting = false
                return this.optionMenu
            },
            closeMenus: function (event) {
                if (document.getElementById('setting_id') == null){
                    this.display_setting = false
                    return
                }
                if (!document.getElementById('setting_id').contains(event.target))
                    this.display_setting = false
            }
        }
    }
</script>

<style scoped>

.setting_icon {
    width: 20px;
    height: 25px;
    background-image: url('../../assets/menu.svg');
    background-repeat: no-repeat;
    background-size: 20px;
    padding-right: 10px;
    margin-top: 16px;
    padding-bottom: 10px;
}
.setting_icon:hover {
    cursor: pointer;
}
.setting_icon.open {
    background-image: url('../../assets/menu open.svg');
}
.setting_detail_wrapper {
    overflow: hidden;
    z-index: -1;
    background-color: rgb(255 255 255);
    position: absolute;
    right: 10px;
    top: 85px;
    color: #14253c;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    padding-top: 16px;
    padding-bottom: 16px;
    box-shadow: inset 0 12px 9px -7px rgba(0, 0, 0, 0.16);
    border: 1px solid rgb(206 206 206);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
.setting_detail_inner {
    display: flex;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 7px;
    padding-bottom: 7px;
}
.setting_detail_inner:hover {
    cursor: pointer;
    background-color: rgba(194, 194, 194, 0.288);
}
.setting_detail_icon {
    width: 15px;
    height: 15px;
    padding-right: 8px;
}
.image_icon {
    width: 20px;
    height: 20px;
}
.options_name_div{
    width: 175px;
    margin-left: 10px;
}

/* Transition  */
@keyframes dd {
    0%{
        height: 0px;
    }
    100%{
        height: 100%;
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
</style>
