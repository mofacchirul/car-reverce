"use client"; 

import { SessionProvider } from "next-auth/react";

const Nextprovider = ({children}) => {
return   <SessionProvider>
{children}
    </SessionProvider>
};

export default Nextprovider;