<template>
    <div style="width: 400px">
        <div class="main_heading_div">Train Model</div>
        <div class="light_small_text">Check that all information is correct.</div>

        <div class="subheading_div">Name</div>
        <div class="subheading_desc_div"> {{model}} </div>

        <div class="subheading_div">BluePrint</div>
        <div style="display: flex">
            <div class="subheading_desc_div" style="display: flex" v-for="bp in blueprint_array" v-if="bp != null">
                {{bp.name}},
            </div>
        </div>

        <div class="subheading_div">Categories</div>
        <div style="display: flex">
            <div class="subheading_desc_div" style="display: flex" v-for="bp in blueprint_array" v-if="bp != null">
                {{bp.category}},
            </div>
        </div>

        <div class="subheading_div">Propose</div>
        <div class="subheading_desc_div"> {{description}} </div>

        <ButtonComponent    style="margin-top: 24px;"
                            :confirm="'Train Model'"
                            :cancel="'Back'"
                            :confirm_button_width="'100px'"
                            @confirm-click="confirmClick"
                            @cancel-click="cancelClick">
        </ButtonComponent>
    </div>
</template>

<script>
import ButtonComponent from '../../../CommonComponent/ButtonComponent'
export default {
    components: {
        ButtonComponent,
    },
    props: {
        blueprint_array: {
            type: Array
        },
        model: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        }
    },
    data(){
        return{
        }
    },
    mounted() {

    },
    methods: {
        cancelClick: function() {
            this.$emit('popup-backtrack', 3)
            //this.$store.commit('TOGGLE_TRAIN_MODEL')
        },
        confirmClick: function(){

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
.subheading_div{
    font-size: 13px;
    font-weight: 600;
    line-height: 1.85;
    margin-top: 10px;
}
.subheading_desc_div{
    font-size: 13px;
    font-weight: normal;
    line-height: 1.85;
    color: #65768f;
}

</style>