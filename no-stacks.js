
function Feature(object){
    for(property in object){
        this[property] = object[property]
    }
    
    
    this.relation_lists = [];
    
    this.decorate_feature = function(decoration,filter_function,feature_list){
        for(feature of feature_list){
            if(filter_function(this,feature)){
                this[decoration] = feature.id
            }
        }
    }
}

exports.Feature = Feature
