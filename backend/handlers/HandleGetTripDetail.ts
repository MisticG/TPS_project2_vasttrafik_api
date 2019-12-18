export default async function getTripDetail(req, res, axios, token){

    let data = req.body;
    console.log(data,'here is trip details' )
   
    try {
        //We get current journy
        let response = await axios.get(data.ref, {
            headers: {
            Authorization: `Bearer ${token}`,
            }})


        let awaitResponse = await response.data
        response.status === 200 ? awaitResponse: [];
        let journeyDetail = awaitResponse.JourneyDetail.Stop
        console.log(journeyDetail.length)
        typeof awaitResponse.errorText === undefined ? res.json([]):res.json(journeyDetail)
        
    } catch(error) {
        res.json([]);
        console.log('Something went wrong during getting current trip', error)
    }

}