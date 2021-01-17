function explodeMulti(jsnMulti){
    if (jsnMulti.type.substring(0,5)!="Multi"){
        alert("Geometry is not Multipart");
    } else {
        var features = [];
        var type = jsnMulti.type.substring(5)
        for (var i=0;i<jsnMulti.coordinates.length;i++){
            var feature = {type: type, coordinates:jsnMulti.coordinates[i]};
            features.push(feature);
        }
        return features;
    }
}

function mergeLyrEdit(lyrEdit){
    var jsnEdited = lyrEdit.toGeoJSON();
    var arCoordinates = [];
    var type = "Multi"+jsnEdited.features[0].geometry.type;
    for (var i=0;i<jsnEdited.features.length;i++){
        var coordinates = jsnEdited.features[i].geometry.coordinates;
        arCoordinates.push(coordinates);
    }
    return {type:type, coordinates:arCoordinates};
}

function insertRecord(jsn, callback){
    delete jsn.id;
    $.ajax({
        url:'insert_record',
        data:jsn,
        type:'POST',
        success: function(response){
            if(JSON.stringify(response).substring(0,5)=="ERROR"){
                alert(JSON.stringify(response))
            } else{
                alert("New record added to "+jsn.tbl);
                callback();
            }
        },
        error: function(xhr,status,error){
            alert("AJAX error: "+error);
        }
    });
}

function updateRecord(jsn, callback){
    $.ajax({
        url:'update_record',
        data:jsn,
        type:'POST',
        success: function(response){
            if(JSON.stringify(response).substring(0,5)=="ERROR"){
                alert(JSON.stringify(response))
            } else{
                alert("Record "+jsn.id+" in "+jsn.tbl+" updated");
                callback();
            }
        },
        error: function(xhr,status,error){
            alert("AJAX error: "+error);
        }
    });
}

function deleteRecord(tbl,id, callback){
    $.ajax({
        url:'delete_record',
        data:{tbl:tbl, id:id},
        type:'POST',
        success: function(response){
            if(JSON.stringify(response).substring(0,5)=="ERROR"){
                alert(JSON.stringify(response))
            } else{
                alert("Record "+id+" deleted from "+tbl);
                callback();                            
            }
        },
        error: function(xhr,status,error){
            alert("AJAX error: "+error);
        }
    });
}
            
            
            