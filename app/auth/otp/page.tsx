// "use client"
// import { authOtp} from '@/redux/slice/authSlice';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// export default function OtpPage() {

//     const dispatch = useDispatch();
//     const router = useRouter()
//     const { email, isOtpVerified } = useSelector(
//     (state) => state.auth);
    

//   const [userId, setUserId] = useState("");

//  useEffect(() => {
//   const id = localStorage.getItem("Id");
//    if (id) {
//     setUserId(id);
//    }
//  }, []);

//  const handleChange =(e,index) => {
//     const value = e.target.value.replace(/\D/g, "").slice(-1)
//     e.target.value = value
    

//     // If a valid digit is entered, move focus to next box
//     if (value && index < 5) {
//       const nextInput = document.getElementById(`otp-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   }

 

//  const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   // Collect OTP from inputs
//   let otpValue = "";
//   for (let i = 0; i < 6; i++) {
//     const input = document.getElementById(`otp-${i}`) as HTMLInputElement;
//     otpValue += input?.value || "";
//   }

//   // Prepare payload
//   const payload = {
//     userId: localStorage.getItem("Id"),
//     otp: otpValue,
//   };

//   // Dispatch thunk
//   try{
//       const result = await dispatch(authOtp(payload)).unwrap();
//       console.log(result,"otp response");
//       if(result.status == true){
//         router.push("/auth/signin")
//       }
//   }catch(error){

//   }
  

//   // Handle success
//   // if (authOtp.fulfilled.match(result)) {
//   //   alert("OTP Verified Successfully");
//   //   router.push("/"); // or dashboard
//   // }

//   // // Handle error
//   // if (authOtp.rejected.match(result)) {
//   //   alert(result.payload || "OTP verification failed");
//   // }
// };



//   return (
//     <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
//    <div style={{ textAlign: "center",height:"300px" , width:"500px", backgroundColor:"#637aa8ff",
//    padding:"30px", borderRadius:"5px",margin:"auto", alignItems:"center"}}>
//       <h2 style={{fontSize:"28px", marginBottom:30}}><u>OTP Verification</u></h2>
//       <p style={{fontSize:"20px", marginBottom:20}}>
//          Mail Id : <strong>{email}</strong>
//       </p>

//       <form onSubmit={handleSubmit}>
//         <div style={{ display: "flex", justifyContent: "center", gap: "3px" }}>
//           {Array.from({ length: 6 }).map((_, index) => (
//             <input
//               key={index}
//               id={`otp-${index}`}
//               type="text"
//               maxLength="1"
//               onChange={(e) => handleChange(e, index)}
//               autoFocus={index === 0}
//               style={{
//                 width: "40px",
//                 height: "40px",
//                 textAlign: "center",
//                 fontSize: "20px",
//                 borderRadius: "5px",
//                 border: "1px solid white" ,
//               }}
//             />
//           ))}
//         </div>

//         <br />
//         <button type="submit" style={{ padding: "10px 20px", backgroundColor:"#353131", borderRadius:10, marginTop:20}}>
//           Verify OTP
//         </button>
//       </form>
//     </div>
//     </div>
//   )
// }



"use client";

import { authOtp } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";

export default function OtpPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { email, userId } = useSelector((state: any) => state.auth);
  

  // const [userId,, setUserId] = useState("");

  // useEffect(() => {
  //   const id = localStorage.getItem("Id");
  //   if (id) setUserId(id);
  // }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/g, "").slice(-1);
    e.target.value = value;

    if (value && index < 5) {
      const nextInput = document.getElementById(
        `otp-${index + 1}`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let otpValue = "";
    for (let i = 0; i < 6; i++) {
      const input = document.getElementById(
        `otp-${i}`
      ) as HTMLInputElement;
      otpValue += input?.value || "";
    }

    const payload = {
      userId: userId,
      otp: otpValue,
    };

    try {
      const result = await dispatch<any>(authOtp(payload)).unwrap();
      if (result.status === true) {
        router.push("/auth/signin");
      }
    } catch (error) {}
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #fdf2f8 0%, #e0f2fe 100%)",
      }}
    >
      <Card
        sx={{
          width: 450,
          p: 3,
          borderRadius: 4,
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.9)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            sx={{ color: "#db2777", mb: 2 }}
          >
            OTP Verification
          </Typography>

          <Typography align="center" sx={{ mb: 3 }}>
            Mail ID: <strong>{email}</strong>
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1.5,
                mb: 3,
              }}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <TextField
                  key={index}
                  id={`otp-${index}`}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: "bold",
                    },
                  }}
                  onChange={(e: any) => handleChange(e, index)}
                  sx={{
                    width: 55,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&.Mui-focused fieldset": {
                        borderColor: "#db2777",
                      },
                    },
                  }}
                />
              ))}
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#db2777",
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#be185d",
                },
              }}
            >
              Verify OTP
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
