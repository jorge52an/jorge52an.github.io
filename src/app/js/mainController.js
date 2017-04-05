angular.module( "RentApp" )
.controller( "MainController", function( $scope, NgMap, PositionService )
{
	$scope.initialPosition = [41.8708, -87.6505];
	$scope.actualPosition = new google.maps.LatLng( $scope.initialPosition[0], $scope.initialPosition[1] );

	NgMap.getMap().then( function( map )
	{
		$scope.map = map;
		$scope.setCenter();
		$scope.showAffordableRentalHousing();
	} );

	$scope.setCenter = function()
	{
		var title = "Department of Computer Science - University of Illinois, Chicago";
		$scope.map.setCenter( $scope.actualPosition );

		$scope.addMarker( "", $scope.initialPosition[0], $scope.initialPosition[1], title );
	}

	$scope.addMarker = function( label, latitude, longitude, title )
	{
		var position = new google.maps.LatLng( latitude, longitude );

		var marker = new google.maps.Marker(
		{
			position: position,
			label: label,
			animation: google.maps.Animation.DROP,
			map: $scope.map,
			title: title
		} );

		var infoWindow = new google.maps.InfoWindow( 
		{
			content: title
		} );

		marker.addListener( "click", function()
		{
			infoWindow.open( $scope.map, marker );
		} );
	}

	$scope.showAffordableRentalHousing = function()
	{
		PositionService.getAffordableRentalHousing().then( function( response )
		{
			var data = response.data.data;
			for( var i = 0; i < data.length; ++i )
			{
				if( data[i][19] > 41.857057 && data[i][19] < 41.897574 &&
					data[i][20] > -87.686785 && data[i][20] < -87.616983 )
					$scope.addMarker( "A", data[i][19], data[i][20], data[i][12] );
			}
		} )
		.catch( function( response )
		{
			console.log( "Error" );
		} );
	}
} );