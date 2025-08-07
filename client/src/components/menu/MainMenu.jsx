import { Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { openMainMenu } from '../../redux/serviceSlice';

const MainMenu = () => {

    const dispatch = useDispatch();

    const handleClose = () => { 
        dispatch(openMainMenu(false));
    }

    const handleToggleTheme = () => { }

    const handleLogout = () => {}

    const {MainMenu}=useSelector(state => state.service);

    return (
        <>
            <Menu
                anchorEl={MainMenu} // Replace with your anchor element
                open={Boolean(MainMenu)} // Replace with your open state
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                disableAutoFocusItem={true}
            >

                <MenuItem onClick={handleToggleTheme}>
                    Toggle Theme
                </MenuItem>

                <Link
                    to={"/profile/zips/1"}
                    style={{ textDecoration: 'none', color: 'black' }}
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