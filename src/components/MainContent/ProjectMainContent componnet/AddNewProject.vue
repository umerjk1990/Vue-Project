<template>
    <div>
        <div class="main_heading">Project</div>
        <div class="sub_heading_div">Give project a Name:</div>
        <InputTextFieldComponent :border_style="'2px solid #d6dde8'" 
                                 :border_radius="'8px'"
                                 :display_text="'Name'"
                                 style="margin-bottom: 15px;"
        >
        </InputTextFieldComponent>
        <ButtonComponent :confirm="'Create'" @cancel-click="cancelClicked"></ButtonComponent>
    </div>    
</template>

<script>
import InputTextFieldComponent from '../../CommonComponent/InputTextFieldComponent'
import ButtonComponent from '../../CommonComponent/ButtonComponent'
export default {
    components : {
        InputTextFieldComponent,
        ButtonComponent
    },
    methods:{
        cancelClicked: function(e){
            this.$emit("cancel-clicked")
        }
    }
}
</script>

<style scoped>
.main_heading{
    font-size: 20px;
    font-weight: bold;
    line-height: 1.35;
    color: #14253c;
    margin-bottom: 15px;
}
.sub_heading_div{
    font-size: 13px;
    font-weight: 600;
    line-height: 1.85;
    color: #14253c;
    margin-bottom: 5px;
}
</style>