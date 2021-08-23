<template>
    <div style="width: 400px">
        <div class="main_heading_div">Train Model</div>
        <div class="light_small_text">Describe the purpose of the model.</div>
        <div class="subheading_div">Describe</div>
        <textarea class="textarea_css" v-model="description" placeholder="What do you want the model to do, and what should others people know about it?"></textarea>
        <ButtonComponent    style="margin-top: 24px;"
                            :confirm="'Next'"
                            :cancel="'Back'"
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
        }
    },
    data(){
        return{
            description: ''
        }
    },
    mounted() {
        console.log(this.blueprint_array)

    },
    methods: {
        cancelClick: function() {
            this.$emit('popup-backtrack', 2)
            //this.$store.commit('TOGGLE_TRAIN_MODEL')
        },
        confirmClick: function(){
            this.$emit('popup-control', 4, this.description)
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
.textarea_css{
    width: 100%;
    height: 150px;
    font-size: 13px;
    color: #65768f;

}

</style>