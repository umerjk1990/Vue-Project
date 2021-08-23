<template>
    <div style="width: 400px">
        <div class="main_heading_div">Train Model</div>
        <div class="light_small_text">Choose one or more facets you want train the model.</div>
        <TrainModelPopup1   v-if="popup_control == 1"
                            :prop_blueprint_array="temp_blueprint_array"
                            @popup-control="popupControl"
                            @emit-model="emitModel">
        </TrainModelPopup1>

        <TrainModelPopup2   v-if="popup_control == 2"
                            :blueprint_array="blueprint_array"
                            @popup-control="popupControl"
                            @popup-backtrack="popupBacktrack">
        </TrainModelPopup2>

        <TrainModelPopup3   v-if="popup_control == 3"
                            :blueprint_array="blueprint_array"
                            @popup-control="popupControl"
                            @popup-backtrack="popupBacktrack">
        </TrainModelPopup3>

        <TrainModelPopup4   v-if="popup_control == 4"
                            :blueprint_array="blueprint_array"
                            :model="model"
                            :description="description"
                            @popup-backtrack="popupBacktrack">
        </TrainModelPopup4>
    </div>
</template>

<script>
import TrainModelPopup1 from './TrainModelPopup1'
import TrainModelPopup2 from './TrainModelPopup2'
import TrainModelPopup3 from './TrainModelPopup3'
import TrainModelPopup4 from './TrainModelPopup4'
export default {
    components: {
        TrainModelPopup1,
        TrainModelPopup2,
        TrainModelPopup3,
        TrainModelPopup4,
    },
    data() {
        return{
            popup_control : 1,
            blueprint_array: [],
            description : '',
            model : null
        }
    },
    mounted(){
        this.$store.watch( () => this.$store.getters.RetrieveRouterAddress, router_address => {
            this.$store.commit('TOGGLE_TRAIN_MODEL_FALSE')
        })
    },
    computed: {
        temp_blueprint_array : function(){
            return this.$store.getters.RetrieveDataSet
        },
    },
    methods: {
        popupControl: function(n , data){
            this.popup_control = n
            if( n == 4 ){
                this.description = data
            }
            else
                this.blueprint_array = data
        },
        popupBacktrack: function(n){
            this.popup_control = n
        },
        emitModel: function(data){
            this.model = data
        }
    }
}
</script>

<style>
.main_heading_div{
  font-weight: bold;
  line-height: 1.35;

}
.light_small_text {
    font-size: 16px;
    color: #65768f;
    font-weight: normal;
}
</style>