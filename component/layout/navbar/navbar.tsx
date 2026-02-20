// "use client";

// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { Cookies } from "react-cookie";
// import { logout } from "@/redux/slice/authSlice";
// import Link from "next/link";

// export default function Navbar() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const cookies = new Cookies();

//   const Logout=()=>{
//     cookies.remove("token", { path: "/" });
//     dispatch(logout());
//   }
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar
//         position="static"
//         sx={{
//           background: "linear-gradient(90deg, #db2777, #f472b6)",
//         }}
//       >
//         <Toolbar>
//           <Typography
//             variant="h6"
//             sx={{ flexGrow: 1, cursor: "pointer", fontWeight: "bold" }}
//             onClick={() => router.push("/")}
//           >
//             MyApp
//           </Typography>

//           <Button
//             color="inherit"
//             onClick={() => router.push("/auth/signin")}
//           >
//             Signin
//           </Button>

//           <Button
//             color="inherit"
//             onClick={() => router.push("/auth/signup")}
//           >
//             Signup
//           </Button>
//           <Link href={"/auth/signin"} style={{ textDecoration: "none" }} color= "inherit" onClick={Logout}>Logout</Link>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import { logout } from "@/redux/slice/authSlice";
import React from "react";
import image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cookies = new Cookies();

  // Get auth state from Redux
  const { email, name, image, token } = useSelector((state: any) => state.auth);

  // Menu state for Avatar dropdown
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Logout function
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
        sx={{ background: "linear-gradient(90deg, #db2777, #f472b6)" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer", fontWeight: "bold" }}
            onClick={() => router.push("/")}
          >
            MyApp
          </Typography>

          {token ? (
            <>
              {/* Avatar + Menu */}
              <IconButton onClick={handleMenuOpen} size="small">
                <Avatar
                  src={image ? `http://localhost:4000/${image}` : "/image.jpeg"}
                  alt={name || "User"}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem
                  onClick={() => {
                    router.push("/auth/profile"); // go to profile page
                    handleMenuClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => router.push("/auth/signin")}
              >
                Signin
              </Button>
              <Button
                color="inherit"
                onClick={() => router.push("/auth/signup")}
              >
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
