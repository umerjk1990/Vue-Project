<template>
    <div class="project_div" v-on:click="$emit('on-click')">
        <div class="select_div"></div>
        <div class="project_name_div">
            {{project.name}}
        </div>
    </div>    
</template>

<script>
export default {
    props: {
        project : {
            Type : Object,
        }
    },
    
}
</script>

<style scoped>
.project_div{
    height: 55px;
    width: 100%;
    border-radius: 15px;
    border: solid 1px #cecece;
    background-color: #ffffff;
    display: flex;
    margin-bottom: 15px;
    text-align: left;
    line-height: 1.2;
}
.project_div:hover{
    cursor: pointer;
}
.select_div{
    width: 56px;
    height: 100%; 
    background-size: 30px;
}
.project_name_div{
    font-size: 16px;
    font-weight: bold;
    line-height: 1.13;
    color: #1b204e;
    margin-right: 5%;
    width: 30%;
    padding-top: 18px;
}
</style>