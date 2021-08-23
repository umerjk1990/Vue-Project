<template>
    <div class="labeltreeMM_div">
        <div class="toprow_div">
			<div 	class="singlerow_div"
					v-for="(d,i) in rowShrinkLength"
					:key='i'
					ref="row_ref"
                    :style="{minWidth : returnStyleTopRow(i)}">
			</div>
		</div>
		<LabelTreeMP v-for='(child,i) in sorted_children'
					:key='i'
                    :label="child"
                    :parent_depth=-1
                    :row_shrink='returnRowShrink'>
		</LabelTreeMP>
	</div>
</template>

<script>
import LabelTreeMP from './LabelTreeMP'
export default {

    components:{
        LabelTreeMP,
    },

    props:{
        label: {
            type: Array,
        },
        row_shrink: {
            type: Array,
            default: () => []
        },
    },

    computed: {
        rowShrinkLength: function(){
            return this.row_shrink.length
        },
        returnRowShrink: function(){
            return this.row_shrink
        },
        sorted_children: function(){
            return this.label.slice(0).sort((a, b) =>
                this.recursive_count(b) - this.recursive_count(a)
            )
        },
    },

    methods:{
        returnStyleTopRow: function(i){
            return this.row_shrink[i] ? '50px' : '150px'
        },
        recursive_count(l){
			return 1 + l.child.map(l_ => this.recursive_count(l_)).reduce((t,n) => t+n, 0)
        },
    },


}
</script>

<style>
.labeltreeMM_div {
	width: 100%;
	transition: all 1s ease;
    -webkit-transition: all 1s ease;
    overflow-x: visible;
}
.toprow_div{
	display: flex;
	margin-left: 10px;
	margin-bottom: 10px;
}
.singlerow_div{
	min-width: 150px;
	height: 50px;
	margin-right: 10px;
	background-color: rgb(27 32 78);
	background-image: url('../../../assets/triangle.svg');
	background-repeat: no-repeat;
	background-size: 15px;
	background-position-x: 90%;
	background-position-y: 50%;
	cursor: pointer;
	border: 2px solid transparent;
}
</style>