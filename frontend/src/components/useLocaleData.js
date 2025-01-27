import { useState, useEffect } from "react";

function useLocaleData(locale) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const module = await import(`../data/${locale}.json`);
        setData(module.default);
      } catch (e) {
        setError(e);
        console.error(`Failed to load data for locale ${locale}: `, e);
        setData({});
      }
    };
    loadData();
  }, [locale]);

  return { data, error };
}

export default useLocaleData;