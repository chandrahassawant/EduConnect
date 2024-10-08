const express = require('express');
const cors = require('cors');

const { knex } = require('./config/connection.js');
const app = express();
const port = 3100;
const router = express.Router();
const session = require('express-session');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const pool = require('./db');
const fs = require('fs');
const mysql = require('mysql2');



app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'root',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './data'); 
    
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
  });
  
  const upload = multer({ storage: storage });



  const solution_folder = multer.diskStorage({
    destination: function (req, file, cb) {
     cb(null, './Submited_Assignments');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const solution_upload = multer({ storage: solution_folder });


  app.post('/api/uploadsolution', solution_upload.single('file'), (req, res) => {
    const { assignmentId } = req.body;
  
    if (!assignmentId) {
      return res.status(400).json({ error: 'Assignment ID is required' });
    }
  
    if (!req.file) {
      return res.status(400).json({ error: 'File is required' });
    }
  
    
    const filepath = req.file.filename;
  
    
  
    res.json({ message: 'File uploaded successfully', filepath: filepath });
  });

  app.post('/api/submit-solution', async (req, res) => {
    const { assignmentId, filePath, userId, submissionDate, status_code } = req.body;

    const insertQuery = `INSERT INTO solution (assignment_id, filepath, user_id, submission_date) VALUES (?, ?, ?, ?)`;
    const updateQuery = 'UPDATE assignments SET status_code = ?,submited_file_path=? ,submited_date=? WHERE assignment_id = ?';
    const insertValues = [assignmentId, filePath, userId, submissionDate];
    const updateValues = [status_code, filePath,submissionDate,assignmentId];

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [insertResult] = await connection.query(insertQuery, insertValues);
        await connection.query(updateQuery, updateValues);
        await connection.commit();


        res.status(200).json({
            message: 'File uploaded and data saved successfully, teacher notified.',
            data: {
                id: insertResult.insertId,
            }
        });
    } catch (err) {
        await connection.rollback();
        console.error('Error saving data to MySQL:', err);
        res.status(500).json({ error: 'Failed to save data' });
    } finally {
        connection.release(); 
    }
});


app.get('/api/teacher-pending-check', (req, res) => {
     const {userId}=req.query;
  const query = `
  SELECT assignment_id,assignment_title, assignment_description, deadline,subject_name, filepath, status_code
  FROM assignments
  WHERE user_id = ? `;
  
    connection.query(query,[userId], (err, results) => {
      if (err) {
        console.error('Error fetching data from MySQL:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json(results);
    });

});



  

  // Route to handle file upload and form data
  app.post('/api/upload', upload.single('file'), (req, res) => {
    const { classId, subject, title, discription, deadline,subjectId,userId,statusCode,schoolId} = req.body;
    
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Check if all required fields are present
    if (!classId || !subject || !title || !discription || !deadline ) {
      return res.status(400).json({ error: 'Please fill all required fields' });
    }
   

    // Save file path and form data to MySQL
    const filePath = req.file.path;
  
    const query = `INSERT INTO assignments (class_id,subject_name,assignment_title, assignment_description,deadline, filepath,subject_id,user_id,status_code,school_id) 
                   VALUES (?, ?, ?, ?, ?,?,?,?,?,?)`;
    const values = [classId, subject, title, discription, deadline, filePath,subjectId,userId,statusCode,schoolId];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Error saving data to MySQL:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json({
        message: 'File uploaded and data saved successfully',
        file: req.file,
        data: {
          id: result.insertId,
          classId,
          subject,
          title,
          discription,
          deadline,
          filePath,
          subjectId,
          userId,
          statusCode,
          schoolId
        }
      });
    });
  });


  app.get('/api/assignments', (req, res) => {
    const { subject_id, class_id } = req.query;
  
    const query = `
      SELECT assignment_id,assignment_title, assignment_description, deadline,subject_name, filepath, status_code
      FROM assignments
      WHERE subject_id = ? AND class_id = ? AND status_code = 0;
    `;
  
    connection.query(query, [subject_id, class_id], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      
      res.json(results);
      console.log(results);
      
    });
  });

  app.get('/api/teacher/check-assignments', (req, res) => {
    const { subject_id, class_id } = req.query;
  console.log(subject_id,class_id);
  
    const query = `
      SELECT assignment_id,assignment_title, assignment_description, deadline,subject_name,submited_date, submited_file_path, status_code
      FROM assignments
      WHERE subject_id = ? AND class_id = ? AND status_code = 1;
    `;
  
    connection.query(query, [subject_id, class_id], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
    
      
      res.json(results);
      console.log(results);
      
    });
  });



app.get('/api/download', (req, res) => {
  const filepath = req.query.filepath;

  if (!filepath) {
    return res.status(400).json({ error: 'Filepath is required' });
  }

  
  const sanitizedFilePath = path.basename(filepath);


  const absolutePath = path.resolve(__dirname, 'data', sanitizedFilePath);

  fs.access(absolutePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(absolutePath, err => {
      if (err) {
        res.status(500).json({ error: 'Failed to download file' });
      }
    });
  });
});













app.post('/login', (req, res) => {
  
    const { email } = req.body;

  
    req.session.email = email;

    res.send('Login successful');
});
app.get('/profile', (req, res) => {
    
    const email = req.session.email;
    console.log(email);
    
    if (email) {
        res.send(`Email stored in session: ${email}`);
    } else {
        res.send('No email found in session');
    }
});


const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Pass@123', 
    database: 'school_assignment_project' 
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database as ID', connection.threadId);
});

app.get('/api/users', (req, res) => {
    knex.select('*').from('users').then((results) => {
        res.status(200).json(results);
    }).catch((error) => {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/api/users/students', (req, res) => {
    const query = 'SELECT * FROM users WHERE role_id = 3';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});



app.get('/api/admin/createclass/getschools', (req, res) => {
    const query = 'SELECT * FROM schools'; 
    
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query:', error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results); 
    });
  });

app.get('/api/admin/createclass/getclasses', (req, res) => {
    const query = 'SELECT * FROM classes'; 

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query:', error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results); 
    });
});
app.get('/api/admin/createclass/getsubjects', (req, res) => {
    const query = 'SELECT * FROM subjects'; 

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query:', error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results); 
    });
});

app.post('/api/admin/createclass/configure-class', (req, res) => {
    const { school_id, class_id, classConfigName } = req.body;
  
    const insertQuery = 'INSERT INTO class_config (school_id, class_id, class_config_name) VALUES (?, ?, ?)';
    const values = [school_id, class_id, classConfigName];
  
    connection.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Error inserting data' });
        return;
      }
      console.log('Data inserted successfully:', result);
      res.status(200).json({ message: 'Data inserted successfully' });
    });
  });
  
app.post('/api/upload',)

// POST endpoint to register a new student
app.post('/api/student/profile', (req, res) => {
    const { firstname, lastname, contactNumber, address,city, email, school,standard } = req.body;

    // Validate required fields
    if (!firstname || !lastname || !contactNumber || !email || !school || !address|| !city||!standard) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const roleId = 3; 

    const query = 'INSERT INTO users (first_name, last_name, mobile_number, role_id, email, school_id,city, `address`,class_id) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)';
    const values = [firstname, lastname, contactNumber, roleId, email, school, address,city,standard];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Failed to register', details: err.message });
            return;
        }
        console.log('Inserted a new record with ID:', results.insertId);
        res.json({ message: 'Registration successful' });
    });
});

app.post('/api/teacher/profile', (req, res) => {
    const { firstname, lastname, contactNumber, address,city, email, school,standard } = req.body;

    console.log(req.body);
    if (!firstname || !lastname || !contactNumber || !email || !school || !address||!city||!standard) 
        {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const roleId = 2; 

    const query = 'INSERT INTO users (first_name, last_name, mobile_number, role_id, email, school_id,city ,`address`,class_id) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)';
    const values = [firstname, lastname, contactNumber, roleId, email, school, address,city,standard];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Failed to register', details: err.message });
            return;
        }
        console.log('Inserted a new record with ID:', results.insertId);
        res.json({ message: 'Registration successful' });
    });
});
app.post('/api/admin/profile', (req, res) => {
    const { firstname, lastname, contactNumber, address,city, email, school,standard} = req.body;

    console.log(req.body);
    if (!firstname || !lastname || !contactNumber || !email || !school || !address||!city||!standard){
        return res.status(400).json({ error: 'All fields are required' });
    }

    const roleId = 1;

    const query = 'INSERT INTO users (first_name, last_name, mobile_number, role_id, email, school_id,city ,`address`,class_id) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)';
    const values = [firstname, lastname, contactNumber, roleId, email, school, address,city,standard];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Failed to register', details: err.message });
            return;
        }
        console.log('Inserted a new record with ID:', results.insertId);
        res.json({ message: 'Registration successful' });
    });
});

app.post('/api/getrole', (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const query = 'SELECT role_id, user_id FROM users WHERE email = ?';
    const values = [email];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

       
        res.json(results[0]);
    });
});


app.post('/api/getschoolid', (req, res) => {
    const query = 'SELECT school_id from users where email = ?';
    const email = req.body.email;
    console.log(email)
    const values = [email];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
       
        res.json(results[0]);
    });
});

app.post('/api/getclassid', (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const query = 'SELECT class_id, user_id, school_id FROM users WHERE email = ?';
    const values = [email];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
           
            const classIds = results.map(row => row.class_id);
            const userId = results[0].user_id;
            const schoolId = results[0].school_id;

            return res.json({ classIds, userId, schoolId });
        } else {
          
            return res.status(404).json({ error: 'No classes found for this user' });
        }
    });
});


app.get('/api/subjects/:classId', (req, res) => {
    const classId = req.params.classId;
    const query = `
        SELECT subject_id, subject_name
        FROM subjects
        WHERE class_id = ?
    `;
    
    connection.query(query, [classId], (err, results) => {
        if (err) {
            console.error('Error fetching subjects:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

app.post('/api/update_profile', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'your_jwt_secret'); 
    
    if (!decodedToken.sub) {
      return res.status(400).json({ error: 'Invalid token: sub property missing' });
    }

    const userId = decodedToken.sub;
  
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile. Please try again.' });
  }
});


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

router.post("/api/update_profile", authenticateToken, (req, res) => {
    const { firstName, lastName, mobileNumber, address, city, schoolName, role } = req.body;
    const sub = req.user.sub; 

    const updateUserQuery = `
        UPDATE users 
        SET first_name = ?, last_name = ?, mobile_number = ?, address = ?, city = ?, school_id = ?, role = ?
        WHERE auth0_sub = ?`; 
    connection.query(updateUserQuery, [firstName, lastName, mobileNumber, address, city, schoolName, role, sub], (err, result) => {
        if (err) {
            console.error('Error updating profile:', err);
            res.status(500).json({ message: 'Failed to update profile. Please try again.' });
        } else {
            console.log('Profile updated successfully');
            res.status(200).json({ message: 'Profile updated successfully' });
        }
    });
});




app.use(router);



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
