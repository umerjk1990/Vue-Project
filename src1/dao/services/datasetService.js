import { insertValuesInString } from '../util';

export class DatasetService {

    constructor(http){
        this.http = http;
    }
    
    getCollection(projectId) {

        let params = {
            projectId: projectId
        };

        let path = '/v1/projects/{projectId}/datasets';
        path = insertValuesInString(path, params);

        return this.http.get(path);

    }

    getOneById(projectId, datasetId) {

        let params = {
            projectId: projectId,
            datasetId: datasetId
        };

        let path = '/v1/projects/{projectId}/datasets/{datasetId}';
        path = insertValuesInString(path, params);

        return this.http.get(path);

    }

}
