<template>
    <div class="latesteventpopup_div">
        <div class="user_div" :style="{ backgroundColor : user.color }"> {{user.nick_name}} </div>
        <div style="width: 54%;padding-top: 5px;">
            <div class="name_div"> {{user.name}} </div>
            <div class="updatenotification_div"> {{user.update_notification}} </div>
        </div>
        <div style="width: 40%; padding-top: 5px;">
            <div class="project_div"> Project: {{user.project}} </div>
            <div class="datasetdate_div"> {{user.dataset_date}} </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        user:{ type: Object }
    },
    mounted(){
        //Preventing body scroll down when popup menu is shown 
        //console.log("Document : ", window.scrollY)
        document.body.style.position = 'fixed';
        //document.body.style.top = window.scrollY+'px';
    }
    
}
</script>

<style scoped>
.latesteventpopup_div{
    display         : flex;
    width           : 500px;
    font-size       : 16px;
}
.latesteventpopup_div:hover{
    cursor: pointer;
    background-color: #acacac47;
}
.user_div{
    width           : 7%;
    height          : 35px;
    margin-top      : 10px;
    color           : rgb(255 255 255);
    font-weight     : bold;
    
    background-color: rgb( 27 32 78);
    display         : flex;
    justify-content : center;
    align-items     : center;
    border-radius   : 5px;
    margin-right    : 15px;
    margin-bottom   : 20px;
}
.name_div{
    font-weight     : bold
}
.updatenotification_div{
    margin-top      : 5px;
    font-size       : 13px;
    line-height     : 18px;
}
.project_div{
    font-size       : 13px;
    line-height     : 18px;
    color           : #66778a
}
.datasetdate_div{
     font-size       : 13px;
    line-height     : 18px;
    color           : #66778a
}
</style>