export default async function getTwoPointStops(req, res, axios, token){
    
    let data = req.body;
    console.log(data);
    let url:string = ''
    if(data.useBoat === 0 
    && data.useBus === 0 
    && data.useElse === 0 
    && data.useTram === 0
     ) {
        url = `https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=${data.originId}&destId=${data.destId}&time=${data.time}&searchForArrival=${data.isDepOrArrTime}&date=${data.date}&numTrips=4&needJourneyDetail=1&format=json`;
     } else {
         url =  url = `https://api.vasttrafik.se/bin/rest.exe/v2/trip?originId=${data.originId}&destId=${data.destId}&time=${data.time}&searchForArrival=${data.isDepOrArrTime}&date=${data.date}&useBus=${data.useBus}&useBoat=${data.useBoat}&useVas=${data.useVas}&useTram=${data.useTram}&useRegTrain=${data.useElse}&useLDTrain=${data.useElse}&numTrips=4&needJourneyDetail=1&format=json`;
     }

    try {
        //We get current journy
        let response = await axios.get(url, {
            headers: {
            Authorization: `Bearer ${token}`,
            }})

 
        let awaitResponse = await response.data;
      
        let dat = response.status === 200 ? awaitResponse: [];
     
        let trips = dat.TripList.Trip;
     
        console.log(trips.length, 'here i trip data')
        typeof awaitResponse.errorText === undefined || trips === undefined ? res.json([]):res.json(trips)
        
    } catch(error) {
        res.json([]);
        console.log('Something went wrong during getting current trip', error)
    }


}
