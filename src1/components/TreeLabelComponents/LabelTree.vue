<template>
    <div class="labeltree_template_div">

        <div class="wrapper_node"
            @mouseenter="wrapperNodeMouseEnter"
            @mouseleave="wrapperNodeMouseLeave"
            ref="wrapper_node_ref"
            :style="{   opacity : (highligted && mouseDraggingRestriction) ? '0.5' : '1',
                        border : border_style }">

            <div class="node_name_div"  :style="styleNodeDiv"
                                        @mousedown.stop="mouseDown"
                                        @mouseup.stop="mouseUp"
                                        @mouseenter="mouseEnter"
                                        @mouseleave="mouseLeave"
                                        @click.stop='top_temp = 0'>
                <div class="label_detail_div" :style='style || shrinkStyle' ref="label_detail_div_ref">
                    <div class="label_color_div" :style="{ backgroundColor : label.color }"></div>
                    <div class="label_name_div">{{labelName}}</div>
                </div>
            </div>

            <div class="fold_childs_div"
                v-if="label.child.length > 1 && label.showchild && fold_child_icon"
                v-on:click="showChild()"
                :style="shrinkStyle">
            </div>
        </div>
        <transition-group name="flip-list" tag="div" v-if='label.showchild'>
            <div v-for="(l,i) in sorted_children" :key="i">

                <node  :key="componentkey"
                    @on-dragged="onDragged"
                    @Mouse-On-Label="mouseOnLabel"
                    @drop-on-label="dropOnLabel"
                    @label-border="labelBorder"
                    @height-change="height"
                    @opened="openAndShowChildren"
                    @right-bar='rightBar'
                    :label_after_dragging="label_after_dragging"
                    :moving_box_props="moving_box_props"
                    :parent_label="that"
                    :label="l"
                    :potential_parent="potential_parent"
                    :label_select="label_select"
                    :row_shrink="row_shrink"
                    :depth="label_depth"
                    :mouseDraggingRestriction="mouseDraggingRestriction"
                    >
                </node>
            </div>
        </transition-group>

        <div    v-else
                class="showchild_div"
                style='display: flex'
                v-for='(lc, index) in color_lists'
                :key='index'>
            <div class="folded_number_child" :style="styleFoldedchild(index+1)"
                                            @click.stop='openAndShowChildren(index)'
                                            @mousedown="mouseDownfolded(index)"
                                            @mouseup="mouseUpFolded(index)"
                                            @mouseenter="mouseEnterFolded(index)"
                                            @mouseleave="mouseLeaveFolded(index)">
                <div class="color_colective_div" v-if="lc.length > 1">
                    <div v-for="(c,j) in lc.slice(0, 9)"
                        style="margin: 0.5px"
                        :style="{ backgroundColor : c}"
                        :key="j">

                    </div>
                </div>
                <div v-else class="label_color_div" :style='{ backgroundColor : lc }'></div>
                <div class="label_name_div">
                    {{returnNameList(index)}}
                </div>
            </div>
        </div>

        <div class="label_description_div" v-if="display_discription">
            <LabelDescription :label="label" :editable="false"></LabelDescription>
        </div>

    </div>
</template>

<script>
import LabelDescription from '../TreeLabelComponents/LabelDescription'
import { ReplaceObjectInArrayAction } from './actions/ArrayAction'
var {MouseHandler} = require('./js/Mousehandler.js')

export default {
    name: "node",
    components:{
        LabelDescription,
    },
    props:{
        label : {
            type : Object
        },
        row_shrink : {
            type : Array
        },
        potential_parent: {
            type: Object,
            default: null,
        },
        depth : {
            type: Number
        },
        parent_label : {
            type: Object,
            default: null
        },
        unselect: {
            type : Boolean,
            default : true,
        },
        label_select : {
            type : Array,
            default: function (){ return  [] }
        },
        moving_box_props : {
            type : Object,
            default: null
        },
        label_depth_click: {
            type: Number,
            default: -1
        },
        label_after_dragging: {
            type : Object,
            default: null,
        },
        mouseDraggingRestriction:{
            type: Boolean,
            default: false,
        },

    },
    data() {
        return{
            //showchild : true,
            label_depth : -1,
            moving_box: null,
            parentlabel: null,
            that: this,
            folded_child : [],
            fold_child_icon: false,
            label_prop: null,
            folded_labelClick: null,
            folded_label_list : [],
            folded_label_color_list: [],
            componentkey: Math.random(),
            hoverTimeout: null,
            display_discription: false,
            option: false,
            top: 0,
            top_temp : 0,
            //variables for setting top for label
            wrapped_node: null,
            cached_height: 0,
        }
    },
    watch:{
        childArray: function(){
            this.height();
            if(this.label.depth == -1){
                this.label.depth = this.depth +1
            }
        },
        showChildBoolean: function(){

            this.height();

            //this.top = this.height/2 -25;
        },
        cached_height: function(){
            this.$emit('height-change');
        },
        depth: function(){
            this.label.depth = this.depth + 1
            this.label_depth = this.label_depth_click
        },
    },
    created(){
        this.label.depth = this.depth + 1
        this.label_depth = this.label.depth

    },
    mounted: function() {
        //initialize label as a parentlabel_border
        //to send as pros to te child
        this.parentlabel = this.label
        this.wrapped_node = this.$refs['wrapper_node_ref'];

        this.height();
        if(!this.label.showchild){

            this.folded_label_list = this.getLabelAndChildren(this.label)
        }
    },
    methods: {

        rightBar: function(bool){
            this.$emit('right-bar', bool)
        },

        redefineChildDepth: function( child_array , depth ){
            for (let i = 0; i < child_array.length; i++) {
                child_array[i].depth = depth +1
            }
        },

        openAndShowChildren: function(i){

            //getting labels which are folded
            let a = this.returnLabelObjectByDepth(i)

            let array = []

            //getting all Parent
            a.map( o => {
                array = array.concat(this.getLabelParents(this.label.child, o))
                this.openChild(o)
            })

            //Removing the duplication
            array = array.filter((item, pos) => array.indexOf(item) === pos)

            this.label.showchild = true
            array.map(o=> o.showchild = true )
        },
        openChild: function(label){

            if(label.child.length == 1){
                label.showchild = true
                let child = label.child[0]
                this.openChild(child)
            }
        },
        returnColorList: function(i){
            let color = this.folded_label_list.map( o => {
                                            if( i + this.label.depth + 1 == o.depth )
                                                return o.color
                                            }).filter( c=>c )
            return color
        },
        returnNameList: function(i){
            let name = this.folded_label_list.map( o => {
                                            if( i + this.label.depth + 1 == o.depth )
                                                return o.name
                                            }).filter( c=>c )
            if(name.length > 1)
                return this.row_shrink[this.label_depth+i+1] ? '' : name.length + ' Category'
            else
                return this.row_shrink[this.label_depth+i+1] ? name[0].charAt(0) : name[0]
        },
        returnLabelObjectByDepth: function(i){
            return this.folded_label_list.map( o => {
                                            if(i+this.label.depth+1 == o.depth)
                                                return o
                                            }).filter( c=>c )
        },
        getLabelAndChildren: function(label){
			let array = [label];
			let children = label.child.map(l => this.getLabelAndChildren(l));
			return array.concat(children).flat();
        },
        getLabelParents: function(subtree, label){
			for(let i=0; i<subtree.length; i++){
				let child = subtree[i];

				if(child.child.includes(label)){
					return [child]
				}

				let rec_ret = this.getLabelParents(child.child, label);
				if(rec_ret.length > 0){
					return [child].concat(rec_ret);
				}
			}
			return [];
		},
        menuButtonTrigger: function(trigger){

        },
        wrapperNodeMouseEnter: function(){
            this.top  = parseInt(this.$refs['label_detail_div_ref'].style.top, 10)

            if(this.childArray.length > 1)
                this.fold_child_icon = true
            if((this.top+100 > this.height())
                && (this.label.child.length > 1)
                && (this.label.showchild)
                && (this.top != 0)){

                    this.top_temp = this.top
                    this.top -= 35
                    if(this.top == -10)  this.top = 15
            }
            if((this.height() == 100) && ( this.top != 0) && this.fold_child_icon)
                this.$refs['label_detail_div_ref'].style.top = '15px'
        },
        wrapperNodeMouseLeave: function(){

            this.fold_child_icon = false

            if((this.top_temp > this.top)
                && (this.label.child.length > 1)
                && (this.label.showchild)
                && (this.top != 0)){

                    this.top = this.top_temp
            }
            if((this.height() == 100) && ( this.top != 0))
                this.$refs['label_detail_div_ref'].style.top = this.top+'px'
        },

        foldedLabelClick: function(l, i){
            if(l.label.length)
                this.label.showchild = !this.label.showchild
        },
        styleFoldedchild: function(i){
            return {
                width : this.row_shrink[this.label_depth+i] ? 50+'px' : 150 + 'px'
            }
        },
        foldedName: function(label_array){
            return label_array.length == 1 ? label_array[0].name + '(F)' : label_array.length + ' Category'
        },
        getHeightUnits: function(subtree){
            if(subtree.length == 0 || this.label.showchild == false) return 1;
            else{
                return subtree
                    .map(l => l.showchild ? this.getHeightUnits(l.child) : 1)
                    .flat()
                    .reduce((total, num) => total + num);
            }
        },
        labelBorder: function(label, sender, prev_units){
            let index = this.sorted_children.indexOf(sender);
            let units = (index == 0) ?
                            0 :
                            this.getHeightUnits(this.sorted_children.slice(0, index));

            units += prev_units;

            this.top = units*50;
            this.$emit('label-border', label, this.label, units);
        },
        removeBorder: function(){
            this.wrapped_node.style.border = ''
        },
        showChild: function(){
            var array = []
            this.label.showchild   = false
            this.folded_label_list = this.getLabelAndChildren(this.label)
            this.folded_label_list
                    .map(o=>{
                        (o.child.length < 2) ? o.showchild = true : o.showchild = false
                    })
            this.$emit('label-border', this.label, this.label, this.top)
        },

        mouseOnLabel: function( label ){
            this.$emit('Mouse-On-Label', label)
        },
        mouseEnter: function(){
            this.$emit('Mouse-On-Label', this.label)
            this.hoverTimeout = setTimeout(() => {

                this.display_discription = true
                this.hoverTimeout = null;
            }, 1000);
        },
        mouseLeave: function(){
            this.$emit('Mouse-On-Label', null)

            clearTimeout(this.hoverTimeout);
            this.display_discription = false
            this.hoverTimeout = null;
        },
        mouseLeaveFolded: function(){
            this.$emit('Mouse-On-Label', null)
        },
        dropOnLabel: function(label){
            this.$emit("drop-on-label", label)
        },
        mouseUp: function(){

            this.$emit("drop-on-label", this.label)
            this.$emit('right-bar', false)
        },
        mouseDown: function(e){

            this.top_temp = 0

            let units = this.getHeightUnits(this.label.child);

            units /= 2;
            units -= 0.5;

            this.top = units*50

            this.$emit('label-border', this.label, this.label, units)

            this.moving_box = {
                label : this.label,
                x : 0,
                y : 0,
            },
            this.$emit("on-dragged", this.moving_box)
        },
        mouseUpFolded: function(i, e){
            let list = this.folded_label_list.map( o => {
                                            if( i + this.label.depth + 1 == o.depth )
                                                return o
                                            }).filter( c=>c )
            if( list.length == 1)
                this.$emit("drop-on-label", list[0])
        },
        mouseEnterFolded:function(i, e){
            let list = this.folded_label_list.map( o => {
                                            if( i + this.label.depth + 1 == o.depth )
                                                return o
                                            }).filter( c=>c )
            if( list.length == 1)
                this.$emit('Mouse-On-Label', list[0])
        },
        mouseDownfolded: function(i, e){
            let list = this.folded_label_list.map( o => {
                                            if( i + this.label.depth + 1 == o.depth )
                                                return o
                                           }).filter( c=>c )

            //Want to enable dragging on folded label
            //uncommit this code

            //if(list.length == 1){
            //    this.moving_box = {
            //        label : list[0],
            //        x : 0,
            //        y : 0,
            //    }
            //    this.$emit("on-dragged", this.moving_box)
            //}
        },
        onDragged: function( moving_box){
            if( moving_box )
                this.$emit("on-dragged", moving_box)
        },
        styleFoldedNodeDiv: function(index){
            return {
                width: ( this.row_shrink[this.label_depth + index] ) ?
                    50 + 'px' : 150 + 'px'
            }
        },
        recursive_count(l){
            return 1 + l.child.map(l_ => this.recursive_count(l_)).reduce((t,n) => t+n, 0)
        },
        searchLabel: function(label, matchingLabel){
            if(label.id == matchingLabel.id){
                return true
            }
            else if( label.child.length != 0 ){
                var result = false
                for(var i=0; i<label.child.length; i++){
                    result = this.searchLabel(label.child[i], matchingLabel)
                    if( result )
                        return result
                }
                return result
            }
            return false
        },
        labelNameFolded: function(name, i){

            if(this.row_shrink[this.label_depth + i + 1])
                return name[0]
            else
                return name
        },
        is_children_selected_rec: function(children, selected_arr){
            if(children.filter(c => selected_arr.includes(c)).length)
                return true;
            if(children.filter(c => this.is_children_selected_rec(c.child, selected_arr)).length)
                return true;
            return false;
        },
        height: function(){
            this.cached_height = this.label.showchild ? this.getHeightUnits(this.label.child)*50 : 50;
            return this.cached_height;
        },
        childMaxDepth: function(){

            return this.getLabelAndChildren(this.label)
                          .map(o=>{
                              return o.depth})
                          .reduce(function(a, b) {
                                    return Math.max(a, b);
                                });
        },
    },
    computed: {
        returnFoldingDepth: function(){

            let l = this.childMaxDepth() - this.label.depth
            return l
        },
        color_lists: function(){
            let l = this.childMaxDepth() - this.label.depth
            if(l < 1 ){
                this.redefineChildDepth(this.label.child, this.label.depth)
                this.getLabelAndChildren(this.label)
                l = this.childMaxDepth() - this.label.depth
            }

            let lists = [];

            this.folded_label_list = this.getLabelAndChildren(this.label)

            for(let i=0; i< l; i++){
                let color_list = this.folded_label_list.map( o => {

                                            if( i + this.label.depth + 1 == o.depth )
                                                return o.color
                                            }).filter( c=>c );
                lists.push(color_list);
            }

            //filter becuase remove the empty array inside the array
            return lists.filter( a => a.length > 0);
        },
        showChildBoolean: function(){
            return this.label.showchild
        },
        height_watch_trigger: function(){
            return this.label.showchild
        },
        border_style: function(){
            if(this.is_selected){
                return '2px solid red'
            }
            else if(this.potential_parent == this.label){
                return "2px solid black"
            }
            else{
                this.top_temp = 0
                return "";
            }
        },
        is_children_selected(){
            return this.is_selected || this.is_children_selected_rec(this.label.child, this.label_select);
        },
        is_selected: function(){
            return this.label_select.includes(this.label)
        },
        highligted: function(){
            if(this.moving_box_props){
                let drag_label = this.moving_box_props.label.label
                if(drag_label && drag_label.id == this.label.id)
                    return true
                else
                    return false
            }
            return false
        },
        parents: function(){
            var parent = this.parent_label
            var parents = []
            while(parent){
                parents.push(parent.label.id)
                parent = parent.parent_label
            }
            return parents
        },
        childArray: function(){
            return this.label.child
        },
        styleNodeDiv: function(){
           if(this.label.child.length == 1){
                return {
                    height : '100%',
                    width: this.row_shrink[this.label_depth] ? 50+'px' : 150 + 'px'
                }
            }
            else{

                return {
                    height : (!this.hasChild || !this.label.showchild )  ? '35px' : '',
                    width: this.row_shrink[this.label_depth] ? 50+'px' : 150 + 'px'
                }
            }
        },
        hasChild: function(){
            if(this.childArray.length > 1 )
                return true
            else
                return false
        },
        shrink: function(){
            return this.row_shrink[this.label_depth]
        },
        labelName: function(){
            if(this.shrink)
                return this.label.name[0]
            else
                return this.label.name
        },
        sorted_children: function(){
            return this.childArray.slice(0).sort((a, b) =>
                this.recursive_count(b) - this.recursive_count(a)
            )
        },
        style: function(){
            //console.log('Shrink : ', this.label.name ,this.shrink ? '50px' : '150px')
            return {
                top: this.is_children_selected  ? this.top+'px' : ((this.cached_height / 2) - 50/2)+'px',
                width: ( this.shrink ) ? 50 + 'px' : 150 + 'px'
            }

            ///*important*/
            //top: this.is_children_selected || this.label.showchild ? this.top+'px' : ((this.cached_height / 2) - 50/2)+'px',

        },
        shrinkStyle: function(){


            return {
                width: ( this.shrink ) ?
                        50 + 'px' : 150 + 'px'
            }
        }
    }
}
</script>

<style>
.labeltree_template_div{
    display: flex;
    margin-left: 10px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
}
.folded_number_child{
    width: 150px;
    height: 35px;
    background-color: #c3b9d4;
    margin-left: 10px;
    display: flex;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    line-height: 35px;
    border: 2px solid transparent;
}
.color_colective_div{
    width: 35px;
    height: 35px;
    background-color: transparent;
    display: grid;
    grid-template-rows: repeat(3,minmax(1px, 35px));
    grid-gap: 0px;
    grid-auto-flow: column;
    margin-right: 15px;
}
.show_child_arrow_div{
    width: 20px;
    height: 20px;
    margin-top: 15px;
    background-image: url('../../assets/labelTree/triangle-down-active.svg');
    background-repeat: no-repeat;
    background-size: 15px;
}
.wrapper_node{
    background-color: #c3b9d4;;
    margin-bottom: 11px;
    border: 2px solid transparent;
}
.node_name_div{
    line-height: 35px;
    height: calc(100% - 35px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}
.label_detail_div{
    height: 35px;
    display: flex;
    top: 0px;
    width: 100%;
    position: absolute;/*
    transition: top 0.2s ease-out; */
}
.label_color_div{
    width: 10px;
    height: 100%;
    background-color: #1b204e;
}
.label_name_div{
    font-size: 13px;
    font-weight: 500;
    user-select: none;
    padding-left: 10px;
}
.fold_childs_div{
    width: 150px;
    height: 35px;
    float: inline-end;
    cursor: pointer;
    background-image: url('../../assets/labelTree/triangle-down-populated.svg');
    background-repeat: no-repeat;
    background-size: 15px;
    background-position-x: 50%;
    background-position-y: 50%;
}
.fold_childs_div:hover{
    background-image: url('../../assets/labelTree/triangle-down-active.svg');
    background-color: rgba(121, 120, 120, 0.639);
}
.flip-list-move {/*
  transition-delay: 0.3s;
  transition: transform 0.3s ; */
}
.label_description_div{
    width: 250px;
    position: absolute;
    left: 150px;
    top: 50%;
    background-color: white;
    padding: 10px 0px 10px 15px;
    border: 1px solid black;
    z-index: 4;
}
</style>