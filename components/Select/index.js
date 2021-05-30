import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./Select.module.scss";

export default function Select({ options, label, name }) {
  const [currentValue, setCurrentValue] = useState("");
  const router = useRouter();
  const valueFromQuery = router.query[name];
  const handleChange = ({ target: { value } }) => {
    const processedValue = value || "";
    router.push({
      pathname: "/",
      query: { ...router.query, [name]: processedValue },
    });
    setCurrentValue(processedValue);
  };

  useEffect(() => {
    if (valueFromQuery) {
      handleChange({ target: { value: valueFromQuery } });
    } else {
      setCurrentValue("");
    }
  }, [valueFromQuery]);

  return (
    <div className={styles.main}>
      <span className={styles.filterName}>{label}</span>
      <select name={name} onChange={handleChange} value={currentValue}>
        <option key="any" value="">
          Any
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
