
const ESClient = require('../../server/esclient');




const getAllindices = async () => {
   let resp=  await new ESClient().client().indices.get({
        index: "*"
    });

    
        if (!resp){
            return new Error("Get all Indices Error");
        }
        else{
            console.log(resp)
            return resp;
        }
    
}


module.exports = {
    getAllindices
};