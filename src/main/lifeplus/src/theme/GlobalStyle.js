import {createGlobalStyle}  from "styled-components";
import {reset} from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    background-color: ${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor}
  }
  .carousel__cell{
    color:${(props) => props.theme.textColor}
  }
  .headerNav{
  //  background-color: ${(props) => props.theme.navColor};
    background-color: ${(props) => props.theme.navColor2};
    color:${(props) => props.theme.textColor}
  }
  .weatherComponents{
    border: ${(props) => props.theme.boardColor}
  }
 
  .searchList{
    border: ${(props) => props.theme.boardColor};
  }
  .hotSearch{
    color: ${(props) => props.theme.darkColor}
  }
   .carousel__cell{
     background-color: ${(props) => props.theme.neonBackColor};
     color: ${(props) => props.theme.bgColor};
   }
   .prevArrow{
     color: ${(props) => props.theme.textColor};
   }
   a{
     color: ${(props) => props.theme.textColor};
   }
  .hotSearch >.searchList> h3{
    border-bottom: ${(props) => props.theme.boardColor};
  }
  .searchContainer{
    border-bottom: ${(props) => props.theme.boardColor};
  }
  .imgCon{
    border-bottom: ${(props) => props.theme.boardColor};
  }
  .effect{
    border: ${(props) => props.theme.boardColor};
  }
  .mainCalendar{
    border: ${(props) => props.theme.boardColor};
  }
  .container > div{
    border: ${(props) => props.theme.boardColor};
  }
  .logoText{
    color: ${(props) => props.theme.boardColor};
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
  .mainCalendar > div{
    border-bottom: ${(props) => props.theme.boardColor};
  }
`;