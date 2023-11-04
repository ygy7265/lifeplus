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
    background-color: ${(props) => props.theme.navColor};
    color:${(props) => props.theme.textColor}
  }
  .weatherComponents{
    border: ${(props) => props.theme.boardColor}
  }
  .mainContainer{
    border: ${(props) => props.theme.boardColor}
  }
  .searchList{
    border: ${(props) => props.theme.boardColor};
  }
  .hotSearch{
    color: ${(props) => props.theme.darkColor}
  }
  // .carousel__cell{
  //   background-color: ${(props) => props.theme.navColor};
  // }
 
`;