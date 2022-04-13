import {Ip} from "../models/Ip"




interface InterfaceIpDB {

    getAllIps(ip : Ip ) : void,
    getAllIpsUpdated(data : Ip[]) : void
    remove(ip : Ip) : void,
   
    
}


export {InterfaceIpDB}