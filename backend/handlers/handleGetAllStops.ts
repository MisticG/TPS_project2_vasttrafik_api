
export default async function getAllStops(fileSytem,res){

    fileSytem.readFile('allLocation.json',(error, data)=>{
        if(error){
            console.log(error)
        }

        let dataParse = JSON.parse(data);
        if(dataParse.length !== undefined && dataParse.length > 0) {

            let stationWithoutTrackes = dataParse.filter((station)=>{
                if(station.track === undefined) {
                    return station
                }
            }).map((station)=>{
                
                return station 
            })
            console.log(stationWithoutTrackes.length, 'here is length')
    
            res.json(stationWithoutTrackes)
        }
    })

} 