export default async function getTripDetail(req, res, axios){

    let data = req.body;
    console.log(data,'here' )
   
    try {
        //We get current journy
        let response = await axios.get(data.ref, {
            headers: {
            Authorization: `Bearer ${res.locals.token}`,
            }})


        let awaitResponse = await response.data
        response.status === 200 ? awaitResponse: [];
        console.log(awaitResponse)
        typeof awaitResponse.errorText === undefined ? res.json([]):res.json(awaitResponse)
        
    } catch(error) {
        res.json([]);
        console.log('Something went wrong during getting current trip', error)
    }

}