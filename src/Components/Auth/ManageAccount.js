import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../../redux/features/auth/authThunks";
import { MdOutlineModeEdit } from "react-icons/md";


const ManageAccount = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "/default-avatar.png",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    dispatch(updateUser(formData));
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      dispatch(deleteUser(user.id));
    }
  };

  return (
    <div className="manage-account">
      <h2>Manage Account</h2>
      <div className="account-section">
        <label>Avatar:</label>
        <div className="avatar-container">
          <div className="avatar-wrapper">
            <p className="avatar"></p>
            {isEditing && (
              <>
                <label htmlFor="avatar-upload" className="avatar-edit-icon">
                  <MdOutlineModeEdit size={24} />
                    <p className="avatar-caption">Edit Avatar</p>
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
              
              </>
            )}
          </div>
        </div>
      </div>

      <div className="account-section">
        <label>Name:</label>
        {isEditing ? (
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        ) : (
          <p>{user?.name}</p>
        )}
      </div>

      <div className="account-section">
        <label>Email:</label>
        {isEditing ? (
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        ) : (
          <p>{user?.email}</p>
        )}
      </div>

      {isEditing ? (
        <div className="button-cont">
          <button className="primary-btn save-btn" onClick={handleSave}>
            Save Changes
          </button>
          <button className="primary-btn cancel-btn" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="button-cont">
          <button className="primary-btn edit-btn" onClick={() => setIsEditing(true)}>
            Edit Account
          </button>
          <button className="primary-btn delete-btn" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageAccount;
