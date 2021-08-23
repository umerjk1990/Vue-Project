<template>
    <div class="table_wrapper">
        <div class="grid_layout" ref='grid_refs'>
            <div class='row header' :style='row_style'>
                <div v-if="check_box"></div>
                <div    class="row_header_inner"
                        v-for="(column_title, index) in columns_titles"
                        :style="rightBorder(index)"
                        v-on:click="emitTopRow( column_title, index )"
                        ref="row_header_ref"
                        @mouseenter="mouseEnterTitles(index)"
                        @mouseleave="mouseLeaveTitles(index)">
                    <img style="width: 20px" v-if="column_title.type == 'icon'" :src="column_title.title">
                    <span v-else> {{column_title.title}} </span>
                    <img ref="sorting_icon_ref" class="sorting_icon">
                </div>
            </div>
            <div class='row' v-for='(row, i) in rows' :style='row_style' ref="row_ref" @mouseenter="mouseEnter(i)" @mouseleave="mouseLeave(i)">
                <input type="checkbox" v-if="check_box" ref="checkbox_ref">
                <div v-for='(val, idx) in row' >
                    <div v-if='columns_components[idx]' :style='columns_value_style[idx]' style="padding: 15px;">
                        <component :is='columns_components[idx]'
                                   v-bind='val'>
                        </component>
                    </div>
                    <!-- <div v-else-if="columns_precomputes_icon[idx]" style="padding: 1px;">
                        <img class="div_image" :src="val">
                    </div> -->
                    <div v-else :style='columns_value_style[idx]' v-on:click="emitOnClick( i )"style="padding: 15px;">
                        <span > {{val}} </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        columns_array: { type: Array },
        data_array   : { type: Array },
        check_box    : { type: Boolean , default : false }
    },
    data(){
        return{
            title_selected : null,
            checkbox_selected: [],
        }
    },
    mounted(){

    },
    computed: {

        column_style: function(){
            var val = this.columns_array.length
            let str = ''
            for ( var i = 0; i < val; i++)
                str = str + ' 1fr'
            return str
        },
        columns_titles: function(){
            let array = []
            for(var i=0; i<this.columns_array.length; i++)
                array.push( {title : this.columns_array[i].title, type : this.columns_array[i].type, key : this.columns_array[i].key })
            return array
        },
        columns_keyes: function(){
            return this.columns_array.map(o => o.key)
        },
        columns_components: function(){
            return this.columns_array.map(o => o.component)
        },
        columns_precomputes: function(){
            return this.columns_array.map(o => o.precompute)
        },
        //columns_precomputes_icon: function(){
        //    return this.columns_array.map(o => o.precompute_icon)
        //},
        columns_value_style: function(){
            return this.columns_array.map(o => o.value_style)
        },
        rows: function(){
            return this.data_array.map((function(obj){
                let row = []
                for(var i=0; i<this.columns_keyes.length; i++){
                    let key = this.columns_keyes[i]

                    let val = obj[key]

                    if(this.columns_precomputes[i]){
                        val = this.columns_precomputes[i](val)
                    }
                    //if(this.columns_precomputes_icon[i]){
                    //    val = this.columns_precomputes_icon[i](val)
                    //}
                    row.push(val)
                }

                return row
           }).bind(this))
        },
        row_style: function(){

            let columns = this.columns_array.map(o => { return o.width ? o.width : "1fr"}).join(' ')
            if(this.check_box)
                columns = '20px ' + columns

            return {
                gridTemplateColumns: columns,
                backgroundColor: 'white'
            }
        },
        column_length: function(){
            return this.columns_array.length
        },

    },
    methods:{
        mouseEnterTitles: function(index){
            this.$refs['row_header_ref'][index].style.backgroundColor = '#a6a6a612'
        },
        mouseLeaveTitles: function(index){
            this.$refs['row_header_ref'][index].style.backgroundColor = ''
            if( this.title_selected )
                this.title_selected.style.backgroundColor =  '#a6a6a640'
        },
        mouseEnter: function(index){
            this.$refs['row_ref'][index].style.backgroundColor = '#a6a6a612'
        },
        mouseLeave: function(index){
            this.$refs['row_ref'][index].style.backgroundColor = ''
        },
        emitTopRow: function(title, index){
            //Emit to the parent for sorting with top row name
            //this.$emit('top-row-click', title)

            //changing the background of top row when click
            for(var i=0; i<this.$refs['row_header_ref'].length; i++)
                this.$refs['row_header_ref'][i].style.backgroundColor = 'white'
            this.title_selected = this.$refs['row_header_ref'][index]
            this.title_selected.style.backgroundColor = '#a6a6a640'

            //changing the arrow icon

            let top_title   = this.$refs['sorting_icon_ref'][index]
            let str         = 'http://localhost:8080'
            let arrow_up    = require("../../assets/arrow-up-active.svg")
            let arrow_down  = require("../../assets/arrow-down-active.svg")

            top_title.style.display = 'flex'

            if(top_title.src == str + arrow_up){
                top_title.src = arrow_down
                this.$emit('top-row-click', title, 'Accending')
            }
            else if(top_title.src == str + arrow_down){
                top_title.src = ""
                top_title.style.display = 'none'
                this.title_selected = null
                this.$emit('top-row-click', title, 'Normal')
            }
            else{
                top_title.src = arrow_up
                this.$emit('top-row-click', title, 'decending')
            }
        },
        emitOnClick: function(i){

            let data_obj = this.data_array[i]

            if(this.check_box){
                let checkbox_div = this.$refs['checkbox_ref'][i]
                checkbox_div.checked = !checkbox_div.checked
                if(checkbox_div.checked)
                    this.$emit('check-box-emit', data_obj, true)
                else
                    this.$emit('check-box-emit', data_obj, false)
            }
            else{
                this.$emit('row-click', data_obj)
            }
        },
        rightBorder: function(index){
            if(index != this.columns_array.length-1)
                return {'border-right' : '1px solid #d6dde8' }
        },
    }
    //We need watch later
    //
    //watch: {
    //    column_length: {
    //        immediate: true,
    //        handler: function(){
    //            if(this.column_length){
    //                let new_widths = []
    //                let rest_width = 1
    //                let other_cols_num = this.column_length;
    //
    //                for(var i=0; i<this.column_length; i++){
    //                    if(this.columns_array[i].width){
    //                        rest_width -= this.columns_array[i].width
    //                        other_cols_num -= 1;
    //                    }
    //                }
    //
    //                for(var i=0; i<this.column_length; i++){
    //
    //                    let width = ( Project this.columns_array[i].width) ?
    //                                this.columns_array[i].width   :
    //                                rest_width/other_cols_num ;
    //
    //                    new_widths.push(width)
    //
    //                this.column_widths = new_widths
    //                }
    //            }
    //        }
    //    },
    //},
    //data: function(){
    //    return {
    //        column_widths: null, Date
    //    }
    //},

}
</script>

<style scoped>
.div_image{
    width: 20px;
}
.row_selection{
    width: 20px;
    height: 20px;
    background-color: #14253c;
}
.table_wrapper{
    padding: 5px;
    width: 100%;
    font-size: 13px;
    background-color: white;
    border-radius: 16px;
}
.grid_layout{
}
.header{
}
.row_header_inner{
    font-weight: bold;
    color: #14253c;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.row{
    display: grid;
    border-top: 1px solid #d6dde8
}
.row:hover{
    cursor: pointer;
    background-color: #f7f7f7;
}
.row.header{
    border-top: 1px solid transparent
}
.row div{
}
.sorting_icon{
    width: 10px;
    height: 10px;
    display: none;
}
</style>