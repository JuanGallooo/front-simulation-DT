import Axios from 'axios'

const DEV_URL = 'http://localhost:8081/simulation';

const axios= Axios.create({
    baseURL: DEV_URL
});

export default axios

const BASE_ROUTES={
    buses:"/buses",
    lines:"/lines",
    projects:"/projects",
    dataSorce:"/datasource",
    simulation:"/simulation",
    variables:"/variables",
    stops:"/stops",
    clock:"/clock"
}



/**
* List all items
* @return {Promise}
*/
function getAll(){
    return axios.get(this.baseRoute);
}
/**
* Retrieve a single item
* @param {numbre} id
* @return {Promise}
*/
function get(id){
    return axios.get(this.baseRoute+"/"+id);
}

/**
* Update an item
* @param {numbre} id the id of the item
* @param {Object} itemInfo the new Item information
*/

function put(id, itemInfo){
  return axios.put(this.baseRoute+"/"+id, itemInfo);
}
//axios.request({url: this.baseRoute+url, method, data, params});

/**
* Make request
* @param {String} url
* @param {String} method HTTP METHOD
* @param {object} data
* @param {obect} params URL params
* @return {Promise}
*/
function request(url, method="get", data={}, params={}){
    return axios.request({url: this.baseRoute+url, method, data, params});
}


function externalRequest(url, method="get", data={}, params={}){
    return axios.request({url:url, method, data, params});
}


/**
* Create new item
* @param {Object} itemInfo the new Item
* @return {Promise}
*/
function post(id,itemInfo, headers){
    return axios.post(this.baseRoute+"/"+id, itemInfo, headers );
}
// function post(id,itemInfo){
//   return axios.post(this.baseRoute+"/"+id, itemInfo);
// }

/**
* Remove an item
* @param {number} id
* @return {Promise}
*/
function remove(id){
    return axios.delete(this.baseRoute+"/"+id);
}


export  class Api{
    constructor(baseRoute){
        this.baseRoute = baseRoute;
    }
    static ROUTES(){
        return BASE_ROUTES;
    }
}

Api.prototype.getAll = getAll;
Api.prototype.get = get;
Api.prototype.put= put;
Api.prototype.remove = remove;
Api.prototype.request = request;
