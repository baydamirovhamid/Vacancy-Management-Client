import  Card  from 'react-bootstrap/Card';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ApplyModal from '../ApplyModal/ApplyModal';
const Vacancy = ({Id,Title,Description,StartDate,EndDate}) => {
  const [wantApply, setWantApply] = useState(false);
  const formatDate = (date) => {
    if (!date) return 'Not specified';
    return format(new Date(date), 'MMMM dd, yyyy'); 
  };
  const handleCancel = () => {
      setWantApply(false);
  };
  const handleSave= () => {
      setWantApply(false);
    }
  
  return (
  <>
  <Card style={{ width: '18rem', height:'400px' }}>
    <Card.Body>
      <Card.Title>{Title}</Card.Title>
      <Card.Text>
       {Description}
      </Card.Text>
      <Card.Text>
       {formatDate(StartDate)}
      </Card.Text>
      <Card.Text>
       {formatDate(EndDate)}
      </Card.Text>      
      
  <button onClick={()=>setWantApply(true)} className='p-2 rounded bg-cyan-400 text-white'>Apply</button>
    </Card.Body>
  </Card>

          {wantApply && (
            <ApplyModal
              onCancelApply={handleCancel}
              onSaveApply={handleSave}
              vacancyId={Id}
            />
          )}
  </>
  );
};
export default Vacancy