<template>
    <div v-focus-ref-on-create:textfield_ref>
        <input  type="text" 
                ref='textfield_ref' 
                id=input_name 
                class="input_textbox"
                placeholder="Name"
                :value="name" 
                v-on:keyup.enter="confirmClick()">
        <ButtonComponent 
            @cancel-click="cancelClick()" 
            @confirm-click="confirmClick()">
        </ButtonComponent>
    </div>    
</template>

<script>
import ButtonComponent from '../CommonComponent/ButtonComponent'
export default {
    
    components: {
        ButtonComponent,
    },
    props:{
        name : { type : String, default : '' }
    },
    methods: {
        cancelClick: function(){
            this.$emit("cancel-click")
        },
        confirmClick: function(){
            this.$emit("confirm-click", this.$refs.textfield_ref.value)
        },
    }
    
}
</script>

<style scoped>
.input_textbox{
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.3px;
    color: #14253c;
    margin-top: 5px;
    background: transparent;
    border: transparent;
}
</style>