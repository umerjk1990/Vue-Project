<template>
    <div>

        <div class="subheading_div">Name</div>
        <InputTextField :border_style="'2px solid rgb(214, 221, 232)'"
                        :border_radius="'8px'"
                        :display_text="'Model Name'"
                        @input-value="modelName">

        </InputTextField>
        <!-- <DropDownComponent  :dropdown="$store.getters.RetrieveModels"
                            @input="selectedModel">
        </DropDownComponent> -->

        <div class="subheading_div">Select Blueprint</div>
        <DropDownComponent  :dropdown="prop_blueprint_array"

                            :on_select_empty="true"
                            v-model='blueprint_array'>
        </DropDownComponent>
        <div class="blueprint_array_wrapper">
            <span v-if="error" style="color: red; font-size: 13px;">* select Blurprint</span>
            <div class="blueprint_array_div" v-for="bp in blueprint_array" v-if="bp != null">
                <span>{{bp.name}}</span>
                <div class="remove_div" v-on:click="removeBluePrint(bp)">remove</div>
            </div>
        </div>
        <ButtonComponent    style="margin-top:20px;"
                            :confirm="'Next'"
                            @cancel-click="cancelClick"
                            @confirm-click="confirmClick">
        </ButtonComponent>
    </div>
</template>

<script>
import InputTextField    from '../../../CommonComponent/InputTextFieldComponent'
import ButtonComponent   from '../../../CommonComponent/ButtonComponent'
import DropDownComponent from '../../../CommonComponent/DropDownComponent'

export default {
    components:{
        InputTextField,
        ButtonComponent,
        DropDownComponent,
    },
    props:{
        prop_blueprint_array: {
            type: Array
        }
    },
    data(){
        return{
            blueprint_array: [],
            model : null,
            error : false,
            model_name : ''
        }
    },
    methods: {
        removeBluePrint: function(obj){
            this.blueprint_array.splice(this.blueprint_array.indexOf(obj), 1)
        },
        cancelClick: function(){
            this.$store.commit('TOGGLE_TRAIN_MODEL')
        },
        confirmClick: function(){
            if(this.blueprint_array.length == 0)
                this.error = true
            else{
                this.$emit('popup-control', 2, this.blueprint_array)
                this.$emit('emit-model', this.model)
            }
        },
        modelName:function(name){
            this.model = name
            console.log("Model : ", this.model)
        }

    }

}
</script>

<style scoped>

.subheading_div{
    font-size: 13px;
    font-weight: 600;
    line-height: 1.85;
    margin-top: 10px;
}
.blueprint_array_div{
    font-size: 13px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
}
.blueprint_array_div:hover{
    background-color: #65768f39;
}
.remove_div:hover{
    cursor: pointer;
    text-decoration-line: underline;
}
</style>