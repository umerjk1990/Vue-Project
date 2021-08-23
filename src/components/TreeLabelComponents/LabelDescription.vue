<template>
    <div>
        <div class="label_wrapper" >
            <div class="color_wrapper_div" v-on:click="change_color = !change_color" :style="{ backgroundColor: label.color }">
                <div class="color_pallete_div" v-if="change_color">Choose Color:
                    <div class="color_pallete_wrapper">
                        <div class="color_div" v-for="(color, i) in colors" :key="i" :style="{ backgroundColor: color }" v-on:click="changeColor(color)"></div>
                    </div>
                </div>
                <div    class="triangle_div"
                        v-if="editable"
                        :style="{ borderTop : '13px solid ' + checkColor(label.color) }">
                </div>
            </div>
            <div style="width: 70%;">
                <input class="input_edit_name"
                    id='input_edit_name_id'
                    v-model="label.name"
                    :readonly="!edit_name"
                    v-on:keyup.enter="edit_name = !edit_name"
                    ref="input_ref"
                    @dblclick="edit_name = true, selectText('input_edit_name_id', edit_name)"
                    @blur="edit_name = false">
            </div>
            <div style="width: 30px; height: 30px;">
                <div class="icon_div" v-if="!editable"></div>
                <div class="icon_div edit" @click="edit_name = true" v-else-if="!edit_name"></div>
                <div class="icon_div save" @click="edit_name = false" v-else></div>
            </div>
        </div>

        <div class="explanation_div">Explanation
            <div style="width: 30px; height: 30px;">
                <div class="icon_div" v-if="!editable"></div>
                <div class="icon_div edit" v-on:click="edit_description = true" v-else-if="!edit_description"></div>
                <div class="icon_div save" v-on:click="edit_description = false" v-else></div>
            </div>
        </div>
        <span class='text_div text_area out_of_bounds_span' ref="out_of_bounds_span"></span>
        <textarea   class="text_div text_area"
                    id='text_div text_area_id'
                    v-model="label.description"
                    :readonly="!edit_description"
                    placeholder="Add description"
                    @dblclick="edit_description = true, selectText('text_div text_area_id', edit_description)"
                    v-on:input="textAreaInput"
                    ref="textarea_ref"
                    :style="{ height : (textarea_height == 0) ? '25px' : textarea_height + 'px'}">

        </textarea>

        <div class="tag_text_div">Tags: </div>
        <div class="tags_wrapper_div" v-for="(tag, j) in label.tags" :key="j">
            {{tag}}
            <div class="delete_tag_div" v-if="editable" v-on:click="deleteTag(tag)"></div>
            <div style="width: 20px; height: 100%;" v-else></div>
        </div>
        <div v-focus-ref-on-create:addtag_ref  v-if="addtag">
            <input class="tags_wrapper_div addtags" type="text" v-model="tag" ref="addtag_ref" v-on:keyup.enter="addTag()">
            <div  style="float: right; margin-right: 8px;" class="icon_div save" v-on:click="addTag()"></div>
        </div>
        <div v-else-if="!editable"></div>
        <div class="tags_wrapper_div addtags" v-on:click="addtag = !addtag" v-else>+ Add Tag</div>
    </div>
</template>

<script>
export default {
    props:{
        label: {
            type: Object
        },
        editable : {
            type: Boolean,
            default: true,
        }
    },
    data(){
        return{

            tag: '',
            addtag : false,

            colors : [
                "#010067" , "#d5ff00" , "#ff0056" , "#9e008e" ,
                "#0e4ca1" , "#ffe502" , "#005f39" , "#00ff00" ,
                "#95003a" , "#ff937e" , "#a42400" , "#001544" ,
                "#91d0cb" , "#620e00" , "#6b6882" , "#0000ff" ,
                "#007db5" , "#6a826c" , "#00ae7e" , "#c28c9f" ,
                "#be9970" , "#008f9c" , "#5fad4e" , "#ff0000" ,
                "#ff00f6" , "#ff029d" , "#683d3b" , "#ff74a3" ,
                "#968ae8" , "#98ff52" , "#a75740" , "#01fffe" ,
                "#ffeee8" , "#fe8900" , "#bdc6ff" , "#01d0ff" ,
                "#bb8800" , "#7544b1" , "#a5ffd2" , "#ffa6fe" ,
                "#774d00" , "#7a4782" , "#263400" , "#004754" ,
                "#43002c" , "#b500ff" , "#ffb167" , "#ffdb66" ,
                "#90fb92" , "#7e2dd2" , "#bdd393" , "#e56ffe" ,
                "#deff74" , "#00ff78" , "#009bff" , "#006401" ,
                "#0076ff" , "#85a900" , "#00b917" , "#788231" ,
                "#00ffc6" , "#ff6e41" , "#e85ebe"
            ],
            change_color: false,
            edit_name: false,
            edit_description: false,
            textarea_height: 0,

        }
    },
    watch:{
        label: function(){
            this.change_color = false
        },
        edit_name: function(){
            if(this.edit_name)
                this.$refs['input_ref'].focus()
        },
        edit_description: function(){
            if(this.edit_description)
                this.$refs['textarea_ref'].focus()
        },
    },
    computed:{
        returnDescription: function(){
            if(this.label.description)
                return this.label.description
            else
                return 'Add Description'
        }
    },
    mounted(){
        this.textarea_height = this.calcHeightOfTextAreaText(this.label.description)
    },
    methods:{
        selectText: function(id, bool){
            if(bool){

                let  a = document.getElementById(id)
                console.log('ID : ', a)
                a.select()
            }
        },
        checkColor: function(color){
            if(color == 'black')
                return 'white'
            else
                return 'black'
        },
        textAreaInput: function(e){
            let target = e.originalTarget
            this.textarea_height = this.calcHeightOfTextAreaText(target.value)
        },
        calcHeightOfTextAreaText: function(text){
            let out_of_bounds_span = this.$refs.out_of_bounds_span;
            if(!out_of_bounds_span) return;
            out_of_bounds_span.innerText = text;

            let bbox = out_of_bounds_span.getBoundingClientRect();
            return bbox.height
        },
        func: function(str){
            console.log('What : ', str)
            return str
        },
        dbClick: function(){
            console.log('dobcluic')
            this.edit_name = true
        },
        addTag: function(){//Add Code for adding tag in the specific label
            this.label.tags.push(this.tag)
            this.addtag = false
        },
        changeColor: function(color){
            this.label.color = color
        },
        deleteTag: function(tag){
            this.label.tags.splice(this.label.tags.indexOf(tag), 1)
        }
    }
}
</script>

<style>
.tags_wrapper_div{
    width: 85%;
    height: 40px;
    background-color: #1b204e;
    color:white;
    font-size: 13px;
    line-height: 40px;
    padding-left: 20px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}
.label_wrapper{
    width: 100%;
    height: 50px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.color_wrapper_div{
    width: 50px;
    height: 40px;
    position: relative;
    background-color: orange;
    position: relative;

}
.triangle_div{
    position: absolute;
    left: 60%;
    top: 60%;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
}
.color_wrapper_div.icon{
    background-image: url('../../assets/tri_whte_border.svg');
    background-repeat: no-repeat;
    background-size: 15px;
    background-position-x: 80%;
    background-position-y: 80%;
    cursor: pointer;
}
.color_pallete_div{
    background-color: rgb(237, 241, 245);
    width: max-content;
    height: max-content;
    padding: 5px;
    position: absolute;
    top: 42px;
    left: 2px;
    border: 1px solid #3ebdb7;
    font-size: 16px;
    cursor: auto;
}
.color_pallete_wrapper{
    width: 100%;
    height: 100%;
    display: grid;
    margin-top: 10px;
    grid-template-columns: auto auto auto auto auto auto ;
}

.color_div{
    width: 30px;
    height: 30px;
    margin: 2px;
    border: 1px solid #3ebdb7;
    cursor: pointer;
}
.l_name_div{
    display: flex;
    justify-content: center;
    font-size: 16px;
    margin-bottom: 14x;
    margin-left:5px;
    font-weight: normal;
}
.input_edit_name{
    font-size: 16px;
    background-color: transparent;
    border: 0px;
    width: 100%;
    text-align: center;
    padding-bottom: 10px;
    font-family: 'Open sans';
}
.icon_div{
    width: 30px;
    height: 30px;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: 20px;
    background-position-y: 50%;

}
.icon_div.edit{
    background-image: url('../../assets/edit_icon.svg');
}
.icon_div.save{
    background-image: url('../../assets/save_icon.svg');
}
.explanation_div{
    margin-top: 20px;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
}
.text_div{
    margin-top: 10px;
}
.text_div,
.text_area{
    width: 250px;
    /* min-height: 120px; */

    border: none;
    resize: none;
    font-weight: normal;
    font-size: 13px;
    font-family: 'Open Sans';
    line-height: 130%;
    overflow: hidden;
}
.tag_text_div{
    margin-top: 20px;
    font-size: 16px;
}
.out_of_bounds_span{
    position: fixed;
    top: 110%;
    left: 100%;
    height: auto!important;
    word-wrap:break-word;
    display:block;
}
.tags_wrapper_div.addtags{
    border: 1px solid #1b204e;
    color: #1b204e;
    background-color: white;
    cursor: pointer;
}
.delete_tag_div{
    width: 20px;
    height: 100%;
    background-image: url('../../assets/bin.svg');
    background-repeat: no-repeat;
    background-size: 20px;
    background-position-y: 50%;
    margin-right: 10px;
    cursor: pointer;
}
</style>