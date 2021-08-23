<template>
    <div>
        <div class="subheading_div">Category</div>
        <div v-for="bp in blueprint_array" v-if="bp != null">
            <div class="bd_wrapper">
                <span> {{bp.category}} </span>
                <span class="remove_span">remove</span>
            </div>
        </div>
        <div class="see_tree_div">See the relationship tree for the categories</div>
        <ButtonComponent    style="margin-top : 24px;"
                            :confirm="'Next'"
                            :cancel="'Back'"
                            @cancel-click="cancelClick"
                            @confirm-click="confirmClick">
        </ButtonComponent>
    </div>
</template>

<script>
import ButtonComponent from '../../../CommonComponent/ButtonComponent'
export default {
    components:{
        ButtonComponent
    },
    props: {
        blueprint_array: {
            type: Array,
        }
    },
    mounted(){
        console.log(this.blueprint_array)
    },
    methods:{
        cancelClick: function(){
            this.$emit('popup-backtrack', 1)
        },
        confirmClick: function(){
            console.log("bfdjcfjak")
            this.$emit('popup-control', 3, this.blueprint_array)
        },
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
    margin-top: 24px;
}
.bd_wrapper{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    font-weight: normal;
    color: #14253c;
    margin-top: 10px;
}
.remove_span{
    font-weight: 600;
}
.remove_span:hover{
    cursor: pointer;
    text-decoration-line: underline
}
.see_tree_div{
    font-size: 13px;
    font-weight: normal;
    color: #65768f;
    text-decoration-line: underline;
    cursor: pointer;
    margin-top: 10px;
}
</style>