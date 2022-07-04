import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
 ${reset}
 * {
   box-sizing:border-box;
   outline:none;
   border:none;
   color:${(props) => props.theme.color}
  }
  a{
    text-decoration: none;
 }
`;

export default GlobalStyles;
