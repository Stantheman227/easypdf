// PageThree.js
import { useEffect, useState } from 'react';

export default function PageThree() {
  const [summaryState, setSummaryState] = useState('');

  useEffect(() => {
    // Function to handle the event
    const handleSummaryUpdate = (event) => {
      setSummaryState(event.detail);
    };

    // Add event listener
    document.addEventListener('updateSummary', handleSummaryUpdate);

    // Clean up
    return () => {
      document.removeEventListener('updateSummary', handleSummaryUpdate);
    };
  }, []);

  return (
    <div className="w-2/5  p-2">
      <div className="h-full w-full border border-solid border-black shadow-xl bg-white rounded-lg p-3">
        <p>{summaryState}</p>
      </div>
    </div>
  );
}
