

"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import { logout } from "@/redux/slice/authSlice";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const { token, name, email, image } = useSelector((state: any) => state.auth);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    cookies.remove("token", { path: "/" });
    dispatch(logout());
    handleMenuClose();
    router.push("/auth/signin");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #db2777, #f472b6)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer", fontWeight: "bold" }}
            onClick={() => router.push("/")}
          >
            MyApp
          </Typography>

          
          {token && (
            <>
              <IconButton onClick={handleMenuOpen} size="small">
                <Avatar
                  src={image ? `http://localhost:4000/${image}` : "/image.jpeg"}
                  alt={name || "User"}
                  sx={{
                    width: 40,
                    height: 40,
                    border: "2px solid white",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem disabled sx={{ fontSize: 13, opacity: 0.7,"&:hover": { backgroundColor: "#fce4ec" } }}>
                  {email}
                </MenuItem>

                <Divider />

                <MenuItem sx={{ "&:hover": { backgroundColor: "#fce4ec" } }}
                  onClick={() => {
                    router.push("/auth/profile");
                    handleMenuClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem sx={{ "&:hover": { backgroundColor: "#fce4ec" } }}
                  onClick={() => {
                    router.push("/auth/update-password");
                    handleMenuClose();
                  }}
                >
                  Update Password
                </MenuItem>

                <MenuItem sx={{ "&:hover": { backgroundColor: "#fce4ec" } }}
                  onClick={handleLogout}
                  sx={{ color: "#be123c", fontWeight: 500 }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
