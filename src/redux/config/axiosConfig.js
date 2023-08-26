import axios from "axios";

//base url of Inventory Portal uat
const httpInstance=axios.create({
    baseURL:'http://20.219.104.23:4040/v1'
})
export default httpInstance;