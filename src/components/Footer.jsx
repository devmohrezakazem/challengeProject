import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "@mui/icons-material/Link";
import styled from "@emotion/styled";

const StyledFooter = styled('footer')`

`;

const Footer = () => {
  return (
    <StyledFooter>
      <Divider variant="middle"/>
      <Typography variant="body2" color="text.secondary" align="center" sx={{py: '1rem'}}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </StyledFooter>
  );
}

export default Footer;