<template>
    <div class="delete_project_div">
        <div>Are you sure you want to delete {{type}}: <span style="color: black">{{name}}</span></div>
        <ButtonComponent style="margin-top: 15px;" :confirm="'Delete'" @cancel-click="cancelClick"></ButtonComponent>
    </div>
</template>

<script>
import ButtonComponent from './ButtonComponent'
export default {
    components:{
        ButtonComponent
    },
    props:{
        name : { type : String },
        type : { type : String }
    },
    methods:{
        cancelClick: function(){
            this.$emit("cancel-click")
        }
    }
}
</script>

<style scoped>
.delete_project_div{
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.85;
    letter-spacing: normal;
    text-align: left;
}
</style>