import React, {useState} from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {MdOutlineHome, MdOutlineAdd, MdOutlineChatBubbleOutline} from 'react-icons/md';
import {withRouter} from 'react-router-dom'


function BottomNav({history, setShowChat, showChat}) {
  const [value, setValue] = useState(0);

  const navigation =(endpoint)=>{
      history.push(endpoint)
  }

  return (
    <Box sx={{ width: '100%', position:'fixed', bottom: 0, left: 0 }} className="bottomNavigation-wrapper">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >

        <BottomNavigationAction label="Dashboard" onClick={()=>navigation('/dashboard')} icon={<MdOutlineHome />} />
        <BottomNavigationAction label="Book test" onClick={()=>navigation('/booking')} icon={<MdOutlineAdd />} />
        <BottomNavigationAction label="Support" onClick={()=>setShowChat(!showChat)} icon={<MdOutlineChatBubbleOutline />} />
      </BottomNavigation>
    </Box>
  );
}

export default withRouter(BottomNav)