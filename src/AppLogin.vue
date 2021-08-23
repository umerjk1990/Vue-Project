<template>
    <div >
        <div v-if="login_display">
            <div>User Name</div>
            <input type="text" id="username">
            <div>Password</div>
            <input type="text" id="password">
            <button v-on:click="loginButton()">Login</button>
        </div>
        <div v-else>
            <router-view to='/loginsucessfull'></router-view>
        </div>
    </div>
</template>

<script>
import { userService } from './dao/services';
import { projectService } from './dao/services';
export default {
    
    data(){
        return{
            //info : null,
            login_display : true,

            user: {
                username: '',
                password: '',
            },
        }
    }, 
    mounted () {

    },
    methods:{
        loginButton: function(){
            //Get username and password
            this.user.username = document.getElementById('username').value
            this.user.password = document.getElementById('password').value
            
            //Getting HTTP link
            let login = userService.login(this.user)

            login.then((value) => {
                console.log('login response:', value)
            }, (error) => {
                console.error('error', error)
            });

            let projects = projectService.getCollection();
            projects.then(value => {
                console.log(value);
            });
        
            this.login_display = false;
            
        }
    }
    
}
</script>

<style scoped>

</style>
