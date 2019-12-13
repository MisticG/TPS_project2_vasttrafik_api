
export default async function getTwoPointStops(req, res, axios){
    
    let data = req.body;
   
    let url = `https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=${data.originId}&destId=${data.destId}&time=${data.time}&date=${data.date}&format=json&searchForArrival=${data.isDepOrArrTime}`;
    try {
        //We get current journy
        let response = await axios.get(url, {
            headers: {
            Authorization: `Bearer ${res.locals.token}`,
            }})
        let awaitResponse = await response.data;
         let trip = awaitResponse.TripList.Trip;
        if(trip.length > 0) {
            
            let journyDetailUrl = trip[0].Leg[0].JourneyDetailRef.ref;
            console.log(journyDetailUrl)
            let responseJourneyDetail = await axios.get(journyDetailUrl, {
                headers: {
                Authorization: `Bearer ${res.locals.token}`,
                }})
            let awaitResponse = await responseJourneyDetail.data;
            console.log(awaitResponse.JourneyDetail.Stop.length, 'allstops')
            
        }
        res.json(trip)
    
    }catch(error){
        res.json([]);
        console.log('Something went wrong during getting current trip')
    }


    //1departureBoard uses id from all locations and return the next 20 stops by giving time
    /* 
    This method will return the next 20 departures (or less if not existing) from a given point
     in time or the next departures in a given timespan. The service can only be called for stops/stations
      by using according ID retrieved by the location method. The parameter is called id. The time and date
       are defined with the parameters date and time.
    
    */
    //2journyDetail arrival times can not be called directly
    //3 /trip from which time a bus will leave


}