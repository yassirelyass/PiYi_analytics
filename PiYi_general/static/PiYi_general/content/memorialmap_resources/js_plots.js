            function returnPlotMarker(json, latlng){
                var att = json.properties;
                arPlotIDs.push(att.id.toString());
                
                return L.marker(latlng, {icon: L.AwesomeMarkers.icon({icon: 'star', markerColor: 'white', prefix: 'fa', iconColor: 'black'}) }).addTo(mymap).bindTooltip("<h4>Plot: "+att.id+"</h4>Name: "+att.first_name+" "+att.last_name);
            }

            
            function findPlot(val){
                returnLayerByAttribute("plot",'plot_number',val, function(lyr){
                    
                    if (lyr) {
//                        lyr.setIcon(L.AwesomeMarkers.icon({icon: 'star', markerColor: 'black', prefix: 'fa', iconColor: 'white'}));
//                        
//                        lyr.addTo(mymap);
                        
                        if (lyrSearch) {
                            lyrSearch.remove();
                        }

                        lyrSearch = L.circle(lyr.getLatLng(), {radius:5, color:'red', weight:10, opacity:0.5, fillOpacity:0}).addTo(mymap);
                        
                        mymap.setView(lyr.getLatLng(), 20);
                        
                        var att = lyr.feature.properties;
                        
                        $("#plot_first_name").val(att.model_pic);
//                        $("#plot_first_name").val(att.first_name);
                        $("#plot_last_name").val(att.last_name);
                        
                        $("#plotMetadata").html("Born on "+att.birth_date+" in "+att.country_of_birth+"<br> Died on "+att.death_date+" in "+att.country_of_death+"<img src='mediafiles/"+att.model_pic+"' alt='"+att.last_name+"' width='500' height='600'>");
                        
                        $("#formPlot").show();
                        
                        $("#divPlotError").html("");

                        $("#btnPlotSurveys").show();
                     } else {
                        $("#divPlotError").html("**** Plot ID not found ****");
                    }
                });
                
            }

            function findPlotLnames(val){
                returnLayerByAttribute("plot",'last_name',val, function(lyr){
                    if (lyr) {
//                        lyr.setIcon(L.AwesomeMarkers.icon({icon: 'star', markerColor: 'black', prefix: 'fa', iconColor: 'white'}));
//                        
//                        lyr.addTo(mymap);
                        
                        if (lyrSearch) {
                            lyrSearch.remove();
                        }

                        lyrSearch = L.circle(lyr.getLatLng(), {radius:5, color:'red', weight:10, opacity:0.5, fillOpacity:0}).addTo(mymap);
                        
                        mymap.setView(lyr.getLatLng(), 20);
                        
                        var att = lyr.feature.properties;
                        
                        $("#plotMetadataLnamesPic").html("<img class='rounded center-block' src='media/"+att.model_pic+"' alt='"+att.last_name+"' width='180' height='180'>");
                        
                        $("#plot_first_nameLnames").val(att.first_name);
                        $("#plot_last_nameLnames").val(att.last_name);
                        
//                        $("#plotMetadataLnames").html("Born on "+att.birth_date+" in "+att.country_of_birth+"<br> Died on "+att.death_date+" in "+att.country_of_death);
                        
                         $("#plotMetadataLnames").html("Plot# "+att.plot_number+"<br>Born on "+att.birth_date+" in "+att.country_of_birth+"<br> Died on "+att.death_date+" in "+att.country_of_death);
                        
                        $("#formPlotLnames").show();
                        
                        $("#divPlotErrorLnames").html("");

                        $("#btnPlotSurveys").show();
                     } else {
                        $("#divPlotErrorLnames").html("**** Plot ID not found ****");
                    }
                });
                
            }

            
            function refreshPlots(whr) {
                if (whr) {
                    var objData = {tbl:'plot', flds:"id, first_name, last_name", where:whr};
                } else {
                    var objData = {tbl:'plot', flds:"id, first_name, last_name"};
                }
                $.ajax({
//                    url: 'load_data',
                    url: 'http://127.0.0.1:8000/load_data',
//                    url:'{% url "memorialmap:load_data" %}',
                    data: objData,
                    type: 'POST',
                    success: function(response){
                        if (JSON.stringify(response).substring(0,5)=="ERROR"){
                            alert(JSON.stringify(response));
                        } else {
                            arPlotIDs=[];
                            jsnPlots = response;
                            if (lyrPlots) {
                                ctlLayers.removeLayer(lyrPlots);
                                lyrPlots.remove();
                            }
//                            alert(JSON.stringify(response));
                            lyrPlots = L.geoJSON(jsnPlots, {pointToLayer:returnPlotMarker, onEachFeature: function(feature, layer) {
                                layer.on({
                                        click: function(e){
                                            val = e.target.feature.properties.last_name;
                                            findPlotLnames(val)
                                        }
                                    });
                            }}).addTo(mymap);
                            ctlLayers.addOverlay(lyrPlots, "Plots");
                            arPlotIDs.sort(function(a,b){return a-b});
                            $("#txtFindPlot").autocomplete({
                                source:arPlotIDs
                            });
                        }
                    }, 
                    error: function(xhr, status, error){
                        alert("ajax failure");
	                    alert("ERROR Reffreshing plots: "+error);
                    } 
                });
            }
            
