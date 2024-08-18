import React, { useState, useEffect } from 'react';

const HomeworkDashboard = () => {
  const [homeworkData, setHomeworkData] = useState([]);

  
  const fetchHomeworkData = () => {
   
    const dummyData = [
      {
        date: '2024-07-30',
        assignments: [
          { id: 1, title: 'Math Homework', description: 'Complete exercises 1-5' },
          { id: 2, title: 'Science Homework', description: 'Read chapter 3 and answer questions' }
        ]
      },
      {
        date: '2024-07-31',
        assignments: [
          { id: 3, title: 'History Essay', description: 'Write a 500-word essay on World War II' }
        ]
      }
   
    ];

    setHomeworkData(dummyData);
  };

  useEffect(() => {
    
    fetchHomeworkData();
  }, []);

  return (
    <div className="homework-dashboard">
      <h2>Homework Dashboard</h2>
      {homeworkData.map((dayData, index) => (
        <div key={index} className="homework-day">
          <h3>{dayData.date}</h3>
          <ul>
            {dayData.assignments.map((assignment) => (
              <li key={assignment.id}>
                <strong>{assignment.title}</strong>
                <p>{assignment.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HomeworkDashboard;
