
export default async function getAllStops(fileSytem,res){

    fileSytem.readFile('allLocation.json',(error, data)=>{
        if(error){
            console.log(error)
        }

        let dataParse = JSON.parse(data)
        res.json(dataParse)
    })

} 