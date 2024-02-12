function parseId(url){
    var parts = url.split("-");
    var id = parts[1].split(".")[0];
    return id;

}
const prepareObject =  (obj) => {
    const id = parseId(obj.link);
    delete obj.link;
    obj._id = id;
    if (obj.pageImages.length >1){
        obj.images = obj.pageImages;
    }else{
        obj.images = [];
    }
    return obj;
};
module.exports = prepareObject;