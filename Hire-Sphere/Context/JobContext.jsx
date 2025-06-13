import React, { createContext } from "react";

export const  JobContext = createContext();

export const JobProvider = ({children}) => {
    const value = {};
    <JobContext.Provider value={value}>
        {children}
    </JobContext.Provider>
}