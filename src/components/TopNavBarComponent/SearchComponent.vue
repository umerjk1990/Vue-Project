<template>
    <div class="search_div">
        <div class="search_icon"></div>
        <input type="text" ref='search_tb' class="textbox" value="Search" v-on:click="textbox_click()" @blur="textbox_blur">
    </div>
</template>

<script>
    export default {
        methods : {
             textbox_click: function(){
                if(this.$refs['search_tb'].value == 'Search')
                    this.$refs['search_tb'].value = ''
            },
            textbox_blur: function(){
                if(!this.$refs['search_tb'].value)
                    this.$refs['search_tb'].value = 'Search'
            },
        }
    }
</script>

<style scoped>
.search_div{
    width               : 100%;
    height              : 40%;
    display             : flex;
    background-color    : rgb(255 255 255);
}
.search_icon{
    width               : 50px;
    height              : 50px;
    background-image    : url('../../assets/search.svg');
    background-repeat   : no-repeat;
    background-size     : 18px;
    background-position-x: 20px;
    background-position-y: 12px;
}
.search_icon:hover{
    cursor              : pointer;
}
.textbox{
    width               : 85%;
    background          : transparent;
    border              : transparent;
    color               : #66778a;
    font-size           : 18px;
}
.textbox:focus{
    outline             : none;
}
</style>