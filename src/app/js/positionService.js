angular.module( "RentApp" )
.service( "PositionService", function( $http )
{
	this.zmwsId = "X1-ZWz199m9tw1rez_3pg0i";
	this.zpids = [3874355, 2100595411, 87718017, 87707655, 87693778, 60270592, 60203847, 62013380, 60270091, 2112604850];

	this.getRentalHousing = function( zpid )
	{
		return $http.get( "https://apizillow.herokuapp.com/zillow-api?url=GetZestimate.htm&zws-id=" + this.zmwsId + "&rentzestimate=true&zpid=" + zpid );
	}

	this.getCrimes = function()
	{
		return $http.get( "https://data.cityofchicago.org/api/views/ijzp-q8t2/rows.json?accessType=DOWNLOAD&method=getByIds&asHashes=true&start=0&length=200" );
	}

	this.getPoliceStations = function()
	{
		return $http.get( "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json" );
	}

	this.getParks = function()
	{
		return $http.get( "https://data.cityofchicago.org/api/views/y7qa-tvqx/rows.json" );
	}

	this.getGroceryStores = function()
	{
		return $http.get( "https://data.cityofchicago.org/api/views/53t8-wyrc/rows.json" );
	}
} );