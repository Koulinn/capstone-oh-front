import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import {useEffect, useState} from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';


function Hero({ heroImgURL, title, history }) {
    const [showHero, setShowHero] = useState(' hidden')
    const maxTablet = useMediaQuery('(max-width:768px)');
    const isMobile = useMediaQuery('(max-width:578px)');

    useEffect(()=>{
        setTimeout(()=>{ setShowHero('')},100)
    },[])

    const toRegister=()=>{
        history.push('/register')
    }
    
    return (
        <Container>
            <Row id="hero" className={"justify-content-between flex-column-reverse flex-md-row"}>
                <div className={"col-12 col-md-4 flex-center-column-start" + showHero}>
                    <div className="flex-center-center mt-5 mb-md-5 mt-md-0">
                        <h1 className="">{title}</h1>
                    </div>
                    <div className="mt-5">
                        <Button className="py-2" style={{width:isMobile? '100%' :'160px'}} onClick={toRegister}>Join now</Button>
                    </div>
                </div>
                <div className={"col-12 col-md-6" + showHero}>
                    <img src={heroImgURL} alt="" width={maxTablet? '256': ''} style={{objectFit:'cover'}} />
                </div>
            </Row>
        </Container>

    )
}

export default Hero
