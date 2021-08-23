import {insertValuesInString} from '../util';

export class ClassService {

    constructor(http){
        this.http = http;
    }

    getCollection(projectId) {

        let params = {
            projectId: projectId
        };

        let path = '/v1/projects/{projectId}/class';
        path = insertValuesInString(path, params);

        return this.http.get(path);

    }

    getOneById(projectId, classId) {

        let params = {
            projectId: projectId,
            classId: classId
        };

        let path = '/v1/projects/{projectId}/class/{classId}';
        path = insertValuesInString(path, params);

        return this.http.get(path);

    }

}
