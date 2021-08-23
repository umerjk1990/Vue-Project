<template>
	<div class="labeltree_div" @mouseup="mouseUp" @click="onClick" ref="app_ref">
		<div class="top_row_div">
			<div 	class="single_row_div"
					v-for="(d,i) in returnDepth"
					:key='i'
					ref="row_ref"
					v-on:click="changeDivWidth(i)">
			</div>
		</div>
		<transition-group name="flip-list" tag="div" >

			<LabelTree v-for='child in sorted_children'
						@on-dragged="onDragged"
						@Mouse-On-Label="mouseOnLabel"
						@drop-on-label="dropOnLabel"
						@label-border="labelBorder"
						@right-bar='rightBar'
						:label="child"
						:moving_box_props="moving_box"
						:isdragging="isdragging"
						:label_select="label_select"
						:key='child.id'
						:row_shrink="row_shrink"
						:depth="-1"
						:potential_parent="potential_parent"
						:mouseDraggingRestriction="mouseDraggingRestriction">
			</LabelTree>


		</transition-group>
			<!-- v-if="isdragging" -->
		<div class="last_label_sugestion_div"
			v-if="isdragging"
			@mouseenter="new_parent = true"
			@mouseleave="new_parent = false"
			@mouseup="mouseUp">
		</div>

		<TemporaryLabelDrag v-if="isdragging && label_select.length != 0"
							:movingbox="moving_box"
							:newparent="new_parent"
							:label_select="label_select"
							:mouse_on_label="mouse_on_label">
		</TemporaryLabelDrag>
	</div>
</template>

<script>
import LabelTree 			from './LabelTree'
import TemporaryLabelDrag 	from './TemporaryLabelDrag'
import ActionHistory 	    from './actions/ActionHistory'
import {ActionGroup} 		from "./actions/Action"
var {MouseHandler} = require("./js/Mousehandler.js")
import {AddObjectToArrayAction, DeleteObjectFromArrayAction} from "./actions/ArrayAction"
export default {
	components:{
		LabelTree,
		TemporaryLabelDrag
	},
	props: {
		redo_undo_click: {
			type: String,
			default: ''
		},
		label: {
			type: Array
		}
	},
	data(){
		return{
			moving_box : null,
			mtracker : null,
			isdragging : false,
			new_parent : false,
			mouse_on_label: false,
			potential_parent: null,
			depth: 0,

			shiftKey : false,

			temp_x: 0,
			edgeSize : 100,
			timer: null,

			label_select : [],

			history: new ActionHistory(),
			row_shrink: [],
		}
	},
	created() {
		this.label.map( o=> this.reCalDepthAndMaxDepth( o, -1 ))
		for(let i=0; i < this.depth; i++) {
			this.row_shrink[i] = false
		}
		this.$emit('row-shrink', this.row_shrink)

		window.addEventListener("keyup", this.keyUpHandler);
		window.addEventListener("keydown", this.keyDownHandler);

	},
	destroyed(){
		window.removeEventListener("keyup", this.keyUpHandler);
		window.removeEventListener("keydown", this.keyDownHandler);
		//window.addEventListener( "mousemove", this.handleMousemove );
	},
	mounted(){
		window.xxx = this.history
		window.depth = this.depth
		this.mtracker = MouseHandler.create_tracker(this.$el, {
			global: true,
			mousemove: this.mouseMove
		})
	},
	watch:{
		isdragging: function(){
			this.depth = 0
			this.label.map( o=> this.reCalDepthAndMaxDepth( o, -1 ))
			this.row_shrink = this.updatingRowShrink
		},
		depth: function(){
			//window.depth = this.depth
		},
		label_select_length: function(){
			//this.$emit('label-select', this.label_select)
		},
		redo_undo_click: function(){
			if(this.redo_undo_click == 'redo')
				this.historyRedo()
			if(this.redo_undo_click == 'undo')
				 this.historyUndo()
			this.$emit('reset-redo-undo')
		},
		row_shrink: function(){
			this.$emit('row-shrink', this.row_shrink)
		}
	},
	computed: {
		shrinkScreen: function () {
            return this.$store.state.shrink_screen
        },
		returnDepth: function(){
			return this.depth
		},
		sorted_children: function(){
            return this.label.slice(0).sort((a, b) =>
                this.recursive_count(b) - this.recursive_count(a)
            )
		},
		updatingRowShrink: function(){
			var temp_arr = []
			if(this.depth > this.row_shrink.length){
				for(let i=0; i < this.depth; i++) {
					if(this.row_shrink[i])
						temp_arr[i] = this.row_shrink[i]
					else
						temp_arr[i] = false
				}
				return temp_arr
			}
			else if(this.depth < this.row_shrink.length){
				for(let i=0; i < this.depth; i++)
					temp_arr[i] = this.row_shrink[i]
				return temp_arr
			}
			else
				return this.row_shrink
		},
		mouseDraggingRestriction: function(){
			if( this.mtracker &&
			   (Math.abs(this.mtracker.restricted.dx >  30) ||
				Math.abs(this.mtracker.restricted.dy >  30) ||
				Math.abs(this.mtracker.restricted.dx < -30) ||
				Math.abs(this.mtracker.restricted.dy < -30) ))

				return true
			else
				return false
		},
		label_select_length: function(){
			return this.label_select.length;
		},

	},
	methods: {

		rightBar: function(bool){
            this.$emit('right-bar', bool)
        },
		handleMousemove: function(event){
			// Get the viewport-relative coordinates of the mousemove event.
			var viewportX = event.clientX;
			var viewportY = event.clientY
			let app_ref = this.$refs['app_ref']

			// Get the viewport dimensions.
			var viewportWidth = document.documentElement.clientWidth;
			var viewportHeight = document.documentElement.clientHeight;

			var edgeTop = this.edgeSize + 40;
			var edgeLeft = this.edgeSize + 220;
			var edgeBottom = ( viewportHeight - this.edgeSize );
			var edgeRight = ( viewportWidth - this.edgeSize );

			var isInLeftEdge = ( viewportX < edgeLeft );
			var isInRightEdge = ( viewportX > edgeRight );
			var isInTopEdge = ( viewportY < edgeTop );
			var isInBottomEdge = ( viewportY > edgeBottom );

			// If the mouse is not in the viewport edge, there's no need to calculate
			// anything else.
			if ( ! ( isInLeftEdge || isInRightEdge || isInTopEdge || isInBottomEdge ) ) {

				clearTimeout( this.timer );
				return;

			}

			var documentWidth = Math.max(
				app_ref.scrollWidth,
				app_ref.offsetWidth,
				app_ref.clientWidth,
				app_ref.scrollWidth,
				app_ref.offsetWidth,
				app_ref.clientWidth
			) + 220
			var documentHeight = Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight,
				document.body.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight,
				document.documentElement.clientHeight
			);

			// length of the document that is NOT in the viewport.
			var maxScrollX = ( documentWidth - viewportWidth );
			var maxScrollY = ( documentHeight - viewportHeight );

			let checkForWindowScroll = () => {

				clearTimeout( this.timer );
				if ( this.adjustWindowScroll(maxScrollX, maxScrollY, isInLeftEdge, isInRightEdge, isInTopEdge, isInBottomEdge, viewportX, viewportY, edgeTop, edgeLeft, edgeBottom, edgeRight) )
					this.timer = setTimeout( checkForWindowScroll, 30 );

			}
			if(this.moving_box)
				checkForWindowScroll();
		},

		adjustWindowScroll: function(maxScrollX, maxScrollY, isInLeftEdge, isInRightEdge, isInTopEdge, isInBottomEdge, viewportX, viewportY, edgeTop, edgeLeft, edgeBottom, edgeRight) {

			// Get the current scroll position of the document.
			//var currentScrollX = window.pageXOffset;
			var currentScrollX = this.$refs['app_ref'].scrollLeft
			var currentScrollY = window.pageYOffset;

			// Determine if the window can be scrolled in any particular direction.
			var canScrollUp = ( currentScrollY > 0 );
			var canScrollDown = ( currentScrollY < maxScrollY );
			var canScrollLeft = ( currentScrollX > 0 );
			var canScrollRight = ( currentScrollX < maxScrollX );

			var nextScrollX = currentScrollX;
			var nextScrollY = currentScrollY;

			var maxStep = 50;

			// Should we scroll left?
			if ( isInLeftEdge && canScrollLeft ) {
				var intensity = ( ( edgeLeft - viewportX ) / this.edgeSize );

				nextScrollX = ( nextScrollX - ( maxStep * intensity ) );

			// Should we scroll right?
			} else if ( isInRightEdge && canScrollRight ) {

				var intensity = ( ( viewportX - edgeRight ) / this.edgeSize );

				nextScrollX = ( nextScrollX + ( maxStep * intensity ) );

			}

			// Should we scroll up?
			if ( isInTopEdge && canScrollUp ) {

				var intensity = ( ( edgeTop - viewportY ) / this.edgeSize );

				nextScrollY = ( nextScrollY - ( maxStep * intensity ) );

			// Should we scroll down?
			} else if ( isInBottomEdge && canScrollDown ) {

				var intensity = ( ( viewportY - edgeBottom ) / this.edgeSize );

				nextScrollY = ( nextScrollY + ( maxStep * intensity ) );

			}

			nextScrollX = Math.max( 0, Math.min( maxScrollX, nextScrollX ) );
			nextScrollY = Math.max( 0, Math.min( maxScrollY, nextScrollY ) );

			if ( this.moving_box && (
				( nextScrollX !== currentScrollX ) ||
				( nextScrollY !== currentScrollY )
				) ){

				window.scrollTo( nextScrollX, nextScrollY );
				this.$refs['app_ref'].scrollTo(nextScrollX, nextScrollY)
				return( true );

			} else {

				return( false );

			}

		},

		keyDownHandler: function(e){
			if(e.keyCode == 16){
				this.shiftKey = true
			}
		},
		keyUpHandler: function(e){
			if(e.keyCode == 16){
				this.shiftKey = false
			}
		},
		onClick: function(){
			this.label_select = []

		},
		mouseOnLabel: function( label ){
			if(label == null){
				this.mouse_on_label = false;
				this.potential_parent = null;
				return;
			}
			let droppies = this.getDroppies();

			// check if all droppies can be dropped on label
			let can_drop = droppies.filter(d => this.canDropOn(d, label)).length == droppies.length && droppies.length > 0;
			this.mouse_on_label = can_drop;
			if(can_drop){
				this.potential_parent = label;
			}
		},
		isParent: function(label, parent){
			if(!parent)
				return false
			if(label.label.id == parent.label.id)
				return true
		},
		labelBorder: function(l){

			let can_add = true;
			if(this.shiftKey){ //shift key on press and hold

				if(this.label_select.includes(l)){

					let parents = this.getLabelAndParents(this.label, l);

					while(parents.length){
						if(!this.label_select.includes(parents[0])){
							parents.splice(0,1);
						}else{
							break;
						}
					}

					can_add = parents[0] != l;

					// unselect first selected parent and its children
					let unselected = this.getLabelAndChildren(parents[0])

					this.label_select = this.label_select.filter(x => unselected.indexOf(x) == -1);

				}

				if(can_add){
					let tmp = this.label_select.concat(this.getLabelAndChildren(l))
					tmp = tmp.filter((value, index, self) =>  self.indexOf(value) === index );
					this.label_select = tmp;
				}
			}
			else if(this.label_select.includes(l)){
				return
			}
			else{
				this.label_select = [l]
			}

			//sending to main component to show description of label
			this.$emit('label-select', this.label_select)
		},
		getLabelAndChildren: function(label){
			let array = [label];
			let children = label.child.map(l => this.getLabelAndChildren(l));
			return array.concat(children).flat();
		},
		getLabelAndParents: function(subtree, label){
			for(let i=0; i<subtree.length; i++){
				let child = subtree[i];

				if(child.child.includes(label)){
					return [child, label]
				}

				let rec_ret = this.getLabelAndParents(child.child, label);
				if(rec_ret != null){
					return [child].concat(rec_ret);
				}
			}
			return null;
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

		searchLabel: function(label, matchingLabel){
            if(label.id == matchingLabel.id){
                return true
            }
            else if( label.child.length != 0 ){
                var result = false
                for(var i=0; i<label.child.length; i++){
                    result = thilabel.searchLabel(label.child[i], matchingLabel)
                    if( result )
                        return result
                }
                return result
            }
            return false
		},
		reCalDepthAndMaxDepth: function(label, depth){
			label.depth = depth + 1
			this.depth = (this.depth < label.depth + 1) ? label.depth+1 : this.depth
			label.child.map( o=> this.reCalDepthAndMaxDepth (o , label.depth ) )
		},
		historyUndo: function(){
			this.history.undo()
			this.depth = 0
			this.label.map( o=> this.reCalDepthAndMaxDepth( o, -1 ))

			for (let i = 0; i < this.depth; i++) {
				if( !this.row_shrink[i])
					this.row_shrink[i] = false
			}
		},
		historyRedo: function(){
			this.history.redo()
			this.depth = 0
			this.label.map( o=> this.reCalDepthAndMaxDepth( o, -1 ))

			for (let i = 0; i < this.depth; i++) {
				if( !this.row_shrink[i])
					this.row_shrink[i] = false
			}
		},
		count_all_children(l){
			return l.child.length
		},
		recursive_count(l){
			return 1 + l.child.map(l_ => this.recursive_count(l_)).reduce((t,n) => t+n, 0)
		},
		getDroppies(){
			// get potential droppies
			let droppies = this.label_select;

			// filter droppies so we only get droppies root parents
			droppies = droppies.filter(d => {
				let parents = this.getLabelParents(this.label, d);
				return parents.filter(p => droppies.indexOf(p) > -1).length == 0
			})

			return droppies;
		},
		canDropOn: function(dropped, dropped_on){
			return !dropped_on.child.includes(dropped) &&
				   !this.getLabelAndChildren(dropped).includes(dropped_on);
		},
		//Function for giving suggestion for dropping label
		dropOnLabel: function( label ){

			if(this.moving_box == null) return;

			// get droppies
			let droppies = this.getDroppies();

			// check if all droppies can be dropped on label
			let can_drop = droppies.filter(d => this.canDropOn(d, label)).length == droppies.length;
			if(can_drop && this.isdragging){
				this.label_select.map(o => {
				let n = label.depth - o.depth
					o.depth = label.depth +1
					if(o.child.length > 0)
						this.getLabelAndChildren(o).map(l => {
							l.depth = n + l.depth +1
						})
				})

				this.label_select = []

				let delete_actions = droppies.map(d => {
					let parents = this.getLabelParents(this.label, d);
					if(parents.length){
						return new DeleteObjectFromArrayAction(d, parents[parents.length-1].child);
					}else{
						return new DeleteObjectFromArrayAction(d, this.label);
					}
				});

				let add_actions = droppies.map(d => {
					return new AddObjectToArrayAction(d, label.child);
				});

				this.history.do(new ActionGroup(delete_actions.concat(add_actions)));
			}
			this.isdragging = false
			this.moving_box = null
		},
		//Function for giving suggestion for dropping label
		dropOnRoot: function(){
			if(this.moving_box == null) return;

			// get droppies
			let droppies = this.getDroppies();
			this.label_select.map(o => {
					o.depth = 1
					if(o.child.length > 0)
						this.getLabelAndChildren(o).map(l => {
							l.depth = 1 + l.depth +1
						})
				})

			this.label_select = []

			let delete_actions = droppies.map(d => {
				let parents = this.getLabelParents(this.label, d);
				if(parents.length){
					return new DeleteObjectFromArrayAction(d, parents[parents.length-1].child);
				}else{
					return new DeleteObjectFromArrayAction(d, this.label);
				}
			});

			let add_actions = droppies.map(d => {
				return new AddObjectToArrayAction(d, this.label);
			});

			this.history.do(new ActionGroup(delete_actions.concat(add_actions)));
			this.isdragging = false
			this.moving_box = null
		},
		mouseUp: function(){//when making label with no parent

			if(this.moving_box && this.new_parent){
				this.dropOnRoot()
			}
			this.$emit('right-bar', false)
		},
		mouseMove: function(event){

			if(event.buttons == 0)//Check mouse button is clicked
			{
				this.isdragging = false
				this.moving_box = null
				window.removeEventListener( "mousemove", this.handleMousemove );
			}
			else if( this.moving_box ){
				this.$emit('right-bar', true)
				this.isdragging = true

				let shrink = this.shrinkScreen ? 100 : 0

				//restricting the dragging label box on screen
				if(this.mtracker.x > 130)
					this.moving_box.x = this.mtracker.x + 55 - shrink
				else
					this.moving_box.x = 188 - shrink

				if(this.mtracker.y > -1)
					this.moving_box.y = this.mtracker.y + 155
				else
					this.moving_box.y = 155

				if(this.moving_box.x + 155 > document.body.offsetWidth)
					this.moving_box.x = document.body.offsetWidth- 155 - shrink

				window.addEventListener( "mousemove", this.handleMousemove );
			}
		},
		onDragged: function(moving_box){

			this.moving_box = moving_box
			if(this.label_select.length == 0)
				this.label_select = [moving_box.label]

			this.$emit('label', moving_box.label)
		},
		/* Calculate the maximum depth of Tree */
		maxDepth: function( array, depth ){
			depth += 1
			if(depth > this.depth)
				this.depth = depth
			for (let i = 0; i < array.length; i++) {
				if(array[i].child.length != 0){
					this.maxDepth(array[i].child, depth)
				}
			}
		},
		changeDivWidth: function(i){
			this.row_shrink[i] = !this.row_shrink[i]
			var new_row_shrink = []
			for(let i=0; i < this.depth; i++) {
				new_row_shrink[i] = this.row_shrink[i]
			}
			this.row_shrink = new_row_shrink
			if(this.row_shrink[i])
				this.$refs['row_ref'][i].style.minWidth = '50px'
			else
				this.$refs['row_ref'][i].style.minWidth = '150px'
		}
	},
}
</script>

<style>
.labeltree_div {
	/* padding: 20px; */
	width: 100%;
	transition: all 1s ease;
  -webkit-transition: all 1s ease;
	overflow-x: auto;
}
.top_row_div{
	display: flex;
	margin-left: 10px;
	margin-bottom: 10px;
}
.single_row_div{
	min-width: 150px;
	height: 50px;
	margin-right: 10px;
	background-color: rgb(27 32 78);
	background-image: url('../../assets/triangle.svg');
	background-repeat: no-repeat;
	background-size: 15px;
	background-position-x: 90%;
	background-position-y: 50%;
	cursor: pointer;
	border: 2px solid transparent;
}
.tracking_div{
	display: flex;
	position: fixed;
	right: 10px;
	top: 10px;
}
.button_div{
	width: 100px;
	height: 30px;
	border: solid 1px grey;
	color: white;
	background-color: #9f9f9fcf;
	margin: 5px;
	cursor: pointer;
}
.last_label_sugestion_div{
	width: 200px;
	height: 50px;
	border: 1px dashed black;
	margin-left: 10px;
}
.button_div.redo{
}
.button_div.undo{
}
.flip-list-move {
  transition-delay: 0.3s;
  transition: transform 0.3s ;
}
</style>