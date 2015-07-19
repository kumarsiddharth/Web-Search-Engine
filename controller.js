//import urllib


angular.module('search',[]).controller('searchController',function($scope,$http)
{
	$scope.query="Enter text to search";
	$scope.getUrlResult = function() {
		//var url = "http://www.w3schools.com/angular/"+$scope.query+".php";
		var url = "http://localhost:8080/MaritimeCrawler/maritimerepo/fetchDocId/"+$scope.query;
		$http.get(url).success(function(response) {
			$scope.names = response.response.hits;
		}).error(function(response) {
			$scope.errorMessage = "Sorry, No records available"
		});
	};
	$scope.submitForm = function()
	{
		qid = document.getElementById('queryID').value;
	
		var delurl = "http://localhost:9200/ap_dataset/document/_search?queryid="+qid+"&size=200";
		$http.delete(delurl).
		success(function(response) {
		}).
		error(function(data, status, headers, config) {
			$scope.query = "delete Error ";
		});

		
		for(j=0;j<200;j++)
		{
			var url = "http://localhost:9200/ap_dataset/document/";
			var radios = document.getElementsByName('url'+j);
			var id = document.getElementById('id'+j).innerHTML;

			//alert(radios.length + " "+j);
			for (var i = 0, length = radios.length; i < length; i++) 
			{
				if (radios[i].checked) 
				{
		        	// do whatever you want with the checked radio
		        	json = "{\"id\":\"" +id+"\",\"grade\":\""+(radios[i].value) +"\",\"queryid\":\""+qid+"\"}";	

		        	$http.post(url,json).
		        	success(function(data, status, headers, config) {
		        	}).
		        	error(function(data, status, headers, config) {
		        		$scope.query = "Error ";
		        	});
		        	break;
		        }
		    }
		}

	};
	$scope.extractUrlContent = function(url)
	{
		var content = ""
        $http.get("http://localhost:8080/JSoupRestAPIService/jsoup-api/jsoupapi/"+url).success(function(response) {
			var myWindow = popupwindow("", "Web Page Content", 1000, 500);
        	myWindow.document.write("<h1>Web Page : <a href="+url+" style='text-decoration:none;font-size:16px;color:green'>"+url+"</a></h1>");
        	content = response.text;
        	myWindow.document.write("<p>"+content+"</p>");
		}).error(function(response) {
			$scope.query = "Sorry, No records available"
		});
	};
	$scope.countSelected = function()
	{
		var c=0;
		for(j=0;j<200;j++)
		{
			var radios = document.getElementsByName('url'+j);
			for (var i = 0, length = radios.length; i < length; i++) 
			{
				if (radios[i].checked) 
				{
		        	c=c+1;
		        }
		    }
		}
		$scope.count=c;
	};
});


function popupwindow(url, title, w, h) {
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
} 








