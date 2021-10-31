const path=require('path')
const express=require('express')
const hbs=require('hbs')

const forecast =require('./utils/forecast.js')
const geocode=require('./utils/geocode.js')
const { error } = require('console')
console.log(__dirname)
public_dir_path= (path.join(__dirname,'../../node_modules/public'))
const viewspath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')
console.log(partialpath)


const app=express()
app.set('view engine','hbs')
app.set('views',viewspath)
 
hbs.registerPartials(partialpath)

app.use(express.static(public_dir_path))
app.get('',(req,res)=>{
    res.render('index',{
        title:"hbs dynamic",
        name:"syed taha ahmed"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name:"syed taha ahmed",
        title:"help from app.js",
        name:"help  name"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:"syed taha ahmed",
        title:"about the author about"
    })
})
 
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"must provide a address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        forecast(latitude,longitude,(error,body)=>{
            res.send({
                forecast:"hot",
                address:req.query.address,
                latitude,
                longitude,
                body
            })

        })
   

    })
    // res.send({
    //     forecast:"hot",
    //     address:req.query.address
    // })

        })

app.get('/products',(req,res)=>{
    if(!req.query.search){
         return res.send({
            error:"must provide a search term"
        })
    }
    console.log( req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'syed taha',
        error:'found error in help  article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'syed taha',
        error:'page not found'
    })
})
app.listen(3000,()=>{
    console.log("hello server is up")
})