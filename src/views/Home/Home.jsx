import React from 'react'
import Hero from '../../components/Hero/Hero'
import Bars from '../../components/Bars/Bars'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useMediaQuery from '@mui/material/useMediaQuery';


const heroImgURL = "https://res.cloudinary.com/koulin/image/upload/v1635008297/OneHealth/Website/illus1_lyd6k3.png"
const title = 'Booking medical tests never was so easy'
function Home({history}) {
    const mediaLarge = useMediaQuery('(min-width:1140px)');
    const isLogged=useSelector(s=>s.user.isLogged)

    useEffect(()=>{
        if(isLogged){
            history.push('/dashboard')
        } else{
            
        }
    },[])
    return (
        <div>
            {mediaLarge &&
            <>
                <Bars time={5350} pos={''}/>
                <Bars time={0} pos={'bars-horizontal'}/>
            </>}
            <Hero title={title} heroImgURL={heroImgURL} history={history}/>
            
        </div>
    )
}

export default Home
