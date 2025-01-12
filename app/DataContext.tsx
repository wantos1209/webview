import React, { createContext, useContext, useState, useEffect } from "react";

// Define the shape of the context
interface DataContextType {
  data: any; // Replace 'any' with the actual type of your data
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider Component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data once when the app loads
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://tr4ox-buvf.4ltrntvty.com/api/apkdata/doyantoto",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer 5ecbc45a747280d668a9d1e5d174fb37a2b7129e9311f2d22a3c3fe8ba5210046fd23b09e20757733b8488c73000c691f34dadcfa5d522658be34459dff107e1`, // Bearer Token
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the context
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
