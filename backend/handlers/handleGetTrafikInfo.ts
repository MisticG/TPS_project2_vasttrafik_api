
export default async function getTrafikInfo(req, res, axios){
    
    let data = req.body;
    console.log(data);
    let url = `https://api.vasttrafik.se/bin/rest.exe/v2/departureBoard?id=${data.id}&date=${data.date}&time=${data.time}&format=json`;
    try {
        //We get current journy
        let response = await axios.get(url, {
            headers: {
            Authorization: `Bearer ${res.locals.token}`,
            }})

 
        let awaitResponse = await response.data;
      
        let dat = response.status === 200 ? awaitResponse.DepartureBoard.Departure: [];
        console.log(dat.length, 'here is response')
        //journeyNumber
        let specefikTrafikInfo = renderSpecefikTrafikInfo(dat, data.journeyNumber);
       
        typeof awaitResponse.errorText === undefined && dat=== undefined ? res.json([]):res.json(specefikTrafikInfo)
        
    } catch(error) {
        res.json([]);
        console.log('Something went wrong during getting current trip', error)
    }


}

function renderSpecefikTrafikInfo(data, journeyNumber){
    if(data.length > 0){
    let speceficInfo = data.filter(( trip ) => {
            if( trip.journeyNumber === journeyNumber ) {
                return trip
            }

        }).map(( trip ) => {
            return trip
        })
        
    return speceficInfo[0].rtTime !== undefined?speceficInfo: [];
    }
}
