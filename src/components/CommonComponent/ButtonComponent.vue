<template>
    <div class="button_wrapper">
        <div class="cancel_div" v-on:click="$emit('cancel-click', true)">
            {{cancel}}
        </div>
        <div class="confirm_div" v-on:click="$emit('confirm-click', true)" :style="{ width : confirm_button_width }">
            {{confirm}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        confirm : { type : String , default : 'Confirm'},
        cancel  : { type : String , default : 'Cancel' },
        confirm_button_width : { type: String }
    }
}
</script>

<style scoped>
.button_wrapper{
    display: flex;
    float: right;
    /* margin-right: 15px; */
    font-size: 13px;
}
.confirm_div{
    width: 80px;
    height: 35px;
    border-radius: 8px;
    color: #ffffff;
    background-color: #00b271ad;
    display: flex;
    justify-content: center;
    align-items: center;
}
.cancel_div{
    width: 80px;
    height: 35px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #65768f;
}
.cancel_div:hover{
    cursor: pointer;
    text-decoration-line: underline;
}
.confirm_div:hover{
    cursor: pointer;
    background-color: #00b270
}
</style>