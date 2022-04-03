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
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Șoferi supărați de Skoda '}
      
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 200;

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
      whiteSpace: 'wrap',
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
          width: theme.spacing(0),
        },
      }),
    },
  }),
);

function OrdersContent({match}) {
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
  const [OfferForClient, setOfferForClient] = React.useState([{type: "", price: "", startDate: "", endDate: "", id: 0, clientId: 0, machineryId: 0, clientName: "", clientPhone: ""}]);
  const [description, setDescription] = React.useState('');

  function setDesc(event) {
	//setState({description:event.target.value});
	console.log(description);
	setDescription(event.target.value)
  }

  useEffect(() => {
	let id = localStorage.getItem("idUser");
	id = parseInt(id);
	
        axios.get(`http://localhost:4200/api/machinery/${id}/no-client`, {
        }).then(response => {
		setMachineries(response.data);
		console.log(machineries);
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
		console.log(response.data);
		if (response.data.length >= 1)
		alert('Animăluțul tău a fost găsit!');
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
	  
				console.log(machineries[0].id);
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
  const Input = styled('input')({
    display: 'none',
  });

  function generateMachineryElement(machinery) {
	return (
		<Grid items xs={6}>
		<Paper elevation={5} style={{margin: "1%", textAllign: "center", width: "calc(200% - 21px)", padding: "1px", height: "calc(100% - 10px)"}}>

            <CardMedia
                component="img"
                sx={{
                    // 16:9
                    blockSize : "max-content",

                    padding:1.5,
		                margin: "3%", 
                    textAllign: "center",
                    width: "94%",
                    height: "80%"
                    

                }}
                image="https://source.unsplash.com/featured/?pet"
                alt="random"
                
            />

            <CardContent sx={{ width: "80%", height:"100%"}}>
                <Typography gutterBottom variant="h5" component="h2">
                    Tip: {machinery.type}
                </Typography>
                <Typography>
                    Descriere animăluț: {machinery.description}
                </Typography>
                <Typography>
                    Recompensă: {machinery.price} puncte
                </Typography>
                <Typography>
                    Nume Proprietar: {machinery.clientName}
                </Typography>
                <Typography>
                    Animăluțul a fost pierdut la data de {machinery.startDate.split('T')[0]}.
                </Typography>
                
            </CardContent>
            <CardActions>
                <Button size="large" onClick={handleOpen}>Animăluț găsit😍</Button>
            </CardActions>
			<Modal
				open={modalOpen}
				onClose={handleClose}
				aria-labelledby="modal-title"
			>
	  		  <Box component="form" noValidate sx={{ ...style, width: "50%", height: "45%" }}>
	  		    <Grid container spacing={1}>
	  		     <h2 id="modal-title">Animăluț găsit😍. Te rog completează:</h2>
				<TextField
				    multiline = "true"
				    minRows = "4"
				    onChange = {setDesc}
				    required
				    id="endDate"
				    label="Descriere animal găsit"
				    name="endDate"
				    autoFocus
				    fullWidth
				/>
         <Grid item xs={12}>
      <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" component="span">
          Upload😎
        </Button>
      </label>
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      </Grid>
    
			   </Grid>
			   <Button
				onClick = {() => saveOffer(machineries[0].id)}
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
				style={{marginTop: "5%"}}
			    >
				Adaugă❤️
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
		<Paper elevation={5} style={{ textAllign: "center", position: "center", width: "calc(200% - 21px)", paddingTop:"5%", marginTop:"5%", paddingBottom:"20%", marginBottom:"5%"}}>
		    <span style={{ marginLeft: "2%", marginTop:"2%"}}>Ai salvat animăluțul:<span style={{fontWeight: "bold", marginLeft: "1%"}}>{offer.type}</span> lui <span style={{fontWeight: "bold"}}>{offer.clientName}</span> </span>
		    <div>

		      <span style={{margin: "0%", marginLeft: "2%", display: "flex", justifyContent: "flex-start"}}>Recompensă: <span style={{fontWeight: "bold"}}>{offer.price} puncte</span></span>
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

    <Paper elevation={5} style={{ textAllign: "center", position: "center", width: "calc(200% - 21px)", paddingTop:"5%", marginTop:"5%", paddingBottom:"20%", marginBottom:"5%"}}>
        <span style={{ marginLeft: "2%", marginTop:"2%"}}>Persoana <span style={{fontWeight: "bold"}}> {offer.clientName} </span>a salvat animăluțul: <span style={{fontWeight: "bold", marginLeft: "1%"}}>{offer.type}</span> și are numărul de telefon: <span style={{fontWeight: "bold", marginLeft: "1%"}}>{offer.clientPhone}</span></span>
		    <div>
          <span style={{margin: "0%", marginLeft: "2%", display: "flex", justifyContent: "flex-start"}}>Recompensă: <span style={{fontWeight: "bold"}}>{offer.price} puncte</span></span>


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
              <MenuIcon/>
            </IconButton>
            <Typography
              
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1}}
            >
              Animăluțe pierdute
            </Typography>
            {/* <IconButton color="inherit"> */}
	  	{/* <AddIcon color = "primary" />
            </IconButton> */}
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
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: 'fit-content',
            width: 'fit-content',
            overflow: 'auto'
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 5, mb: 100 }}>
            <Grid container spacing={3}>
	  	<SearchBar />
             
            </Grid>
	    {getMachineries()}

	    <hr/>
	    <div>
	  	<h1> Istoric animăluțe salvate: </h1>
	   	<div><h2> Animăluțe salvate de tine: </h2> {getYourOffers()} </div>
	  	<div><h2> Animăluțele tale care s-au găsit💕:  </h2> {getOffersForClient()} </div>
	    </div>
            <Copyright sx={{ pt: 40 }} />
          </Container>
        </Box>
      </Box>
  );
}

export default function Orders() {
  return <OrdersContent />;
}
