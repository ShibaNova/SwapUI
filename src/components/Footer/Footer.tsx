import React from 'react'
import styled from 'styled-components'
import { Heading, Text, Flex } from '@becoswap-libs/uikit'

const Hero = styled(Flex)`
  flex-direction: column;
  position: relative;
  justify-content: center; 
  background-position: bottom center;
  background-image: url('/images/banner2bg.png');
  background-color: #00aaff20;
  border-top: solid 1px ${({ theme }) => theme.colors.primary};
  

  // ${({ theme }) => theme.mediaQueries.lg} {
  //   display: flex;
  //   justify-content: flex-end;
  // }

  // ${({ theme }) => theme.mediaQueries.xl} {
  //   // padding: 0 5vw;
  // }
` 

const Row = styled(Flex)`
  flex-direction: row;
  justify-content: space-evenly;
  margin: 15px 0 0 0;
`

const Col = styled(Flex)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
`
const Img = styled.img`
  height: 25px;
  margin: 5px 5px;
  background-color: white;
  border-radius: 5px;
`
const Ul = styled.ul`
  list-style-type: none;  
  text-weight: bold;
`

const Footer = () => (
  <Hero>
    <Row>
      <Col>
      <Text>Get in Touch</Text>
        <Row >
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com/ShibaNovaDEFI"
                >
                  <Img
                    src="https://shibanova.io/assets/images/facebook-icon.svg"
                    alt="facebook"
                    style={{paddingLeft:"0"}}
                  />
                </a> 
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.instagram.com/ShibaNovaDEFI"
                >
                  <Img
                    src="https://shibanova.io/assets/images/instagram-icon.svg"
                    alt="instagram"
                  />
                </a>
                <a target="_blank" rel="noreferrer" href="https://t.me/ShibaNovaDEX">
                  <Img
                    src="https://shibanova.io/assets/images/telegram-icon.svg"
                    alt="telegram"
                  />
                </a>
                <a target="_blank" rel="noreferrer" href="https://www.twitter.com/ShibaNovaDefi">
                  <Img
                    src="https://shibanova.io/assets/images/twitter-icon.svg"
                    alt="twitter"                    
                  />
                </a>

        </Row>
      </Col>
      <Col>
        {/* <Text>Links</Text>       */}
        <Ul >
            <li style={{color:"white", marginTop:"2px"}}>
              <a target="_blank" rel="noreferrer" href="https://shibanova.io/terms">Terms</a>
            </li>
            <li style={{color:"white", marginTop:"4px"}}>
              <a target="_blank" rel="noreferrer" href="https://shibanova.io/privacy">Privacy</a>
            </li>
            <li style={{color:"white", marginTop:"4px"}}>
              <a target="_blank" rel="noreferrer" href="https://docs.shibanova.io/shibanova-documentation/"
                >Documentation</a
              >
            </li>
            <li style={{color:"white", marginTop:"4px"}}>
              <a target="_blank" rel="noreferrer" href="https://docs.shibanova.io/shibanova-documentation/security/audits"
                >Audits</a
              >
            </li>
        </Ul>
      </Col>
    </Row>
    <Row style={{marginBottom:"15px"}}>
      <Text style={{fontSize:"12px"}}>Copyright © 2021. All rights reserved. Shibanova.io</Text>
    </Row>
  </Hero>
)

export default Footer