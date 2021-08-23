<template>
<!-- Page/Section 1 -->
    <div>
        <div class="heading_div" v-on:click="funcTest()">Prediction "{{ project.name }}"</div>
        <div class="heading_description_div">choose a model you want to preach "{{ project.name }}" with</div>
        <div>  </div>
        <div class="sub_heading_div">Choose a model to Predict with:</div>
        <DropDownComponent class="margin-top: 15px" :dropdown="$store.getters.RetrieveModels"></DropDownComponent>
        <ButtonComponent style="margin-top: 15px" @cancel-click="cancelClick" :confirm="'Create'" @confirm-click="createClick"></ButtonComponent>  
    </div>
</template>

<script>
import DropDownComponent from '../../../../CommonComponent/DropDownComponent'
import ButtonComponent   from '../../../../CommonComponent/ButtonComponent'
export default {
    components : {
        DropDownComponent,
        ButtonComponent,
    },
    props:{
        dataset_props : { type : Object, default : null },
        dataset_array : { type : Array , default : function(){ [] } }
    },
    data(){
        return {
            dropdown : this.$store.getters.RetrieveModels,
            dataset  : null,
            dd : this.$store.getters.RetrieveSingleDataset,

            project : this.$store.getters.RetrieveSingleProject,

            getdataset: []
        }
    },
    mounted(){
        if( this.dataset_props ){
            this.dataset = this.dataset_props
        }
        else
            this.dataset = this.dd
    },
    methods:{
        createClick: function(e){},
        cancelClick: function(e){

            this.$emit('cancel-clicked')
        },
        funcTest: function(){
            console.log("Datatset : ", this.dd)
        }
    }
}
</script>

<style scoped>
.heading_div{
    font-size: 20px;
    font-weight: bold;
    line-height: 1.35;
}
.heading_description_div{
    font-size: 16px;
    color: #65768f;
    font-weight: normal;
}
.sub_heading_div{
    margin-top: 15px;
    font-size: 13px;
    line-height: 1.85;
}
.margin-top{
    margin-top: 15px
}
</style>
