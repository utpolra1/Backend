const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const globalError = require('./src/utils/globalError');
const connectDB = require('./src/db/connectDB');
const sampleRoute = require('./src/router/sampleRoutes');
const userRoute = require('./src/router/userRouter');
const port = process.env.PORT || 7000;

//middleare
app.use(cors({
    origin:['https://e-commerce-project-batch9.web.app','http://localhost:5173'],
    credentials:true
  }));
  app.use(express.json());

// **User POST
app.use('/api', userRoute);

//**{GET, GETonID, POST, PUT/PATCH, DELETE}**
app.use('/api', sampleRoute);


app.get('/', (req, res) => {
    res.send('Server site runing...........😍🐤')
});

// handling all (get,post,update,delete.....) unhandled routes
app.all('*',(req,res,next)=>{
    const error =new Error(`Cannot find URL [${req.originalUrl}] on server. Maybe it's not the right URL`)
  
    error.status=404;
    next(error);
  
});
app.use(globalError);

const main = async()=>{
    await connectDB();
    console.log("You have successfully connected to the database.....");
    app.listen(port, () => {
      console.log(`server listening on port runing.....${port}`)
    });
  }
  main();
  