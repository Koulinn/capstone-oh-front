import React from 'react'
import Hero from '../../components/Hero/Hero'
import Bars from '../../components/Bars/Bars'


const heroImgURL = "https://res.cloudinary.com/koulin/image/upload/v1635008297/OneHealth/Website/illus1_lyd6k3.png"
const title = 'Booking medical tests never was so easy'
function Home() {
    return (
        <div>
            <Bars time={5350} pos={''}/>
            <Bars time={0} pos={'bars-horizontal'}/>
            <Hero title={title} heroImgURL={heroImgURL}/>
            
        </div>
    )
}

export default Home
