<template>
    <div class="popupmenu_div" ref='whole_popup' v-on:click="removePopup()">
        <div v-on:click.stop v-if="$store.state.add_prediction && disable_white_background" style="width: 70%">
            <slot   style="padding-left: 50px; padding-right: 50px;"></slot>

        </div>
        <div class="popupmenu_wrapper" v-on:click.stop v-else>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        disable_white_background: { type : Boolean, default : true }
    },
    data(){
        return{
            routerlink : this.$route.path
        }
    },
    created(){
        window.addEventListener('scroll', this.handleScroll)
    },
    mounted(){
        this.$store.watch( () => this.$store.getters.RetrieveRouterAddress, router_address => {
            document.body.style.position = '';
            document.body.style.top = '';
            this.$emit('    ', false)
        })

        let el = this.$refs.whole_popup;
        if(el){
            el.addEventListener('wheel', function(e){
                e.preventDefault();
            });
            el.addEventListener('mousewheel',  function(e){
                e.preventDefault();
            });
            el.addEventListener('DOMMouseScroll',  function(e){
                e.preventDefault();
            });
        }
    },
    methods: {
        removePopup: function(){
            document.body.style.position = '';
            document.body.style.top = '';
            this.$emit('cancel-clicked', false)
        },
        handleScroll (event) {
            // Any code to be executed when the window is scrolled
            window.addEventListener('scroll', this.newFunction)
        },
        newFunction: function(e){
            //console.log("e : ",e)
        }
    }
}
</script>

<style scoped>
.popupmenu_div{
    position            : fixed;
    z-index             : 9998;
    top                 : 0;
    left                : 0;
    width               : 100%;
    height              : 100%;
    background-color    : rgba(0, 0, 0, .5);
    display             : flex;
    justify-content     : center;
    align-items         : center;
    overflow            : hidden;
}
.popupmenu_wrapper{
    padding             : 50px;
    background-color    : white;
    box-shadow          : 0 2px 8px rgba(0, 0, 0, .33);
    font-size           : 20px;
    max-height          : 80%;
    max-width           : 80%;
    border-radius       : 20px;
    overflow            : auto;

}
</style>