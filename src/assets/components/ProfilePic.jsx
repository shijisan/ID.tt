import React, { useRef, useState, useEffect } from 'react';

function ProfilePic() {
  const fileInputRef = useRef(null); // Reference to the file input
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file
  const [profilePic, setProfilePic] = useState(''); // State for the profile picture URL

  useEffect(() => {
    // Fetch the profile picture URL using the LRN
    const fetchProfilePic = async () => {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

      try {
        const response = await fetch('http://localhost:3000/api/profilepic', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include JWT token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile picture');
        }

        const data = await response.json();
        setProfilePic(data.imageUrl); // Set the profile picture URL

      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    fetchProfilePic();
  }, []);

  // Function to handle file selection
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData();
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    if (selectedFile) {
      formData.append('userImage', selectedFile);

      try {
        const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`, // Include JWT token in the Authorization header
          },
          body: formData
        });

        if (!response.ok) {
          throw new Error('File upload failed');
        }

        const text = await response.text();
        alert(text); // Show success message
        setSelectedFile(null); // Clear selected file
        setProfilePic(''); // Clear profile picture URL
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during file upload');
      }
    } else {
      alert('Please select a file to upload');
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-center">
        <div
          className="profile-pic-container"
          onClick={() => fileInputRef.current.click()} // Trigger file input click
        >
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="profile-pic"
              style={{ cursor: 'pointer' }} // Show a pointer cursor for clicking
            />
          ) : (
            <div className="placeholder" style={{ cursor: 'pointer' }}>
              Click to select image
            </div>
          )}
        </div>
        <input
          type="file"
          id="fileInput"
          name="userImage"
          accept="image/*"
          className="d-none" // Hide file input
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
      {selectedFile && (
        <div className="d-flex justify-content-center mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Upload Image
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePic;
