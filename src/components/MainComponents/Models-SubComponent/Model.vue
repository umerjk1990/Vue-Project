<template>
    <div class="model_template" v-if="checkData">
        <!-- left Section -->
        <div class="left_section" :style="{ width : leftbar_folding ? '100%' : '75%' }">

            <!-- Prediksjoner Section -->
            <div>
                <div class="div_wrapper">
                    <div class="heading_div">
                        <div class="icon_div"></div>
                        <div>Prediction</div>
                    </div>
                    <div class="add_button_div" > </div>
                </div>

                <div class="inner_div_wrapper">
                    <div v-for="prediction in $store.getters.RetrieveDataSet">
                        <BluePrint  v-if="prediction.prediction"
                                    :data_object="prediction"
                                    @router-page="predictionRouterPage">
                        </BluePrint>
                    </div>
                </div>

            </div>

            <!-- Prediksjoner med fasit Section -->
            <div>
                <div class="div_wrapper">
                    <div class="heading_div">
                        <div class="icon_div"></div>
                        <p>Prediction with Blueprint</p>
                    </div>
                </div>

                <div class="inner_div_wrapper">
                    <div v-for="prediction in $store.getters.RetrieveDataSet">
                        <BluePrint  v-if="prediction.prediction && prediction.blueprint"
                                    :data_object="prediction"
                                    @router-page="predictionWithBluePrintRouterPage">
                        </BluePrint>
                    </div>
                </div>
            </div>

            <!-- Basert på fasiter Section -->
            <div>
                <div class="div_wrapper">
                    <div class="heading_div">
                        <div class="icon_div"></div>
                        <p>Based on Blueprint</p>
                    </div>
                </div>
                <!-- Update later -->
                <!--  -->
                <div class="inner_div_wrapper">
                    <p style="text-align: center; width: 100%">Coming Soon...</p>
                </div>
            </div>

            <!-- Evaluering på fasiter Section -->
            <div style="margin-top: 80px; margin-bottom: 80px;">Evaluation on Blueprint
                <p style="text-align: center;">Coming Soon...</p>
            </div>
        </div>

        <!-- Right Section -->

        <RightBar >

            <div class="model_button_wrapper">
                <div class="button_div">Test Model</div>
                <div class="button_div train_new">Train New</div>
            </div>

            <div class="information_wrapper_div" v-on:click="information = !information">
                <div>Information</div>
                <div class="arrow_up"   v-if="information"></div>
                <div class="arrow_down" v-else></div>

            </div>
            <div class="information_wrapper" v-if="information">
                <div>Created</div>
                <div class="mini_information">
                    <div style="width: 100px;">by</div>
                    <div> {{model.created_by_name}} </div>
                </div>
                <div class="mini_information">
                    <div style="width: 100px;">Date</div>
                    <div> {{getDate(model.created_at)}} </div>
                </div>
                <div class="mini_information">
                    <div style="width: 100px;">Picture Used</div>
                    <div> {{model.pictures}} </div>
                </div>
                <div style="margin-top: 30px;">Description</div>
                <div class="mini_information">{{model.description}}</div>
            </div>

            <p style="font-size: 16px;">Old Version</p>
            <p style="font-weight : normal; font-size: 13px;">Se overskit over og velg mellom eldre versjoner av modellen</p>

            <div class="version_wrapper" v-for="eldreversjon in eldre_versjon_sortedList" v-if="model.name == eldreversjon.name">
                <Models_DatasetOlderVersion :eldre_versjon="eldreversjon" ></Models_DatasetOlderVersion>
            </div>
        </RightBar>

        <!-- train model popup section -->
        <PopupMenuOvelay v-if="train_model" @cancel-clicked="cancelClick">
            <TrainModelPopup1></TrainModelPopup1>
        </PopupMenuOvelay>
    </div>
</template>

<script>
import BluePrint            from '../BluePrint';
import Models_DatasetOlderVersion  from '../Models-SubComponent/Model_DatasetOlderVersion'
import OldModel             from '../../../store/OldModel'
import PopupMenuOvelay      from '../../CommonComponent/PopupMenu-Ovelay'
import TrainModelPopup1     from '../Models-SubComponent/TrainModelPopup/TrainModelPopup1'
import RightBar             from '../../CommonComponent/RightBar'

export default {

    components:{
        BluePrint,
        Models_DatasetOlderVersion,
        PopupMenuOvelay,
        TrainModelPopup1,
        RightBar
    },
    data(){
        return{
            information: true,
            model : null,
            leftbar_folding : true,
            older_version : true,
            version : 0,

            train_model : false,

            eldre_versjon_list : OldModel.data.oldModel
        }
    },

    mounted(){
        //Updating the path track in Vuex
        this.$store.dispatch('UpdateRouterAddress', this.$router.currentRoute.path)
    },
    computed:{

        eldre_versjon_sortedList: function(){
            //sorting the array of object on top that is new according to date
            return this.eldre_versjon_list.sort( function(a, b){ return b.version- a.version })
        },
        checkData: function(){

            //get Model list from Vuex
            var models = this.$store.getters.RetrieveModels
            //getting newmodel from link
            var newmodel_id = this.$route.params.model_id
            //getting old model id from link
            var oldmodel_id = this.$route.params.id

            //console.log("IDs  : ", newmodel_id, oldmodel_id)

            console.log("Model : ", this.model)

            //Check is the model from the new version
            if(oldmodel_id == undefined){

                for(var i=0; i<models.length; i++){
                    if(models[i].id == newmodel_id){
                        this.model = models[i]
                        console.log("Model : ", this.model)
                        this.older_version = false
                        //Updating the path track in Vuex
                        this.$store.dispatch('UpdateRouterAddress', this.$router.currentRoute.path)
                        return true
                    }
                }
            }

            //check id the model from the old version
            else if(oldmodel_id){

                for( var j=0 ; j < this.eldre_versjon_list.length ; j++){
                    if(this.eldre_versjon_list[j].id == oldmodel_id){
                        this.model = this.eldre_versjon_list[j]
                        console.log("Model : ", this.model)
                        this.older_version = true
                        //Updating the path track in Vuex
                        this.$store.dispatch('UpdateRouterAddress', this.$router.currentRoute.path)
                        return true
                    }
                }
            }
            //Model not found
            else{
                return false
            }

        },

    },
    methods:{
        predictionRouterPage: function(router_address, data_object) {
            this.$router.push({ path : router_address +'/Blueprint/'+ data_object.id })
        },
        predictionWithBluePrintRouterPage: function(router_address, data_object) {
            this.$router.push({ path : router_address +'/prediction/'+ data_object.id })
        },

        isHide: function(bool){
            console.log(bool)
            this.leftbar_folding = bool
        },
        cancelClick: function(bool){

            this.train_model = bool
        },
        getDate: function(string_date){

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
.model_template{
    display             : flex;
    font-size           : 20px;
}
.button_wrapper{
    margin-left         : 30px;
}
.div_wrapper{
    margin-top          : 30px;
    display             : flex;
    justify-content     : space-between;
}
.heading_div{
    display             : flex;
    align-items         : center;
}
.icon_div{
    width               : 40px;
    height              : 40px;
    margin-right        : 10px;
    background-image    : url('../../../assets/Prediction.svg');
    background-size     : 30px;
    background-repeat   : no-repeat;
}
.add_button_div{
    width               : 40px;
    height              : 40px;
    margin-right        : 10px;
    background-image    : url('../../../assets/add_button_circle.svg');
    background-size     : 30px;
    background-repeat   : no-repeat;
}
.add_button_div:hover{
    cursor              : pointer;
}
.inner_div_wrapper{
    display             : flex;
    flex-wrap           : wrap;
    margin-bottom       : 25px;
}
.rightbar_div{
    width               : 25%;
    padding             : 30px;
    margin-top          : -40px;
    margin-right        : -50px;
    background-color    : rgb(255 255 255);
    box-shadow : 0px 5px 10px 0px rgba(0, 0, 0, 0.16);
}
.folding_rightbar_button{
    width               : 25px;
    height              : 25px;

    background-repeat   : no-repeat;
    background-size     : 15px;
}
.folding_rightbar_button.open{
    background-image    : url('../../../assets/right-arrow-black.svg');
}
.folding_rightbar_button.close{
    margin-right        : -50px;
    background-image    : url('../../../assets/left-arrow-black.svg');
}
.folding_rightbar_button:hover{
    cursor              : pointer;
}
.version_wrapper{
    margin-bottom       : 10px;
    cursor              : pointer;
}
.model_button_wrapper{
    display: flex;
    font-weight: 600;
    font-size: 13px;
    color: white;
    justify-content: space-between;
}
.button_div{
    width: 100px;
    height: 36px;
    text-align: center;
    vertical-align: middle;
    line-height: 36px;
    cursor: pointer;
    margin-top: 0px;
    border-radius: 8px;
    background-color: #00b270;
}
.button_div.train_new{
    background-color: #14253c;
}
.information_wrapper{
    font-size: 13px;
    margin-top: 24px;
}
.mini_information{
    font-weight: normal;
    display: flex;
    margin-top: 12px;
}
.arrow_down{
    width: 10px;
    height: 10px;
    margin-top: 10px;
    margin-left: 20px;
    background-repeat: no-repeat;
    background-size: 10px;
    background-image: url('../../../assets/triangle-down-active.svg')
}
.arrow_up{
    width: 10px;
    height: 10px;
    margin-top: 10px;
    margin-left: 20px;
    background-image: url('../../../assets/triangle-up-active.svg');
    background-repeat: no-repeat;
    background-size: 10px;
}
.information_wrapper_div{
    margin-top: 30px;
    display: flex;
    cursor: pointer;
    font-size: 16px;
}
</style>
