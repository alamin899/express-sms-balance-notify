const readyPayload = (data) => {
    
    return {
  
        "attachments":[
           {
              "fallback":"Available SMS Balance",
              "pretext":"Available SMS Balance",
              "color":"#D00000",
              "fields":data.map(item => ({
                  "title": item.label,
                  "value": item.balance,
                  "short": false
             }))
           }
        ]
     }
    };

module.exports = {readyPayload };