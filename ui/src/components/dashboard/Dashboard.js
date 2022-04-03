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
import Deposits from './Deposits';
import Orders from './Orders';
import Album from './Album';
import { Route, Routes } from 'react-router';
import Modal from '@mui/material/Modal';
import ModalUnstyled from '@mui/core/ModalUnstyled'
import TextField from '@mui/material/TextField';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useEffect } from 'react';
import axios from "axios";
import OrdersPage from '../../pages/OrdersPage'
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
// pentru calendar
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Șoferi supărați de Skoda '}
      
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

const drawerWidth = 220;

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


  

function DashboardContent({ match }) {
  const [open, setOpen] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [type, setType] = React.useState('');
  let data = [];
  const [id, setId] = React.useState(parseInt(localStorage.getItem("idUser")));
  const [state, setState] = React.useState({type: "", description: "", price: "", isAvailable: true, startDate: "", endDate: ""});
  const [machineries, setMachineries] = React.useState([{type: "", description: "", price: "", isAvailable: true, startDate: "", endDate: "", id: 0, clientId: 0}]);
  const [value, setValue] = React.useState(new Date('2022-04-03T13:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios.get(`http://localhost:4200/api/machinery/${id}/client`, {
          })
          .then(response => {
            console.log(response);
            //setMachineries(response.data);
	    data = response.data;
	    setMachineries(data);
          })
          .catch(error => {
              console.log(error)
          });

  }, []);

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
                    image="https://source.unsplash.com/featured/?pet"
                    alt="random"
                />

                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        Tip:{machinery.type}
                    </Typography>
                    <Typography>
                        Descriere animăluț:{machinery.description}
                    </Typography>
                    <Typography>
                        Recompensă:{machinery.price}puncte
                    </Typography>
                </CardContent>
            </Paper>
	    </Grid>
 );
  }

  function getMachineries() {
	  console.log(machineries);
	return machineries.map(generateMachineryElement);
  }

  const toggleDrawer = () => {
      setOpen(!open);
    };

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  function setUtilType(event) {
    setState({type:event.target.value, description:state.description, price:state.price,
    	startDate:state.startDate, endDate:state.endDate});
    setType(event.target.value)
  }

  function setDescription(event) {
    setState({type:state.type, description:event.target.value, price:state.price,
    	startDate:state.startDate, endDate:state.endDate});
  }

  function setPrice(event) {
    setState({type:state.type, description:state.description, price:event.target.value,
    	startDate:state.startDate, endDate:state.endDate});
  }

  function setEndDate(event) {
    setState({type:state.type, description:state.description, price:state.price,
    	startDate:state.startDate, endDate:event.target.value});
  }

  // function setStartDate(event) {
  //   setState({type:state.type, description:state.description, price:state.price,
  //   	startDate:event.target.value, endDate:state.endDate});
  // }

  function createEntry() {
        axios.post("http://localhost:4200/api/machinery/add", {
		type:state.type,
		description:state.description,
		price:state.price,
		startDate:value,
		endDate:state.endDate,
		clientId: localStorage.getItem("idUser")
        }).then(response => {
          handleClose();
        }).catch(error => {
            console.log(error)
            alert('Ceva nu a mers bine! Asigura-te ca datele introduse sunt corecte si ca ti-ai activat contul!')
        });
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
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleOpen}>
	  	<AddIcon />
	  	<Modal
	  		open={modalOpen}
	  		onClose={handleClose}
	  		aria-labelledby="modal-title"
		>
	  	<Box component="form" noValidate sx={{ ...style, width: 400 }}>
	  	<Grid container spacing={0}>
	  		<h2 id="modal-title">Title</h2>
	  	  <FormControl fullWidth>	
	  	    <InputLabel id="selectTypeLabel">Selecție animal</InputLabel>
		    <Select
		      labelId="selectTypeLabel"
		      id="selectType"
		      value={type}
		      label="Tipul Animalului"
		      onChange={setUtilType}
		    >
		      <MenuItem value={"Caine"}>Câine</MenuItem>
		      <MenuItem value={"Pisica"}>Pisică</MenuItem>
		      <MenuItem value={"Iepure"}>Iepure</MenuItem>
		      <MenuItem value={"Hamster"}>Hamster</MenuItem>
		      <MenuItem value={"Papagal"}>Papagal</MenuItem>
		      <MenuItem value={"Soparla"}>Șopârlă</MenuItem>
		      <MenuItem value={"Cal"}>Cal</MenuItem>
		      <MenuItem value={"Magar"}>Măgar</MenuItem>
		      <MenuItem value={"Vaca"}>Vacă</MenuItem>
		      <MenuItem value={"Oaie"}>Oaie</MenuItem>
		      <MenuItem value={"Altceva"}>Altceva (Scrie în descriere)</MenuItem>

		    </Select>
		      <TextField
			  margin="normal"
			  required
			  fullWidth
			  id="description"
			  label="Descriere Animăluț"
			  name="description"
			  autoFocus
	  		  onChange={setDescription}
		      />
	  	  </FormControl>
		    <Grid item xs={12} sm={6}>
			<TextField
			    onChange = {setPrice}
			    fullWidth
			    id="recompensa"
			    label="Recompensa"
			    name="recompensa"
			/>
		   
		    </Grid>
		    <Grid item xs={12} sm={6}>

  
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label="Date mobile"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={setValue}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
		    </Grid>
		    <Button
			onClick = {createEntry}
			type="submit"
			fullWidth
			variant="contained"
			sx={{ mt: 3, mb: 2 }}
			component={RouterLink}
			to={'/dashboard'}
		    >
	  		Adaugă
	  	    </Button>
	  	</Grid>
	  	</Box>
	  	</Modal>
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
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Routes>
	  	  <Route path='/' element={getMachineries()}/>
                  <Route path="/orders" element={<OrdersPage />}/>
                  {/* <Route path="/customers" element={<Customers />}></Route> */}
                </Routes>
              {/* Chart /}
              </Grid>*/}
              {/* Recent Orders - DELETED*/}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
