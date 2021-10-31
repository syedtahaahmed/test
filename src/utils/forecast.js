const request=require('request')
const forecast=(latitude,longitude,callback)=>{
const url='http://api.weatherstack.com/current?access_key=90c5f95b704a77606966e44b233e5043&query='+latitude+','+longitude+'&units=m'
    request({url,json:true},(error,{body})=>{
    if(error){
    callback("unable to connect to weather stack api",undefined)
    }
    else if(body.error){
    callback("unable to find location",undefined)
    }
    else{
    callback(undefined,body)
    }

})
}

module.exports=forecast;