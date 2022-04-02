import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import { mainListItems, secondaryListItems } from '../listItems/listItems';
import Chart from './Chart';
import SearchBar from './SearchBar'
import { useEffect } from 'react';
import axios from 'axios'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link as MuiLink } from '@mui/material/'
import { Link as RouterLink } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from "@mui/material/CardActions";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

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
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

function OrdersContent() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const [machineries, setMachineries] = React.useState([{type: "", description: "", price: "", isAvailable: true, startDate: "", endDate: "", id: 0, clientId: 0, clientName: ""}]);
  const [date, setDate] = React.useState({startDate: "", endDate: ""})
  const [yourOffer, setYourOffer] = React.useState([{type: "", price: "", startDate: "", endDate: "", id: 0, clientId: 0, machineryId: 0, clientName: ""}]);
  const [OfferForClient, setOfferForClient] = React.useState([{type: "", price: "", startDate: "", endDate: "", id: 0, clientId: 0, machineryId: 0, clientName: ""}]);

  useEffect(() => {
	let id = localStorage.getItem("idUser");
	id = parseInt(id);
	
        axios.get(`http://localhost:4200/api/machinery/${id}/no-client`, {
        }).then(response => {
		setMachineries(response.data);
        }).catch(error => {
            console.log(error)
            alert('Ceva nu a mers bine! Asigura-te ca datele introduse sunt corecte si ca ti-ai activat contul!')
        });

	axios.get(`http://localhost:4200/api/offers/${id}/client`, {
	}).then(response => {
		setYourOffer(response.data);

	}).catch(error => {
		console.log(error);
	});

	axios.get(`http://localhost:4200/api/offers/${id}/for-client`, {
	}).then(response => {
		setOfferForClient(response.data);
	}).catch(error => {
		console.log(error);
	});
  }, []);

  function setStartDate(event) {
	setDate({startDate:event.target.value, endDate:date.endDate});
  }

  function setEndDate(event) {
	setDate({endDate:event.target.value, startDate:date.startDate});
  }

  function saveOffer(machinery) {
	  axios.post(`http://localhost:4200/api/offers/add`, {
		clientId: parseInt(localStorage.getItem("idUser")),
		machineryId: machinery,
		startDate: date.startDate,
		endDate: date.endDate
	  }).then(response => {
		handleClose();
	  }).catch(error => {
	  })
  }

  function generateMachineryElement(machinery) {
	return (
		<Grid items xs={6}>
		<Paper elevation={5} style={{margin: "3%", textAllign: "center"}}>

            <CardMedia
                component="img"
                sx={{
                    // 16:9
                    blockSize : "max-content",
                    padding:1,
                }}
                image="https://source.unsplash.com/featured/?machinery"
                alt="random"
            />

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    Tip: {machinery.type}
                </Typography>
                <Typography>
                    Descriere utilaj: {machinery.description}
                </Typography>
                <Typography>
                    Preț: {machinery.price}lei/zi
                </Typography>
                <Typography>
                    Nume Proprietar: {machinery.clientName}
                </Typography>
                <Typography>
                    Aceasta oferta este valabila incepand cu {machinery.endDate.split('T')[0]} si se termina pe {machinery.startDate.split('T')[0]}.
                </Typography>
                
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleOpen}>Rezervă comanda</Button>
            </CardActions>
			<Modal
				open={modalOpen}
				onClose={handleClose}
				aria-labelledby="modal-title"
			>
	  		  <Box component="form" noValidate sx={{ ...style, width: 600, height: 300 }}>
	  		    <Grid container spacing={2}>
	  		     <h2 id="modal-title">Vă rugăm să selectați perioada</h2>
			    <Grid item xs={12} sm={6}>
				<TextField
                    width = "200px"
				    onChange = {setEndDate}
				    required
				    id="endDate"
				    label="Final valabilitate"
				    name="endDate"
                    autoFocus
                    fullWidth
				/>
			    </Grid>
			    <Grid item xs={12} sm={6}>
				<TextField
				    onChange = {setStartDate}
				    required
				    fullWidth
				    id="startDate"
				    label="Început valabilitate"
				    name="startDate"
				/>
			   </Grid>
			   </Grid>
			   <Button
				onClick = {() => saveOffer(machinery.id)}
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
				style={{marginTop: "5%"}}
			    >
				Adaugă
			    </Button>
			  </Box>
			</Modal>
		</Paper>
	    </Grid>
);
  }

  function getMachineries() {
	return machineries.map(generateMachineryElement);
  }

  function generateyourOffersElement(offer) {
	return (
		<Grid items xs={6}>
		<Paper elevation={5} style={{margin: "3%", textAllign: "center"}}>
		    <span>Ai închiriat utilajul:<span style={{fontWeight: "bold", marginLeft: "1%"}}>{offer.type}</span> de la <span style={{fontWeight: "bold"}}>{offer.clientName}</span> </span>
		    <div>
		      <span style={{margin: "1%", marginLeft: "0%", display: "flex", justifyContent: "flex-start"}}>Preț: <span style={{fontWeight: "bold"}}>{offer.price}lei/zi</span></span>
          <span>Perioada de inchiriere incepe cu {offer.endDate.split('T')[0]} si se termina pe {offer.startDate.split('T')[0]}</span>
		    </div>
		</Paper>
	    </Grid>
);
  }

  function getYourOffers() {
	return yourOffer.map(generateyourOffersElement);

  }


  function generateOffersForClientElement(offer) {
	return (
		<Grid items xs={6}>
		<Paper elevation={5} style={{margin: "3%", textAllign: "center"}}>
		    <span>Clientul <span style={{fontWeight: "bold"}}> {offer.clientName} </span> a închiriat utilajul: <span style={{fontWeight: "bold", marginLeft: "1%"}}>{offer.type}</span></span>
		    <div>
		      <span style={{margin: "1%", display: "flex", justifyContent: "flex-start"}}>Preț: <span style={{fontWeight: "bold"}}>{offer.price}lei/zi</span></span>
		      <span style={{margin: "1%", display: "flex", justifyContent: "flex-start"}}>Această oferta începe pe: <span style={{fontWeight: "bold"}}>{offer.startDate.split("T")[0]}</span></span>
		      <span style={{margin: "1%", display: "flex", justifyContent: "flex-start"}}>Această oferta se termină pe: <span style={{fontWeight: "bold"}}>{offer.endDate.split("T")[0]}</span></span>

		    </div>
		</Paper>
	    </Grid>
);
  }

  function getOffersForClient() {
	return OfferForClient.map(generateOffersForClientElement);

  }

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Orders
            </Typography>
            <IconButton color="inherit">
	  	<AddIcon color = "primary" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
		  <div>
		    <MuiLink 
		      component={RouterLink}
		      to={'/dashboard'}>
		      <ListItem button>
			<ListItemIcon>
			  <DashboardIcon />
			</ListItemIcon>
			<ListItemText primary="Dashboard" />
		      </ListItem>
		    </MuiLink>
		    <MuiLink
		      component={RouterLink}
		      to={'/dashboard/orders'}>
		      <ListItem button>
			<ListItemIcon>
			  <ShoppingCartIcon />
			</ListItemIcon>
			<ListItemText primary="Orders" />
		      </ListItem>
		    </MuiLink>
		  <MuiLink href="#">
		    <ListItem button>
		      <ListItemIcon>
			<PeopleIcon />
		      </ListItemIcon>
		      <ListItemText primary="Customers" />
		    </ListItem>
		  </MuiLink>
		  </div>
	  </List>
          <Divider />
          <List>
		  <div>
		    <ListSubheader inset>Saved reports</ListSubheader>
		    <ListItem button>
		      <ListItemIcon>
			<AssignmentIcon />
		      </ListItemIcon>
		      <ListItemText primary="Current month" />
		    </ListItem>
		    <ListItem button>
		      <ListItemIcon>
			<AssignmentIcon />
		      </ListItemIcon>
		      <ListItemText primary="Last quarter" />
		    </ListItem>
		    <ListItem button>
		      <ListItemIcon>
			<AssignmentIcon />
		      </ListItemIcon>
		      <ListItemText primary="Year-end sale" />
		    </ListItem>
		  </div>
	</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
	  	<SearchBar />
              {/* Chart /}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
			<Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits }
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>*/}
              {/* Recent Orders - DELETED*/}
            </Grid>
	    {getMachineries()}

	    <hr/>
	    <div>
	  	<h1> Istoric comenzi </h1>
	   	<div><h2> Comenzi date de tine </h2> {getYourOffers()} </div>
	  	<div><h2> Comenzile altor utilizatori pentru tine </h2> {getOffersForClient()} </div>
	    </div>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
  );
}

export default function Orders() {
  return <OrdersContent />;
}
