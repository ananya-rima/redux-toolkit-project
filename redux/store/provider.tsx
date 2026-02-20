"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
    <SessionProvider>
      <Provider store={store}>
        {children}
        <Toaster position="top-right" 
        theme="dark"
        richColors
        duration={3000}/>  
        
        </Provider>
        </SessionProvider>
    </>
  );
}

