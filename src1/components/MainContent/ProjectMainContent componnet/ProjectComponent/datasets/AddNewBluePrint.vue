/* tommy Design */
<template>
    <div style="max-width:500px; color: #14253c;">
        <div class="heading_div" style="">Create Blueprint</div>
        <div class="heading_description_div">Select a Dataset you want to annotate</div>
        <div class="section_div">
            <div class="sub_heading_div">Select Dataset:</div>
            
            <!-- rename class -->
            <div class="date_text_section_div" v-if="dataset_name == ''"> 

                <DropDown :dropdown="$store.getters.RetrieveDataSet"
                          :default_message="'Select Dataset'"
                          @item-selected="itemSelectedDataset"
                          v-model='selected_dataset'
                          >
                </DropDown>
            
            </div>
            <div class="date_text_section_div" style="font-size: 16px" v-else> {{dataset_name}} </div>
        </div>

        <div class="section_div">
            <div class="sub_heading_div">Name the Blueprint</div>
            <InputTextFieldComponent :border_style="'solid 2px #d6dde8'" 
                                     :border_radius="'8px'"
                                     :display_text="'Blueprint Name'">
            </InputTextFieldComponent>
            <!-- <input class="blueprint_name_input" type="text"> -->
        </div>

        <div class="section_div">
            <div class="sub_heading_div">Blueprint Description</div>
            <textarea class="textarea_style" style="width: -moz-available;" name="" id="" cols="30" rows="10"></textarea>
        </div>

        <!-- Drop Down Section -->
        <div class="section_div">
            <div class="sub_heading_div">Select existing Model to start with: </div>

            <DropDown :dropdown="dropdown_model" 
                      :default_message="'Select Model'"
                      @item-selected="itemSelectedModel"
                      style="font-weight: normal; font-size: 13px;">
            </DropDown>      
                
        </div>

        <ButtonComponent :confirm="'Create'" @confirm-click="confirmClick" @cancel-click="cancelClick"></ButtonComponent>

    </div>
</template>

<script>
import DropDown                from '../../../../CommonComponent/DropDownComponent'
import InputTextFieldComponent from '../../../../CommonComponent/InputTextFieldComponent'
import ButtonComponent  from '../../../../CommonComponent/ButtonComponent'

export default {
    components:{
        DropDown,
        InputTextFieldComponent,
        ButtonComponent,
    },
    props:{
        dataset_name:{
            type: String,
            default : '',
        }
    },
    data(){
        return {
            //for Models
            dropdown_model :this.$store.getters.RetrieveModels,
            selectedmodel: '',
            selected_dataset: null,

            //for Datasets
        }
    },
    mounted(){
        this.selected_dropdown_model = this.dropdown_model[0].name
        console.log(this.dataset_name)
    },
    computed: {

    },
    methods:{
        cancelClick: function(event){
            console.log("******************")

            this.$emit('cancel-clicked')
        },
        confirmClick: function(event){

            console.log(event)
        },
        itemSelectedDataset: function(name){
            
            console.log(name)
        },
        itemSelectedModel: function(name){

            console.log(name)
        },
        selectedDropDown: function(item_name){
            this.selected_dropdown_model = item_name
        },
        confirmAddNewBluePrint: function(){

        },
        testing(){
            console.log("Testing Testing ... All tested : ", this.$store.getters.RetrieveModels)
        }
    }
}
</script>

<style scoped>
.heading_div{
    font-size           : 20px;
    font-weight         : bold;
    line-height         : 1.35;
    
}
.heading_description_div{
    font-size           : 16px;
    color               : #65768f;
    font-weight         : normal;
}
.section_div{
    margin-bottom       : 20px;
}
.sub_heading_div{
    margin-top          : 15px;
    font-size           : 13px;
    line-height         : 1.85;
}
.section_inner{
    display             : flex;
    align-items         : center;
}
.blueprint_name_input{
    height              : 30px;
    border-radius       : 8px;
    border              : solid 2px #d6dde8;
    width: 400px;
}

.date_text_section_div{
    font-weight         : normal;
    font-size           : 13px;
}
.textarea_style{
    font-size: 13px;
    color: #65768f;
}
</style>
