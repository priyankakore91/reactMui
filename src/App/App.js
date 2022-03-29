import './App.css';
import SideMenu from '../Components/SideMenu';
import { CssBaseline, makeStyles } from '@material-ui/core';
import Header from '../Components/Header';
import Article from '../Pages/VicharApp/Article';
import Employees from '../Pages/Employees/Employees';

const usestyles = makeStyles({
  appMain: {
    paddingLeft:'300px',
    width:'100%'
  }
})

function App() {
  const classes = usestyles();

  return (
    <>
    <SideMenu /> 
    <div className={classes.appMain}>
      <Header></Header>
      <Employees />
      {/* <Article /> */}
    </div>
    <CssBaseline />
    </>
  );
}

export default App;
