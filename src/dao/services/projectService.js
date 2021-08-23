import { insertValuesInString } from '../util';

export class ProjectService {

    constructor(http){
        this.http = http;
    }

    getCollection(p) {

        let path = '/v1/projects';

        let prams = p ? p : null;

        return this.http.get(path, p);

    }

    getOneById(projectId) {

        let params = {
            projectId: projectId
        };
        console.log("GetOneID : ", projectId)

        let path = '/v1/projects/{projectId}';
        path = insertValuesInString(path, params);

        return this.http.get(path);
    }
}


/* getCollection({sort_by: 'name', order: 'decent'}) */