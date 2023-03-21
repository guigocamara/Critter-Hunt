const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.createToken = function ( us, pa, fa )
{
    return _createToken( us, pa, fa );
}
_createToken = function ( us, pa, fa )
{
    try
    {
      const expiration = new Date();
      const user = {username:us, password:pa, favorite:fa};
      const accessToken =  jwt.sign( user, process.env.ACCESS_TOKEN_SECRET);
      // In order to exoire with a value other than the default, use the 
       // following
      /*
      const accessToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, 
         { expiresIn: '30m'} );
                       '24h'
                      '365d'
      */
      var ret = {accessToken:accessToken, us:us, pa:pa, fa:fa};
    }
    catch(e)
    {
      var ret = {error:e.message};
    }
    return ret;
}
exports.isExpired = function( token )
{
   var isError = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET, 
     (err, verifiedJwt) =>
   {
     if( err )
     {
       return true;
     }
     else
     {
       return false;
     }
   });
   return isError;
}
exports.refresh = function( token )
{
  var ud = jwt.decode(token,{complete:true});
  var username = ud.payload.us;
  var password = ud.payload.pa;
  var favorite = ud.payload.FA;
  return _createToken( username, password, favorite );
}