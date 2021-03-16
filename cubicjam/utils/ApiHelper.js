

const cropRequest = (url, image) => {
        var data = new FormData();
        data.append('file', image);
    return new Promise((resolve, reject) => {

        var req = new XMLHttpRequest();
            req.open("POST", url, true);
            req.responseType = "arraybuffer";
            var resp = null;
            var failNon2xx;
            req.onload = (event) => {

                if (failNon2xx && (req.status < 200 || req.status >= 300)) {
			 
                    reject({request: req});
                    
                    
                } else {
                    
                    resolve(new Blob([req.response], {type: "image/jpeg"}));
                }


       
            }
            req.onerror = function () {
                reject({request: req});
            };
            req.send(data);

           
    });

    

}

export default cropRequest;