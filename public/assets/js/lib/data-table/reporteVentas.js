
   var derivers = $.pivotUtilities.derivers;
   var renderers = $.extend($.pivotUtilities.renderers,
       $.pivotUtilities.c3_renderers);
    $.getJSON("https://pivottable.js.org/examples/mps.json", function(mps) {
        $("#output").pivotUI(mps, {
        
            rows: ["Province"],
            cols: ["Party"],
            aggregatorName: "Integer Sum",
            vals: ["Age"],
            rendererName: "Heatmap",
            rendererOptions: {
                table: {
                    clickCallback: function(e, value, filters, pivotData){
                        var names = [];
                        pivotData.forEachMatchingRecord(filters,
                        function(record){ names.push(record.Name); });
                        alert(names.join("\n"));
                    }
                }
            }
        },false,"es");
    });
