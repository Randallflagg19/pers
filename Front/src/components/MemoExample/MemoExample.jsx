import React, { useMemo, useState } from "react";

export default function MemoExample() {
  const [count, setCount] = useState(0);
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);

  const totalSum = useMemo(() => {
    console.log("Calculating sum...");
    return numbers.reduce((acc, num) => acc + num, 0);
  }, [numbers]);
  return (
    <div>
      <h1>Total Sum: {totalSum}</h1>
      <button onClick={() => setNumbers([...numbers, numbers.length + 1])}>
        Add number
      </button>
      <button onClick={() => setCount(count + 1)}>
        Re-render without changing numbers
      </button>
      <p>Re-render count: {count}</p>
    </div>
  );
}
