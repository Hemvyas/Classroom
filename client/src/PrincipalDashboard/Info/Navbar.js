import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Principal Dashboard
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/principal/teacher"
              >
                View Teachers
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/principal/student"
              >
                View Students
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/principal/classroom"
              >
                Create Classroom
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/principal/assign-teacher"
              >
                Assign Teacher
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/principal/teacherClassroom"
              >
                View Teacher Classrooms
              </MenuItem>
            </Menu>
          </>
        ) : (
          <div>
            <Button color="inherit" component={Link} to="/principal/teacher">
              View Teachers
            </Button>
            <Button color="inherit" component={Link} to="/principal/student">
              View Students
            </Button>
            <Button color="inherit" component={Link} to="/principal/classroom">
              Create Classroom
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/principal/assign-teacher"
            >
              Assign Teacher
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
