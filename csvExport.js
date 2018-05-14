// Plugin definition.
$.fn.csvExport = function( options ) {
	var obj = this;
	if($(obj).find('tbody tr').length==0){
		return;
	}
	var fileName;
	if(options == undefined || options.fileName == undefined){
		fileName = 'exportedCsv.csv';
	}else{
		fileName = options.fileName;
	}
	var data=[];
	var csvContent = '';
	$(obj).find('thead tr').each(function(index,element){	   
	var arr = [];
		$(element).find('th').each(function(i,e){
			var colspan = $(this).attr('colspan');
			if(colspan==undefined){
				arr.push($(this).text());
	        }else{
				for(var i=0;i<colspan;i++){
					arr.push($(this).text());
	            }
	        }
	    });
	data.push("\"" + arr.join("\",\"") + "\"");
	});
	$(obj).find('tbody tr').each(function(index,element){	   
	var arr = [];
		$(element).find('td').each(function(i,e){
			arr.push($(this).text());
	    });
	data.push("\"" + arr.join("\",\"") + "\"");
	});
	data.forEach(function(infoArray, index){

	   dataString = infoArray;
	   csvContent += index < data.length ? dataString+ "\n" : dataString;

	});
    var csvFile;
    var downloadLink;

    // CSV FILE
    csvFile = new Blob([csvContent], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = fileName;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    // Lanzamos
    downloadLink.click();
};