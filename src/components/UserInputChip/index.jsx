import React, { useState } from "react";
import userData from "./userData";
import "./style.css";
const UserInputChip = () => {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState(userData);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleInputChange = (event) => {
    let value = event.target.value;
    setInputValue(value);

    if (!value.trim()) {
      setUsers(userData);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setUsers(filtered);
    }
  };

  const handleInputClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setUsers(userData);
    }
  };

  const handleUserSelect = (user) => {
    setInputValue("");
    setSelectedUsers([...selectedUsers, user]);
    setUsers(users.filter((u) => u.id !== user.id));
  };

  const handleChipRemove = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    setUsers([...users, user]);
  };

  return (

  
    <div className="user-dropdown-container">
      <h2 className="dropdown-title">Pick Users</h2>
      <div className="selected-chips-container">
        {selectedUsers.map((user) => (
          <div
            key={"user-" + user.id}
            className="chip"
            onClick={() => handleChipRemove(user)}
          >
            <img
              src={user.profilePic}
              alt={user.name}
              className="profile-icon-chip"
            />
            {user.name}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="cross-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
        placeholder="Add a new user...."
        className="input-field"
      />
      {isDropdownOpen && (
        <ul className="dropdown-list">
          {users.map((user) => (
            <li key={"user-" + user.id} onClick={() => handleUserSelect(user)}>
              <img
                className="profile-icon"
                src={user.profilePic}
                alt={user.name}
              />
              <span className="user-name">{user.name} </span>
              <span className="user-email"> {user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserInputChip;
