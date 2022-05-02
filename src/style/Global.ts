import { createGlobalStyle } from 'styled-components'
import { ShibanovaTheme, darkColors } from '@becoswap-libs/uikit'

const GlobalStyle = createGlobalStyle`
* {
  font-family: 'Poppins', sans-serif;
  // font-family: 'Montserrat', sans-serif;
} 

body {
  background:  ${darkColors.background};

 

 img {
   height: auto;
   max-width: 100%; 
 }
 
  }
`

export default GlobalStyle
