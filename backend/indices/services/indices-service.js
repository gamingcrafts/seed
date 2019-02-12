
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

const getOneIndex =async indexName=>{
    //Need to replace this with another method that gets properties of a single index.
    let resp=  await new ESClient().client().indices.get({
        index: "*"
    });
    
    
        if (!resp){
            return new Error("Get all Indices Error");
        }
        else{
            
            return resp[indexName];
        }
}


module.exports = {
    getAllindices,
    getOneIndex
};