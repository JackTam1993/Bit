import 'whatwg-fetch';

const Api = {
  async getMarketHistory(count) {
    try {
      let query = await fetch('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22https%3A%2F%2Fc-cex.com%2Ft%2Fapi_pub.html%3Fa%3Dgetmarkethistory%26market%3Dbtc-usd%26count%3D'+ count +'%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',{
        mode:'cors'
      })
        .then(function(response) {
          return response.json()
        });
      return query;
    } catch (err){
      console.log(err)
    }
  }
};

export { Api };



