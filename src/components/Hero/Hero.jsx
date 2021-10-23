import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import {useEffect, useState} from 'react'


function Hero({ heroImgURL, title }) {
    const [showHero, setShowHero] = useState(' hidden')

    useEffect(()=>{
        setTimeout(()=>{ setShowHero('')},100)
    },[])

    
    
    return (
        <Container>
            <Row id="hero" className={"justify-content-between"}>
                <div className={"col-4 flex-center-column-start" + showHero}>
                    <div className="flex-center-start mb-5">
                        <h1 className="">{title}</h1>
                    </div>
                    <div className="mt-5">
                        <Button className="w-50 py-2">Book now</Button>
                    </div>
                </div>
                <div className={"col-6" + showHero}>
                    <img src={heroImgURL} alt="" />
                </div>
            </Row>
        </Container>

    )
}

export default Hero
