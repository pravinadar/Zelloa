import { Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const MainMenu = () => {

    const handleClose = () => { }

    const handleToggleTheme = () => { }

    const handleLogout = () => {}

    return (
        <>
            <Menu
                anchorEl={null} // Replace with your anchor element
                open={true} // Replace with your open state
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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