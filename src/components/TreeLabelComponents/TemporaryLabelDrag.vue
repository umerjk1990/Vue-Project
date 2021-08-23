<template>
    <div class="temp_div" :style="moveDiv"> {{labelName}} </div>
</template>

<script>
export default {
    props: {
        movingbox: {
            type: Object,
            default: null
        },
        newparent: {
            type : Boolean,
            default : false
        },
        label_select: {
            type: Array,
        },
        mouse_on_label : {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        moveDiv: function(){
            if(this.movingbox){

                return {
                    left : (this.movingbox.x) + 'px',
                    top  : (this.movingbox.y)+ 'px',
                    backgroundColor : this.changeBackground ? '' : 'red'
                }
            }
            return ''
        },
        labelName: function(){

            if( this.label_select.length > 1 )
                return this.label_select.length + " Labels"
            else if(this.label_select.length == 1)
                return this.label_select[0].name
            else
                return 'No label Selected'
        },
        changeBackground: function(){

            if(this.mouse_on_label || this.newparent) return true
            else return false
        }
    }

}
</script>


<style>
.temp_div{
    width: 150px;
    height: 35px;
    font-size: 13px;
    font-weight: normal;
    background-color: yellowgreen;
    position: absolute;
    vertical-align: middle;
    line-height: 35px;
    text-align: center;
    color: white;
    font-weight: bold;
}
</style>