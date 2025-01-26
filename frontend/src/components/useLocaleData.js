import { useState, useEffect } from "react";

function useLocaleData(locale) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/src/data/${locale}.json`);
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.warn(
            `Failed to fetch data for locale ${locale}, status: ${response.status}`
          );
          setData({});
        }
      } catch (e) {
        setError(e);
      }
    };

    fetchData();
  }, [locale]);

  return { data, error };
}

export default useLocaleData;
