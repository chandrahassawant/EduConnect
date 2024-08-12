import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IntroDivider from './IntroDivider';

const cardData = [
  {
    title: 'Upcoming Assignments',
   
    description: 'Pinstriped cornflower blue cotton blouse takes y.',
    chipLabels: ['Soft', 'Medium', 'Hard']
  },
  {
    title: 'Today s Homework',
   
    description: 'A detailed report on sales performance for the current quarter.',
    chipLabels: ['Quarterly', 'Yearly']
  },
  {
    title: 'Pending Task',
  
    description: 'An overview of current product stock and inventory levels.',
    chipLabels: ['Electronics', 'Clothing', 'Books']
  },
  {
    title: 'Exams',
 
    description: 'Recent feedback from customers regarding product qual',
    chipLabels: ['Positive', 'Negative']
  }
];

export default function OutlinedCard() {
  return (
    <Box sx={{ width: 1320, height: 200 }}>
      <Card variant="outlined" sx={{ width: '110%', height: '120%' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {cardData.map((data, index) => (
            <IntroDivider
              key={index}
              title={data.title}
              description={data.description}
              chipLabels={data.chipLabels}
            />
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
