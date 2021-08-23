<template>
    <div class="usercomponent_div">
        Coming Soon...
    </div>
</template>

<script>
    export default {
        mounted(){
            console.log("Setting Router : ", this.$router.currentRoute.path)
            this.$store.dispatch('UpdateRouterAddress', this.$router.currentRoute.path)

            //Display Users FALSE on Top Nav Bar
            this.$store.dispatch('setUserComponentVisibility', false)
        }
    }
</script>

<style scoped>
.usercomponent_div{
    height: 100%;
    text-align: center;
    padding-top: 100px;
}
</style>