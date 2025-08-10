import { Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { openMainMenu, toggleDarkMode } from '../../redux/serviceSlice';

const MainMenu = () => {

    const dispatch = useDispatch();

    const handleClose = () => { 
        dispatch(openMainMenu(false));
    }

    const handleToggleTheme = () => {
        handleClose();
        dispatch(toggleDarkMode())
    }

    const handleLogout = () => {}

    const {MainMenu:anchorEl, DarkMode}=useSelector(state => state.service);
    const paperSx = {
        bgcolor: DarkMode ? "#1e1e1e" : "#ffffff",
        color: DarkMode ? "#f5f5f5" : "#000",
        transition:"background-color .25s,color .25s"
    }

    return (
        <>
            <Menu
                anchorEl={anchorEl} // Replace with your anchor element
                open={Boolean(anchorEl)} // Replace with your open state
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                disableAutoFocusItem={true}
                PaperProps={{ sx: paperSx }}
            >

                <MenuItem onClick={handleToggleTheme}>
                    {DarkMode ? "Light Mode" : "Dark Mode"}
                </MenuItem>

                <Link
                    to={"/profile/zips/1"}
                    style={{ textDecoration: 'none', color: DarkMode ? "#f5f5f5" : "#000" }}
                >
                    <MenuItem>
                        Profile
                    </MenuItem>
                </Link>

                <MenuItem onClick={handleLogout}>
                    Logout
                </MenuItem>

            </Menu>
        </>
    )
}

export default MainMenu