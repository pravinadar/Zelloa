import { Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addUserInfo, openMainMenu, toggleDarkMode } from '../../redux/serviceSlice';
import { useLogoutMutation } from '../../redux/serviceAPI';
import { useEffect } from 'react';

const MainMenu = () => {
    const [logoutUser, logoutUserData] = useLogoutMutation();

    const dispatch = useDispatch();
    
    const handleClose = () => {
        dispatch(openMainMenu(false));
    }
    
    const handleToggleTheme = () => {
        handleClose();
        dispatch(toggleDarkMode())
    }
    
    const handleLogout = async () => {
        handleClose();
        await logoutUser().unwrap();
        window.location.reload();
    }

    useEffect(() => {
        if (logoutUserData.isSuccess) {
            dispatch(addUserInfo(null))
            console.log("User logged out successfully");
            // window.location.reload(); // redirect to register page
        }
    }, [logoutUserData.isSuccess])
    
    const { MainMenu, DarkMode, myInfo } = useSelector(state => state.service);
    const paperSx = {
        bgcolor: DarkMode ? "#1e1e1e" : "#ffffff",
        color: DarkMode ? "#f5f5f5" : "#000",
        transition: "background-color .25s,color .25s"
    }

    return (
        <>
            <Menu
                anchorEl={MainMenu}
                open={Boolean(MainMenu)}
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
                    to={`/profile/zips/${myInfo?._id}`}
                    style={{ textDecoration: 'none', color: DarkMode ? "#f5f5f5" : "#000" }}
                >
                    <MenuItem onClick={handleClose}>
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