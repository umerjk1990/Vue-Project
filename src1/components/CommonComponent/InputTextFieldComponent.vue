<template>
    <div class="input_wrapper_div" :style="{ border : border_style }">
        <div class="search_icon" v-if="search_icon"></div>
        <input  type="text"
                ref='inputtext_ref'
                class="textbox"
                :placeholder="display_text"
                v-on:input="emitInput"
                :style="{  borderRadius : border_radius }"
        >
    </div>
</template>

<script>
    export default {
        props : {
            display_text  : { type : String  , default : ''    },
            search_icon   : { type : Boolean , default : false },
            border_style  : { type : String  , default : ''    },
            border_radius : { type : String  , default : ''    },
        },
        methods : {
            emitInput: function(){
                this.$emit('input-value', this.$refs['inputtext_ref'].value)
            }
        }
    }
</script>

<style scoped>
.input_wrapper_div{
    width               : 100%;
    height              : 40%;
    display             : flex;
    background-color    : rgb(255 255 255);
}
.search_icon{
    width               : 35px;
    height              : 35px;
    background-image    : url('../../assets/search.svg');
    background-repeat   : no-repeat;
    background-size     : 15px;
    background-position-x: 15px;
    background-position-y: 10px;
}
.search_icon:hover{
    cursor              : pointer;
}
.textbox{
    width               : 100%;
    background          : transparent;
    border              : transparent;
    color               : #65768f;
    font-size           : 18px;
    padding-left        : 15px;
    font-size           : 13px;
    font-weight         : normal;
}
.textbox:focus{
    outline             : none;
}
</style>