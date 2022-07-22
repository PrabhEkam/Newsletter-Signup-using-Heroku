const express=require('express');
const request=require('request')
const bodyParser=require('body-parser');
const app= express();
const https=require('https');
const { post } = require('request');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function (req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post('/',function(req,res){
    const firstName=req.body.fName;
    const lastName=req.body.lName; 
    const email=req.body.email;
var data={
    members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName,
            }
        }
    ]
}


var url="https://us2023.api.mailchimp.com/3.0/lists/f9c640";
const options={
    method:"POST",
    auth:"prabhekamsingh:73e0105c7ff14cd4092e96ccf66db196-us17"

}
var jsonData=JSON.stringify(data)
    console.log(firstName, lastName, email);

  const request=https.request(url ,options,function(response){
    
    if (response.statusCode===200)
    {res.sendFile(__dirname+"/success.html");}
    else {
        res.sendFile(__dirname+"/failure.html");
    }
    
    response.on("data",function(data){
            console.log(JSON.parse(data));
        })
        
    });
request.write(jsonData);
request.end();
})
app.post('/failure',function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT||3000,function(){console.log('server is runing on port 3000')});
