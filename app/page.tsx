// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { logout } from "@/redux/slice/authSlice";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const { token } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(https://images.unsplash.com/photo-1492724441997-5dc865305da7)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        px: 2,
      }}
    >
      <Box>
        <Typography
          variant="h2"
          fontWeight="bold"
          gutterBottom
          sx={{
            background: "linear-gradient(90deg, #db2777, #f472b6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome to Your Dashboard
        </Typography>

        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
          Manage your products beautifully with a premium experience.
        </Typography>

        {/* <Button
          variant="contained"
          size="large"
          sx={{
            mr: 2,
            backgroundColor: "#db2777",
            "&:hover": {
              backgroundColor: "#be185d",
            },
            borderRadius: 3,
            px: 4,
          }}
          onClick={() => router.push("/auth/signup")}
        >
          Get Started
        </Button> */}

        <Button
          variant="contained"
          size="large"
          sx={{
            mr:2,
            backgroundColor:"#db2777",
             "&:hover": {
              backgroundColor: "#be185d",
            },
            borderRadius: 3,
            px: 4,

          }}
          onClick={() => {
            if (token) {
              router.push("/crud/productcreate");
            } else {
              router.push("/auth/signup");
            }
          }}
        >
          {token ? "Go to  Create Product" : "Get Started"}
        </Button>

        {token ? (
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: "#db2777",
              color: "#db2777",
              borderRadius: 3,
              px: 4,
            }}
            onClick={() => {
              localStorage.removeItem("token");
              dispatch(logout());
              router.push("/auth/signin");
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: "#db2777",
              color: "#e1c6d2",
              borderRadius: 3,
              px: 4,
              "&:hover": {
                borderColor: "#be185d",
                backgroundColor: "rgba(219,39,119,0.1)",
              },
            }}
            onClick={() => router.push("/auth/signin")}
          >
            Login
          </Button>
        )}
      </Box>
    </Box>
  );
}
