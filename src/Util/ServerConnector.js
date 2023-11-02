const devPort = 8080;
const ServerData = {
    isDev: null,
    url: null
}

//check if in dev
try{
    ServerData.isDev = process.env.isDev
}catch(e){
    ServerData.isDev = false
}

//defined the url based on isDev
ServerData.url = ServerData.isDev ? "localhost:"+devPort : document.location.hostname

export default ServerData;