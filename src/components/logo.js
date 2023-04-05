import { useTheme } from '@mui/material/styles';
import {Avatar } from '@mui/material';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <Avatar alt="logo shop" src="/assets/logos/logo-shop.png" />
  );
};
