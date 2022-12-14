import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie'

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Bookmarks from '@mui/icons-material/Bookmarks';
import HomeIcon from '@mui/icons-material/Home';
import { Stack } from '@mui/system';

import Search from './Search';
import MapGrid from './MapGrid';
import { LAYOUT_TYPES, DRAWER_WIDTH, HOME_TEXT, BOOKMARK_TEXT } from '../../constants';
import Alert from '../Shared/Alert';
import { restaurantActions } from "../../store";

const drawerWidth = DRAWER_WIDTH;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function Home() {
  
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();

  const toastMessage = useSelector(state => state.restaurantReducer.toast.message);
  const toastType = useSelector(state => state.restaurantReducer.toast.type);
  const searched_restaurants = useSelector(state => state.restaurantReducer.restaurants);
  const bookmarked_restaurants = useSelector(state => state.restaurantReducer.bookmarkedRestaurants);
  const [cookies, setCookie, removeCookie] = useCookies(['user_session']);

  const [open, setOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(true);

  useEffect(() => {
    const user_session = cookies.user_session;
    if (user_session !== undefined) {
      dispatch(restaurantActions.updateRestaurants(user_session.searched_restaurants));
      dispatch(restaurantActions.updateBookmarkRestaurants(user_session.bookmarked_restaurants));
    }
  }, [])

  useEffect(() => {
    const user_session = cookies.user_session;
    if (user_session !== undefined) {
      setCookie("user_session", {
        searched_restaurants,
        bookmarked_restaurants,
      },{
        maxAge: 172800
      });
    }
  }, [searched_restaurants, bookmarked_restaurants]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleBookmarkAction = () => {
    if (isSelected) {
      setIsSelected(!isSelected);
      history.push("/bookmark");
    }
  }

  const handleHomeAction = () => {
    if (!isSelected) {
      setIsSelected(!isSelected);
      history.push("/home");
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            { isSelected ? HOME_TEXT : BOOKMARK_TEXT}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={HOME_TEXT} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              selected={isSelected}
              onClick={handleHomeAction}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={HOME_TEXT} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key={BOOKMARK_TEXT} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              selected={!isSelected}
              onClick={handleBookmarkAction}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Bookmarks />
              </ListItemIcon>
              <ListItemText primary={BOOKMARK_TEXT} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
          { isSelected &&
            <Stack>
              <Search /> 
              <MapGrid type={ LAYOUT_TYPES.SEARCH }/>
            </Stack>
          }
          { !isSelected &&
            <Stack>
              <MapGrid type={ LAYOUT_TYPES.BOOKMARK }/>
            </Stack>
          }
      </Box>
      { toastMessage !== "" &&
        <Alert severity={toastType} style={{position: "absolute", bottom: 30, left: "43%"}}>
          {toastMessage}
        </Alert>
      }
    </Box>
  );
}

export default Home;
