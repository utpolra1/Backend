const globalError = (err,_req,res,_next) => {

    // format Error
    res.status(err.status || 500).json({
       message: err.message,
       errors: err.errors,
     });
};

module.exports = globalError;