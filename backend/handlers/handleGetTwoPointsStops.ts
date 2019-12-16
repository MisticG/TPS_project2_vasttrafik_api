
export default async function getTwoPointStops(req, res, axios){
    
    let data = req.body;
    console.log(data);
    let url = `https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=${data.originId}&destId=${data.destId}&time=${data.time}&searchForArrival=${data.isDepOrArrTime}&date=${data.date}&needJourneyDetail=1&format=json`;
    try {
        //We get current journy
        let response = await axios.get(url, {
            headers: {
            Authorization: `Bearer ${res.locals.token}`,
            }})

 
        let awaitResponse = await response.data;
      
        response.status === 200 ? awaitResponse: [];
        //console.log(response)
        let trips = awaitResponse.TripList.Trip;
        //console.log(response);
        console.log(trips, 'here')
        typeof awaitResponse.errorText === undefined || trips === undefined ? res.json([]):res.json(trips)
        
    } catch(error) {
        res.json([]);
        console.log('Something went wrong during getting current trip', error)
    }


}

async function axiosRequest (axios, url, res){
    let response = await axios.get(url, {
        headers: {
        Authorization: `Bearer ${res.locals.token}`,
        }})

    let awaitResponse = await response.data;
    return await awaitResponse; 
}

async function getTripsWithDetails(trips, axios, res){
    let test = []
    let f = await trips.filter((trip)=> {
            return  trip.Leg.filter((leg) => {
            if(leg.JourneyDetailRef && leg.JourneyDetailRef !== undefined) {

                axiosRequest(axios, leg.JourneyDetailRef.ref, res).then((details)=>{
                    leg.details = details.JourneyDetail
                    test.push(leg)
                }).then(()=>{
                    console.log(test)

                })
                
            }
        
        })
    })
    let tr = await test
    console.log(tr)
    return tr
    
}

/* 
//1departureBoard uses id from all locations and return the next 20 stops by giving time  
This method will return the next 20 departures (or less if not existing) from a given point
    in time or the next departures in a given timespan. The service can only be called for stops/stations
    by using according ID retrieved by the location method. The parameter is called id. The time and date
    are defined with the parameters date and time.


//2journyDetail arrival times can not be called directly
//3 /trip from which time a bus will leave
*/