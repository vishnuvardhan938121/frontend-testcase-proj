import React, { useState } from 'react';

const App = () => {
    const [code, setCode] = useState('');
    const [algorithm, setAlgorithm] = useState('Bubble Sort'); // Default to Bubble Sort
    const [language, setLanguage] = useState('Java'); // Default to Java
    const [testCases, setTestCases] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(false);

    const handleGenerateTestCases = async () => {
        if (!code.trim() || !algorithm || !language) {
            alert("Please enter code, select an algorithm, and select a language.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('https://backend-test-case-gen-proj-3.onrender.com/generate/test-cases', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    code, 
                    algorithm_name: algorithm, 
                    language 
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Backend Response:", data);

            if (data.error) {
                alert(`Error: ${data.error}`);
            } else {
                setTestCases(data.test_cases || []);
            }
        } catch (error) {
            console.error("Network error:", error);
            alert(`Network error while generating test cases. Details: ${error.message}`);
        }

        setLoading(false);
    };

    return (
        <div>
            <h1>Test Case Generator</h1>
            <div>
                <textarea
                    placeholder="Paste your Java or Python code here"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows="10"
                    cols="50"
                />
            </div>
            <div>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                </select>
            </div>
            <div>
                <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                >
                    {/* Sorting Algorithms */}
                    <optgroup label="Sorting Algorithms">
                        <option value="Bubble Sort">Bubble Sort</option>
                        <option value="Selection Sort">Selection Sort</option>
                        <option value="Insertion Sort">Insertion Sort</option>
                        <option value="Merge Sort">Merge Sort</option>
                        <option value="Quick Sort">Quick Sort</option>
                        <option value="Heap Sort">Heap Sort</option>
                        <option value="Radix Sort">Radix Sort</option>
                        <option value="Counting Sort">Counting Sort</option>
                   
                </select>
            </div>
            <div>
                <button onClick={handleGenerateTestCases} disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Test Cases'}
                </button>
            </div>

            {/* Display the generated test cases */}
            <div>
                {testCases.length > 0 && (
                    <div>
                        <h3>Generated Test Cases:</h3>
                        <ul>
                            {testCases.map((testCase, index) => (
                                <li key={index}>
                                    <strong>Test Case {index + 1}</strong>
                                    <ul>
                                        <li>Input: {JSON.stringify(testCase.input)}</li>
                                        <li>Expected Output: {JSON.stringify(testCase.expected_output)}</li>
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {testCases.length === 0 && !loading && (
                    <p>No test cases generated yet. Please generate test cases to view them.</p>
                )}
            </div>
        </div>
    );
};

export default App;
