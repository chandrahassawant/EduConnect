import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import chan from "../Auth/chan.jpg";

const Teacherregister = () => {
    const navigate = useNavigate();

  
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        schoolName: '',
        address: '',
        MobileNumber: ''
    });

   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3100/api/register/teacher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(data);
            setFormData({
                firstname: '',
                lastname: '',
                schoolName: '',
                MobileNumber: '',
                address: ''
            });
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form className="input" onSubmit={handleSubmit}>
            <div className="task flex flex-wrap gap-4 px-4" style={{ backgroundColor: '#f5f5f5', borderRadius: '10px', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundImage: `url(${chan})`, backgroundSize: 'cover' }}>

                <div className="form-group flex flex-col w-full sm:w-1/2 md:w-1/3" style={{ marginTop: '30px' }}>
                    <label htmlFor="firstName" className="mb-2" style={{ color: '#333', fontWeight: 'bold' }}>First Name</label>
                    <input type="text" id="firstName" name="firstname" className="px-4 py-2 border rounded" style={{ width: '330px', marginLeft: '45px', borderColor: '#007bff' }} value={formData.firstname} onChange={handleInputChange} />
                </div>

                <div className="form-group flex flex-col w-full sm:w-1/2 md:w-1/3" style={{ marginTop: '30px' }}>
                    <label htmlFor="lastName" className="mb-2" style={{ color: '#333', fontWeight: 'bold' }}>Last Name</label>
                    <input type="text" id="lastName" name="lastname" className="px-4 py-2 border rounded" style={{ width: '330px', marginLeft: '45px', borderColor: '#007bff' }} value={formData.lastname} onChange={handleInputChange} />
                </div>

                <div className="form-group flex flex-col w-full sm:w-1/2 md:w-1/3">
                    <label htmlFor="schoolName" className="mb-2" style={{ color: '#333', fontWeight: 'bold' }}>School</label>
                    <select id="schoolName" name="schoolName" className="px-4 py-2 border rounded" style={{ width: '330px', marginLeft: '45px', borderColor: '#007bff' }} value={formData.schoolName} onChange={handleInputChange}>
                        <option value="">Select school</option>
                        <option value="Z.P.kudal">Z.P.kudal</option>
                        <option value="Z.P.kankavli">Z.P.kankavli</option>
                        <option value="Z.P.vengual">Z.P.vengual</option>
                        <option value="Z.P.avalegaon">Z.P.avalegaon</option>
                        <option value="Z.P.Digas">Z.P.Digas</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group flex flex-col px-4 mt-4" style={{ width: '30%', marginTop: '30px' }}>
                    <label htmlFor="Mobile" className="mb-2" style={{ color: '#333', fontWeight: 'bold' }}>Mobile Number</label>
                    <input
                        type="text"
                        id="Mobile"
                        name="MobileNumber"
                        value={formData.MobileNumber}
                        onChange={handleInputChange}
                        className="px-4 py-2 border rounded"
                        style={{ borderColor: '#007bff' }} // Blue border color
                    />
                </div>

                <div className="form-group flex flex-col w-full sm:w-1/2 md:w-1/3">
                    <label htmlFor="address" className="mb-2" style={{ color: '#333', fontWeight: 'bold' }}>Address</label>
                    <input type="text" id="address" name="address" className="px-4 py-2 border rounded" style={{ width: '330px', marginLeft: '45px', borderColor: '#007bff' }} value={formData.address} onChange={handleInputChange} />
                </div>

                <div className="form-group flex flex-col w-full sm:w-1/2 md:w-1/3" style={{ marginLeft: '950px', marginTop: '100px' }}>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" style={{ width: '330px', backgroundColor: '#007bff' ,marginRight: "600px",marginLeft: "-420px",marginTop: "-70px"}}>Submit</button>
                </div>

            </div>
        </form>
    );
};

export default Teacherregister;
