<template>
    <div class="dataset_div" v-if="getDataset">
        <div class="main_content_div">
            <div class="text_div">BluePrint</div>
            <div class="blueprint_wrapper">
                <div v-for="blueprint in $store.getters.RetrieveDataSet">
                    <BluePrint  v-if="blueprint.blueprint"
                                :data_object="blueprint"
                                @router-page="routerPage" >
                    </BluePrint>
                </div>
            </div>

            <div class="text_div">Prediction</div>

            <div class="prediction_wrapper">
                <div v-for="blueprint in $store.getters.RetrieveDataSet">
                    <BluePrint :data_object="blueprint" v-if="blueprint.blueprint"></BluePrint>
                </div>
            </div>
        </div>
        <RightBar>
            <div class="rightbar_wrapper">
                <div style="display: flex; cursor: pointer;" v-on:click=" information = !information">
                    <div class="text_bold big">Information</div>
                    <img v-if="information" src="../../assets/triangle-down-active.svg" class="image_icon">
                    <img v-else             src="../../assets/triangle-up-active.svg" class="image_icon">
                </div>
                <div v-if="information">

                    <div class="text_bold" style="margin-top: 24px">Created</div>
                    <div style="display: flex; margin-top: 12px" >
                        <div style="width: 100px">By</div>
                        <div>{{single_dataset.created_by_name}}</div>
                    </div>
                    <div style="display: flex; margin-top: 8px">
                        <div style="width: 100px;">Date</div>
                        <div>{{getDate(single_dataset.created_at)}}</div>
                    </div>
                    <div class="text_bold" style="margin-top: 24px">Description</div>
                    <div style="margin-top: 12px"> {{single_dataset.description}} </div>
                </div>
                <div class="text_bold big" style="margin-top: 24px"> Images({{single_dataset.pictures}}) </div>
                <div class="button_div" v-on:click="movePage()">Images</div>
                <div style="display: flex; margin-top: 32px; cursor: pointer;" v-on:click="metadata =!metadata">
                    <div class="text_bold big">Metadata</div>
                    <img v-if="metadata" src="../../assets/triangle-down-active.svg" class="image_icon">
                    <img v-else          src="../../assets/triangle-up-active.svg" class="image_icon">
                </div>

                <div v-if="metadata">
                    <div style="display: flex; margin-top: 12px">
                        <div style="width: 100px;">Date</div>
                        <div> {{}} </div>
                    </div>
                    <div style="display: flex; margin-top: 8px">
                        <div style="width: 100px;">Temperature</div>
                        <div> {{}} </div>
                    </div>
                </div>
            </div>
        </RightBar>
    </div>
</template>

<script>
import AddNewBluePrint  from '../MainContent/ProjectMainContent componnet/ProjectComponent/datasets/AddNewBluePrint'
import AddNewPrediction from '../MainContent/ProjectMainContent componnet/ProjectComponent/datasets/AddNewPrediction'
import BluePrint        from './BluePrint'
import RightBar         from '../CommonComponent/RightBar'

export default {
    components:{
        AddNewBluePrint,
        AddNewPrediction,
        BluePrint,
        RightBar
    },
    data(){
        return{
            dataset : [],
            single_dataset : null,
            information: true,
            metadata: true,
        }
    },
    mounted() {
        //Updating the path track in Vuex
            this.$store.dispatch('UpdateRouterAddress', this.$router.currentRoute.path)
    },
    computed:{
        getDataset: function(){
            this.dataset = this.$store.getters.RetrieveDataSet
            if(this.dataset.length == 0)
                return false
            else{
                var dataset_id = this.$route.params.dataset_id
                var dataset_list = this.$store.getters.RetrieveDataSet

                for (let index = 0; index < dataset_list.length-1 ; index++) {

                    if(dataset_list[index].id == dataset_id){
                        this.single_dataset = dataset_list[index]
                        return true
                    }
                }
            }
        }

    },
    methods: {
        routerPage: function(router_address, data_object) {
            this.$router.push({ path : router_address +'/Blueprint/'+ data_object.id })
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
        movePage: function(){
            this.$router.push({ path : this.$route.path + '/images' })
        }
    }
}
</script>

<style>
.dataset_div{
    display: flex;
    width: 100%;
    height: 100%;
}
.main_content_div{
    /* width: 75%; */
    height: 100%;
}
.description_div{
    background-color: white;
    width: 25%;
    padding: 30px;
    margin-top: -40px;
    margin-right: -50px;
    background-color: rgb(255 255 255);
    box-shadow : 0px 5px 10px 0px rgba(0, 0, 0, 0.16);
}
.blueprint_wrapper{
    display: flex;
    flex-wrap: wrap;
}
.prediction_wrapper{
    display: flex;
    flex-wrap: wrap;
}
.text_div{
    margin-top: 40px;
    color : #65768f;
    font-size: 13px;
    font-weight: bold;
}
.bold_text{
    font-size: 16px;
    font-weight: bold;
    color: #14253c;
}
.rightbar_wrapper{
    font-size: 13px;
    color: #14253c;
    font-weight: normal;
}
.text_bold{
    font-weight: bold;
}
.text_bold.big{
    font-size: 16px;
}
.button_div{
    margin-top: 24px;
    width: 70px;
    height: 36px;
    text-align: center;
    vertical-align: middle;
    font-weight: 600;
    line-height: 36px;
    border-radius: 8px;
    background-color: #00b270;
    color: #f1f1f1;
    cursor: pointer;
}
.image_icon{
    width: 10px;
    margin-left: 10px;

}
</style>