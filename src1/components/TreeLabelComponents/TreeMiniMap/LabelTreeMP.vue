<template>

    <div class="labeltree_template_div">
        <div class="wrapper_node">

            <div class="node_name_div" :style="styleNodeDiv">
                <div class="label_detail_div">
                    <div class="label_color_div" :style="{ backgroundColor : label.color }"></div>
                    <div class="label_name_div">{{label.name}}</div>
                </div>
            </div>
        </div>
        <transition-group name="flip-list" tag="div" v-if='label.showchild'>
            <div v-for="(l,i) in sorted_children" :key="i">

                <node   :label='l'
                        :parent_depth='label_depth'
                        :row_shrink='row_shrink'>
                </node>
            </div>
        </transition-group>
        <div    v-else
                class="display: flex"
                v-for='(lc, index) in returnFoldingDepth'
                :key='index'>
            <div class="folded_number_child" :style="styleFoldedchild(index+1)" ref="fnc_ref">
                <div class="label_color_div"></div>
                <div class="label_name_div"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "node",
    props:{
        label: {
            type: Object,
            default: null
        },
        parent_depth:{
            type: Number,
        },
        row_shrink:{
            type: Array,
        },

    },
    data(){
        return{
            label_depth: -1,
        }
    },
    watch: {
    },
    created(){
        this.label_depth = this.parent_depth + 1
        //this.label.showchild = true
        if(!this.label.depth)
            this.label.depth = this.label_depth
    },
    mounted(){

    },
    computed: {
        childMaxDepth: function(){
            return this.getLabelAndChildren(this.label)
                          .map(o=>o.depth)
                          .reduce(function(a, b) {
                                    return Math.max(a, b);
                                });
        },
        returnFoldingDepth: function(){
            return this.childMaxDepth - this.label.depth
        },
        sorted_children: function(){
            return this.label.child.slice(0).sort((a, b) =>
                this.recursive_count(b) - this.recursive_count(a)
            )
        },
        styleNodeDiv: function(){
            if(this.label.child.length == 1){

                return { height : 35 + 'px',
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
            if(this.label.child.length > 1 )
                return true
            else
                return false
        },
    },
    methods:{
        styleFoldedchild: function(i){
            return {
                width : this.row_shrink[this.label_depth+i] ? 50+'px' : 150 + 'px'
            }
        },
        getLabelAndChildren: function(label){
			let array = [label];
			let children = label.child.map(l => this.getLabelAndChildren(l));
			return array.concat(children).flat();
		},
        recursive_count(l){
			return 1 + l.child.map(l_ => this.recursive_count(l_)).reduce((t,n) => t+n, 0)
		},
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
    background-image: url('../../../assets/labelTree/triangle-down-active.svg');
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
    position: absolute;
    transition: top 0.2s ease-out;
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
    background-image: url('../../../assets/labelTree/triangle-down-populated.svg');
    background-repeat: no-repeat;
    background-size: 15px;
    background-position-x: 50%;
    background-position-y: 50%;
}
.fold_childs_div:hover{
    background-image: url('../../../assets/labelTree/triangle-down-active.svg');
    background-color: rgb(148, 133, 174);
}
.flip-list-move {
  transition-delay: 0.3s;
  transition: transform 0.3s ;
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