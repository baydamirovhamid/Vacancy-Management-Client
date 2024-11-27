import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap'; // Ensure you import Table

const ResultList = () => {
  const [results, setResults] = useState([]);
  const { vacancyId } = useParams();
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('https://localhost:44391/api/Results');
        const results = response.data["getAllResultDtos"] || [];
        setResults(results);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [vacancyId]);

  if (!results) return <p>Loading results...</p>;


  return (
    <div className="container-fluid">
      <div className="container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Point</th>
              <th>True Question Count</th>
              <th>False Question Count</th>
              <th>Vacancy Id</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td>{result.id}</td>
                <td>{result.point}</td>
                <td>{result.trueQuestionCount}</td>
                <td>{result.falseAnswerCount}</td>
                <td>{result.vacancyId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ResultList;
