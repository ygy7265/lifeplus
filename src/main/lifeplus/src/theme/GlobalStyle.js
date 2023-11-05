import {createGlobalStyle}  from "styled-components";
import {reset} from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    background-color: ${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor}
  }
  .headerNav{
    background-color: ${(props) => props.theme.navColor2};
    color:${(props) => props.theme.textColor}
  }
  .hotSearch{
    color: ${(props) => props.theme.darkColor}
  }
   .carousel__cell{
     background-color: ${(props) => props.theme.neonBackColor};
     color: ${(props) => props.theme.bgColor};
   }
   .prevArrow,a,.carousel__cell{
     color: ${(props) => props.theme.textColor};
   }
 
  .hotSearch >.searchList > h3 ,.searchContainer,.imgCon{
    border-bottom: ${(props) => props.theme.boardColor};
  }
  
  .mainCalendar,.effect,.container > div,.searchList, .logoText,  .weatherComponents{
    border: ${(props) => props.theme.boardColor};
  }
  .neon{
    background: ${(props) => props.theme.neonBackColor};
    box-shadow: ${(props) => props.theme.boxShadowColor};
    color: ${(props) => props.theme.bgColor};
  }
  button{
    background: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
  }
  .modalBody{
    background: ${(props) => props.theme.bgColor};
  }
 
`;