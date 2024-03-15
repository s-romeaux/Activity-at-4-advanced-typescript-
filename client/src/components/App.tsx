import React, { useState, useEffect } from 'react';

interface MyComponentProps {
  // Define your component props here
}

const MyComponent: React.FC<MyComponentProps> = () => {
  // State variables
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    // Your async logic here
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchDataFunction(); // Replace with your data fetching function
        setData(result);
      } catch (err: any) {
        setError(err); // Explicitly define the type for the setError function
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array for componentDidMount-like behavior

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          {/* Render your data here */}
          <p>{data}</p>
        </div>
      )}
    </div>
  );
};

export default MyComponent;

// Sample function for data fetching
const fetchDataFunction = async () => {
  // Simulate async data fetching
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      // Resolve with sample data
      resolve('Sample Data');
      // Uncomment the line below to simulate an error
      // reject(new Error('An error occurred'));
    }, 1000);
  });
};
