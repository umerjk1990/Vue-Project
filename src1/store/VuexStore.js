import Vue from 'vue';
import Vuex from 'vuex';

import {projectService, datasetService, modelService, userService} from '../dao/services'


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        //loading. Expecting an promise. Do not render yet.
        loading : true,

        //close the option menu when hover on user
        //close_menu : false,

        //close the left Nav bar and when screen display is smaller
        shrink_screen : false,

        //toggle Delete Boolean Options
        delete_project : false,
        delete_dataset : false,

        //toggle train model
        train_model : false,

        //toggle Rename Boolean Options
        rename_project : false,

        //toggle Add Prediction for selecting dataset
        add_prediction : false,

        //Login Status
        login_status : false,

        //Session Expire
        session_expire : true,

        //How many nodes is the path
        path_max_count : 0,

        //How many nodes can the screen width support
        path_available : 0,

        //User Login Status
        user_detail : null,

        //Id of the project
        project_id : null,

        //Hide and Show User Component on Top Nav Bar
        toggle_user : true,

        //Router address
        router_address : '/',

        //Project, Dataset, Models and User Services from Backend
        projects      : [],
        dataset       : [],
        models        : [],
        user_services : {},
        single_project : {},
        single_dataset : {},

        project_collaborators : [],
    },

    mutations : {
        loadingTrue: state => {
            state.loading = true;
        },
        loadingFalse: state => {
            state.loading = false;
        },
        /* menuStatus: state => {
            state.close_menu = !state.close_menu
        }, */
        shrinkScreenTrue : state => {
            state.shrink_screen = true;
            document.getElementById("dashboard")
                .style.setProperty("--leftNavWidth", "80px");
        },
        shrinkScreenFalse : state => {
            state.shrink_screen = false;
            document.getElementById("dashboard")
                .style.setProperty("--leftNavWidth", "180px");
        },
        loginStatusTrue : state => {
            state.login_status = true
        },
        loginStatusFalse : state => {
            state.login_status = false
        },

        //toggling delete states
        toggleDeleteProject : state => {
            state.delete_project = !state.delete_project
        },
        toggleDeleteDataset : state => {
            state.delete_dataset = !state.delete_dataset
        },

        TOGGLE_TRAIN_MODEL: state => {
            state.train_model = !state.train_model
        },
        TOGGLE_TRAIN_MODEL_FALSE: state => {
            state.train_model = false
        },

        //rename project
        toggleRenameProject: state => {
            state.rename_project = !state.rename_project
        },
        //Add Prediction
        toggleAddPrediction: state => {
            state.add_prediction = !state.add_prediction
        },

        //Asyncronus Data Management
        SET_PROJECTS(state, project){
            state.projects = project
        },
        SET_DATASET(state, dataset){
            state.dataset = dataset
        },
        SET_MODELS(state, models){
            state.models = models
        },
        SET_USER_SERVICES(state, user_services){
            state.user_services = user_services
        },

        USER_DETAIL(state, user_detail){
            state.user_detail = user_detail
        },

        SET_ROUTER_ADDRESS(state, router_address){
            state.router_address = router_address
        },

        SET_USER_COMPONENT_VISIBILITY(state, toggle_user){
            state.toggle_user = toggle_user
        },

        SET_PROJECT_COLLABORATORS(state, project_collaborators){
            state.project_collaborators = project_collaborators
        },
        SET_SINGLE_PROJECT(state, single_project){
            state.single_project = single_project
        },
        SET_SINGLE_DATASET(state, single_dataset){
            state.single_dataset = single_dataset
        },

    },
    actions: {
        storeProjectCollaborators(context, project_collaborators){
            context.commit('SET_PROJECT_COLLABORATORS', project_collaborators)
        },
        fetchProjects(context){
            projectService.getCollection()
            .then(value => {
                //Storing Array of Object from Database to project_array
                context.commit('SET_PROJECTS', value.data.results)
            })
        },
        updatingSingleProject(context, single_project){
                context.commit('SET_SINGLE_PROJECT', single_project)
        },
        updatingSingleDataset(context, single_dataset){
            context.commit('SET_SINGLE_DATASET', single_dataset)
        },
        fetchDataset(context){
            datasetService.getCollection(24)
            .then(value => {
                context.commit('SET_DATASET', value.data.results)
            })
        },
        fetchModels(context){
            modelService.getCollection()
            .then(value => {
                context.commit('SET_MODELS', value.data.results)
            })
        },
        fetchUserServices(context){
            userService.getCollection()
            .then(value => {
                context.commit('SET_USER_SERVICES', value.data)
            })
        },
        getUserDetail(context, user_detail){
            context.commit('USER_DETAIL', user_detail)
        },
        UpdateRouterAddress(context, router_address){
            console.log('Router Address : ',router_address)
            context.commit('SET_ROUTER_ADDRESS', router_address)
        },
        setUserComponentVisibility(context, toggle_user){
            context.commit('SET_USER_COMPONENT_VISIBILITY', toggle_user)
        }
    },

    getters: {
        RetrieveSingleProject(state){
            return state.single_project
        },
        RetrieveSingleDataset(state){
            return state.single_dataset
        },
        RetrieveProjectCollabortors(state){
            return state.project_collaborators
        },
        doneFetchingProjects(state){
            // Or you can use filter to retrieve specific data
            return state.projects
        },

        RetrieveDataSet(state){
            return state.dataset
        },

        RetrieveModels(state){
            return state.models
        },
        RetrieveRouterAddress(state){
            return state.router_address
        },
        RetrieveUserDisplayVisibile(state){
            return state.toggle_user
        },
        RetrieveUserServices(state){
            return state.user_services
        }

    },
})
