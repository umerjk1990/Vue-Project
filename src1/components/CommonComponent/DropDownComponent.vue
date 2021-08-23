/* DropDown component With Search Bar */

<template>
<div class="dropdown_template">
    <div class="input_div">
        <input type="text" ref="textbox" class="textbox_style"
                            :placeholder="default_message"
                            v-model='search_input'
                            @focus='onFocus'
                            @blur='onBlur'
                            @keydown.stop
                            @keydown.arrow-down='changeHoveredIndex(1)'
                            @keydown.arrow-up='changeHoveredIndex(-1)'
                            @keydown.esc='keyDownEsc'
                            @keydown.enter='keyDownEnter'
                            >
        <div class="dropdown_list_wrapper"
                 v-show="search_result_list.length && focused">
            <div class="dropdown_list_item"
                v-for="(search_res, index) in search_result_list"
                @mouseenter="hoverElement(index)"
                @mousedown.stop='selectedDropDown'
                :class="{hovered: index == hovered_index}"
            >
                <span v-for='(str, idx) in displayList(search_res)' :class='{highlighted: idx%2==1}'>{{str}}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
const fuzzysort = require('fuzzysort')

export default {
    props:{
        value: {
            type: [Array, Object],
        },
        dropdown:{
            type: Array,
            default: function () { return [] }
        },
        default_message : {
            type: String,
            default: ''
        },
        on_select_empty: {
            type: Boolean,
            default: false,
        },
        limit: {
            type: Number,
            default: 30,
        },
    },

    data(){
        return{
            search_input : '',
            focused: false,
            hovered_index: 0,
            last_selected: null,
        }
    },
    watch: {
        last_selected: function(){
            if(this.valueIsArray){
                if(this.last_selected != null && this.value.indexOf(this.last_selected) == -1){
                    let new_arr = this.value.slice(0)
                    new_arr.push(this.last_selected)
                    this.$emit('input', new_arr)
                }
            }else{
                this.$emit('input', this.last_selected)
                this.search_input = (this.last_selected && !this.on_select_empty) ? this.last_selected.name : ''
            }
        }
    },
    mounted() {
        console.log(this.dropdown)
    },
    computed:{
        valueIsArray: function(){
            return Array.isArray(this.value);
        },
        getData: function(){
            if(this.selected_dropdown == '')
                return this.default_message
            else
                return this.selected_dropdown
        },
        search_result_list: function(){
            this.hovered_index = 0
            var res = fuzzysort.go(this.search_input, this.dropdown, {
                key:'name',
                limit:this.limit,
            })

            if(!res.length)
                res = this.dropdown.slice(0,this.limit).map(function(o){
                        return {obj: o}
                    })

            if(this.valueIsArray)
                res = res.filter((function(o){
                    return this.value.indexOf(o.obj) == -1
                }).bind(this))

            return res;
        }
    },
    methods:{
        itemSelected: function(name){
            this.selected_dropdown = name
        },
        onFocus: function(){
            this.focused = true
        },
        onBlur: function(){
            //this.selectedDropDown();
            this.focused = false
            if(this.valueIsArray){
                this.search_input = ''
            }
        },
        hoverElement: function(index){
            this.hovered_index=index
        },
        //mouseDownElement: function(){
        //    if(this.focused == false) selectedDropDown()
        //},
        changeHoveredIndex: function(index){
            let new_index = this.hovered_index + index
            if(new_index >= this.search_result_list.length){
                new_index = 0
            }
            else if(new_index < 0){
                new_index = this.search_result_list.length -1;
            }
            this.hovered_index = new_index
        },
        selectedDropDown: function(){
            if(this.search_result_list.length == 0){
                this.last_selected = null
            }else{
                this.last_selected = this.search_result_list[this.hovered_index].obj
            }
        },
        keyDownEnter: function(){
            //this.$refs['textbox'].blur()
            this.selectedDropDown();
        },
        keyDownEsc: function(){
            this.$refs['textbox'].blur()
        },
        isInputEmpty: function(){

            var inp = this.$refs['textbox'].values
            if(inp == '')
                console.log("It sempty...")
            return true
        },
        displayList: function(res){
            var tmp = []

            if(res.indexes){
                for(var i=0; i<res.indexes.length; i++){
                    var start = res.indexes[i]
                    var len = 1;

                    while(i<res.indexes.length && res.indexes[i]+1 == res.indexes[i+1]){
                        i++;
                        len++;
                    }

                    tmp.push(start, start+len)
                }
            }

            tmp.push(res.obj.name.length)
            tmp.unshift(0)

            var subs = []
            for(var i=0; i<tmp.length-1; i++){
                var sub = res.obj.name.substr(tmp[i], tmp[i+1]-tmp[i])
                subs.push(sub)
            }

            return subs
        }
    }
}
</script>


<style scoped>
.dropdown_template{
    position: relative;

}
.dropdown_button_div{}
.input_div{}
.textbox_style{
    width: 95%;
    height: 25px;
    border: 2px solid rgb(214, 221, 232);
    border-radius: 8px;
    background: transparent;
    color: #65768f;
    font-size: 18px;
    padding-left: 5%;
    font-size: 13px;
    font-weight: normal;
    padding-top: 5px;

    background-image    : url('../../assets/arrow-down-populated.svg');
    background-size     : 15px;
    background-position-x: 95%;
    background-position-y: 50%;
    background-repeat   : no-repeat;
}
.dropdown_list_wrapper{
    position: absolute;
    border: 2px solid rgb(214, 221, 232);
    border-radius: 8px;
    background-color: white;
    width: 100%;
    margin-top: -3px;
}
.dropdown_list_item{
    padding-left: 15px;
    cursor: pointer;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 13px;
    font-weight: normal;

}
.dropdown_list_item.hovered{
    background-color: #9b9b9c78;
}
span.highlighted{
    font-weight: bold;
}

</style>