import axios from 'axios';
import { netloc } from './util';

import { ProjectService } from './services/projectService'
import { UserService } from './services/userService';
import { ClassService } from './services/classService';
import { DatasetService } from './services/datasetService';
import { ModelService } from './services/modelService';


let http = axios.create({
    withCredentials: true,
    baseURL: netloc
});

// Uncomment to only use data portion of response
// http.interceptors.response.use(response => response.data);

export let projectService = new ProjectService(http);
export let userService = new UserService(http);
export let classService = new ClassService(http);
export let datasetService = new DatasetService(http);
export let modelService = new ModelService(http);
