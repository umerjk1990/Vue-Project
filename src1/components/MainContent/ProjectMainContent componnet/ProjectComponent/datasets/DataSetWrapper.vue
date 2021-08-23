<template>
    <!-- In Edit form -->
    <div v-if="edit_dataset_name" class="dataset_edit_div" >
        <EditNameComponent  style="padding:  10px 50px 20px 23px;" 
                            :name="dataset.name"
                            @cancel-click="cancelButtonClicked"
                            @confirm-click="confirmButtonClicked">
        </EditNameComponent>
    </div>

    <!-- Is it in Adding New Prediction in Dataset -->
    <div class="dataset_wrapper" v-else-if="$store.state.add_prediction">
        <div class="ds_name_div"      > {{dataset.name}}       </div>
        <div class="ds_blueprint_div" > {{dataset.blueprint}}  </div>
        <div class="ds_prediction_div"> {{dataset.prediction}} </div>
        <div class="ds_category_div"  > {{dataset.category}}   </div>
        <div class="ds_updated_at_div"> {{getDate(dataset.updated_at)}} </div>
        <div class="ds_pictures_div"  > {{dataset.pictures}}   </div>
        <div class="ds_created_div"   > {{getDate(dataset.created_at)}} </div>

        <div style="width: 10%;"></div>
    </div>

    <router-link    v-else 
                    :to="{ path : $route.path + '/datasets/'+dataset.id }" 
                    tag="div" 
                    class="dataset_wrapper"
                    :style="{ borderBottomLeftRadius  : last_element ? '25px' : '0px', 
                              borderBottomRightRadius : last_element ? '25px' : '0px' }"
    >
        
            <div class="ds_name_div"      > {{dataset.name}}       </div>
            <div class="ds_blueprint_div" > {{dataset.blueprint}}  </div>
            <div class="ds_prediction_div"> {{dataset.prediction}} </div>
            <div class="ds_category_div"  > {{dataset.category}}   </div>
            <div class="ds_updated_at_div"> {{getDate(dataset.updated_at)}} </div>
            <div class="ds_pictures_div"  > {{dataset.pictures}}   </div>
            <div class="ds_created_div"   > {{getDate(dataset.created_at)}} </div>
            <MenuOption style="height: 20px;"
                        :option_list="option_list" 
                        :backgroundSize='20'
                        :right='15'
                        @button-trigger="menuButtonTrigger">
            </MenuOption>

            <PopupMenuOverlay v-if="delete_dataset || new_blueprint || new_prediction" @cancel-clicked="cancelButtonClicked">
                <DeleteDateset    v-if="delete_dataset" :name="dataset.name"         @cancel-click="cancelButtonClicked" :type="'Dataset'"></DeleteDateset>
                <AddNewBluePrint  v-if="new_blueprint"  :dataset_name="dataset.name" @cancel-clicked="cancelButtonClicked"></AddNewBluePrint>
                <AddNewPrediction v-if="new_prediction" :dataset_props="dataset"     @cancel-clicked="cancelButtonClicked"></AddNewPrediction>
            </PopupMenuOverlay>
    </router-link>    
</template>

<script>
import MenuOption       from '../../../../MenuComponent/MenuOptionsIcon'
import DeleteDateset    from '../../../../CommonComponent/DeleteComponent'
import PopupMenuOverlay from '../../../../CommonComponent/PopupMenu-Ovelay'
import AddNewBluePrint  from './AddNewBluePrint'
import AddNewPrediction from './AddNewPrediction'
import EditNameComponent from '../../../../CommonComponent/EditNameComponent'

export default {
    components:{
        MenuOption,
        PopupMenuOverlay,
        DeleteDateset,
        AddNewBluePrint,
        AddNewPrediction,
        EditNameComponent,
    },
    props:{
        dataset             : {type: Object},
        last_element        : {type: Boolean, default : false},
        checkbox_selection  : {type : Boolean, default : false}
    },
    data(){
        return{
            delete_dataset : false,
            edit_dataset_name: false,
            option_menu : false,
            new_blueprint : false,
            new_prediction : false,
            edit_name : false,

            option_list: [
                {
                    icon    : require("../../../../../assets/pencil-edit-button.svg"),
                    option  : 'Edit Name'
                },
                {
                    icon    : require("../../../../../assets/users.svg"),
                    option  : 'Duplicate'
                },
                {
                    icon    : require("../../../../../assets/delete.svg"),
                    option  : 'Move Dataset'
                },
                {
                    icon    : require("../../../../../assets/Fasit.svg"),
                    option  : 'New Blueprint'
                },
                {
                    icon    : require("../../../../../assets/dataset.svg"),
                    option  : 'New Prediction'
                },
                {
                    icon    : require("../../../../../assets/delete.svg"),
                    option  : 'Delete Dataset' 
                }
            ],
        }
    },
    computed:{
        lastElement(){
            console.log(this.last_elemnet)
            return this.last_elemnet
        }
    }, 
    methods:{
        confirmButtonClicked: function(name){

            console.log(name)
            
            this.edit_dataset_name = false
        },
        cancelButtonClicked: function(event){
            console.log("*******************")
            this.delete_dataset     = false
            this.new_prediction     = false
            this.edit_dataset_name  = false
            this.new_blueprint      = false
        },
        closeMenu: function(event){
            console.log("Closing : ", event,this.option_menu)
            this.option_menu = event
        },
        menuButtonTrigger: function(event){
            console.log(event)
            if( event == 'Delete Dataset' )
                this.delete_dataset = true
            else if(event == 'Edit Name'){
                this.edit_dataset_name = true
            }
            else if(event == 'New Blueprint'){
                this.new_blueprint = true
            }
            else if(event == 'New Prediction')
                this.new_prediction = true
        },
        getDate: function(string_date){
            var date = new Date(string_date)
            var year = date.getUTCFullYear();
            var month = date.getUTCMonth() + 1;  // months start at zero
            var day = date.getUTCDate();
            //console.log("Date : ",year, month, day)
            date = day+'.'+month+'.'+year
            return date
        },
        dataSet_CallBackFunction: function(dataset){
            console.log("Data Set Call back function Click : ", dataset)
        },
    }
}
</script>

<style scoped>
.dataset_edit_div{
    width: 100%; 
    background-color: white;
    
}
.dataset_wrapper{
    font-size: 16px;
    font-weight: 600;
    color: #14253c;
}
.ds_name_div{
    width           : 15%;
} 
.ds_blueprint_div{
    width           : 10%;
}
.ds_prediction_div{
    width           : 10%;
}
.ds_category_div{
    width           : 20%;
}
.ds_updated_at_div{
    width           : 15%;
}
.ds_pictures_div{
    width           : 5%;
    margin-right    : 5%;
    text-align      : right;
}
.ds_created_div{
    width           : 15%;
}
</style>