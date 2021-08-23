export class UserService {

    constructor(http){
        this.http = http;
    }

    login(user) {

        let path = '/v1/login';

        return this.http.post(path, null, {params: user});

    }

    //This is not implemented in the backend but should check if use has a valid cookie
    checkLogin() {

        let path = '/v1/projects';

        return this.http.get(path);

    }

    getCollection(){
        let path = '/v1/user';
        return this.http.get(path)
    }

    logout() {

        let path = '/v1/logout';

        return this.http.post(path);

    }

}
