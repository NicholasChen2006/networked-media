// imports the configurations set up in the .env

//NOTE: DONT UPLOAD .env TO GITHUB!!!! ITS UR PASSWORD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!
//!!!!!!!
//you DO need to upload it to your cyberduck


import dotenv from "dotenv";
dotenv.config();

import { createRestAPIClient } from "masto";

//this stores our login info and which server we are connecting to
const masto = createRestAPIClient({
    url: "https://networked-media.itp.io/",
    accessToken: process.env.TOKEN
    //we are accessing TOKEN in .env file
})
//kbkbkbkh
//add request to the db (its a feftch request)
async function retrieveData(){
    const url = 'http://159.65.221.121:7001/all-posts'  //THIS SHOULD YOUR URL TO UR PARTNERS DROPLET PATH!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //http://159.65.221.121:7001/all-posts
        //http://161.35.96.190:7001/all-posts

    const response = await fetch(url) //THIS IS A FETCH REQUEST!!! 
    const json = await response.json()   //we are awaiting the fetch of the url
    //console.log(json)
    const posts = json.posts
    //console.log(posts)
    let randNum = Math.floor(Math.random() * (posts.length)) //this is generating a random number.. but its a random index too
    console.log(posts[randNum].text)
    let randText = posts[randNum].text
    makeStatus(randText) //when your run the bot, you have generated randText status
}

async function makeStatus(textStatus){
    const status = await masto.v1.statuses.create({ //we are using the masto library: the v1 version: in the statuses thingy: creating a status.n
        status: textStatus,
        visibility: "public",
    })

    console.log(status.url)
}

setInterval( ()=>{
//     makeStatus()
retrieveData()
}, 3600000)
// // makeStatus()

retrieveData()