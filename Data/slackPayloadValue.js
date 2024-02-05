const readyPayload = (data) => {
    const phone = data && data.phone ? data.phone : "01700000000";
    const message = data && data.message ? data.message : "Test message";

    return {
  
        "attachments":[
           {
              "fallback":"Available SMS Balance",
              "pretext":"Available SMS Balance",
              "color":"#D00000",
              "fields":[
                 {
                  "title":"Mobile",
                  "value":phone,
                  "short":false
               },
               {
                "title":"Message",
                "value":message,
                "short":false
             },
              ]
           }
        ]
     }
    };

module.exports = {readyPayload };