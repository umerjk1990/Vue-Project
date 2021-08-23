import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

import Dashboard        from './components/Dashboard'
import Projects         from './components/Projects'
import Setting          from './components/Setting'
import ProjectComponent from './components/ProjectsComponnet/ProjectComponent'
import AllImagesDataSet from './components/MainContent/ProjectMainContent componnet/ProjectComponent/datasets/AllImagesDataSet'
import Model            from './components/MainComponents//Models-SubComponent/Model'
import DataSet          from './components/MainComponents/DataSet'
import BluePrintPage    from './components/MainComponents/BluePrintPage'
import PredictionPage   from './components/MainComponents/PredictionPage'
import LabelTreeComponent from './components/MainComponents/LabelTreeComponent'
import AllModels        from './components/MainComponents/AllModels'
import CategoryAndRelationship from './components/CategoryAndRelationship'

import { store } from './store/VuexStore'

import { userService } from './dao/services';

Vue.use(VueRouter);

const routes = [
    //Home Page
    { path: '/', component: Dashboard },
    //Dashboard
    { path: '/Dashboard', component: Dashboard },
    //Project
    { path: '/Projects', component: Projects },
    //Setting
    { path: '/Setting', component: Setting },
    //Category And Realtionship
    { path: '/CategoryAndRealtionship', component: CategoryAndRelationship },
    //Individual Project
    { path: '/Projects/:user_id', component: ProjectComponent },
    //Individual Dataset
    { path: '/Projects/:user_id/datasets/:dataset_id', component: DataSet },
    //Dataset Images
    { path: '/Projects/:user_id/datasets/:dataset_id/images', component: AllImagesDataSet },
    //Indivdual BluePrint of Dataset
    { path: '/Projects/:user_id/datasets/:dataset_id/Blueprint/:blueprint_id' , component: BluePrintPage },
    //Label Tree
    { path: '/Projects/:user_id/labeltree', component: LabelTreeComponent },
    //Individual Model through Project Page
    { path: '/Projects/:user_id/models/:model_id', component: Model },
    //Individual Model through Model List Page
    { path: '/Projects/:user_id/AllModels/models/:model_id', component: Model },
    //Individual BluePrint of Model
    { path: '/projects/:user_id/models/:model_id/Blueprint/:blueprint_id' , component: BluePrintPage },
    //Individual Prediction of Model
    { path: '/projects/:user_id/models/:model_id/prediction/:blueprint_id' , component: PredictionPage },
    //BluePrint of Old Model
    { path: '/Projects/:user_id/models/:model_id/old_version/:id_olderversion' , component: Model },
    //Individual BluePrint of Old Model
    { path: '/Projects/:user_id/models/:model_id/old_version/:id_olderversion/Blueprint/:blueprint_id' , component: BluePrintPage },
    //Individual Prediction of Old Model
    { path: '/Projects/:user_id/models/:model_id/old_version/:id_olderversion/prediction/:blueprint_id' , component: PredictionPage },
    //All Models
    { path: '/Projects/:user_id/allmodels', component: AllModels }

];

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
    userService.checkLogin()
        .then((value) => {
            console.log('VALID TOKEN');
            store.commit('loginStatusTrue');
            next()
        })
        .catch((error) => {
            console.error('INVALID TOKEN');
            store.commit('loginStatusFalse');
            next()
        });
});

router.beforeResolve((to, from, next) => {
    store.commit('loadingFalse');
    next()
});

new Vue({
    el: '#app',
    store: store,
    router,
    render: h => h(App)
});
