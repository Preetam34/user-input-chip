import React, { useState, useEffect } from "react";
import userData from "./userData";
import "./style.css";

const UserInputChip = () => {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState(userData);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filteredDropdownUsers, setFilteredDropdownUsers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setFilteredDropdownUsers(
      users.filter(
        (user) =>
          !selectedUsers.some((selectedUser) => selectedUser.id === user.id)
      )
    );
  }, [users, selectedUsers]);

  const renderHighlightedText = (text, inputValue) => {
    if (!inputValue.trim()) {
      return text;
    }

    const regex = new RegExp(`(${inputValue})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span key={index} style={{ color: "blue", fontWeight: "bold" }}>
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (!value.trim()) {
      setFilteredDropdownUsers(
        users.filter(
          (user) =>
            !selectedUsers.some((selectedUser) => selectedUser.id === user.id)
        )
      );
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(value.toLowerCase()) &&
          !selectedUsers.some((selectedUser) => selectedUser.id === user.id)
      );
      setFilteredDropdownUsers(filtered);
    }
  };

  const handleInputClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleUserSelect = (user) => {
    setInputValue("");
    setSelectedUsers([...selectedUsers, user]);
  };

  const handleChipRemove = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
  };

  return (
    <div className="user-dropdown-container">
      <h2 className="dropdown-title">Pick Users</h2>
      <div className="adjust-size">
        <div className="selected-chips-container">
          {selectedUsers.map((user) => (
            <div
              key={user.id}
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
        <div style={{ position: "relative" }}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onClick={handleInputClick}
            placeholder="Add a new user...."
            className="input-field"
          />
          {isDropdownOpen && filteredDropdownUsers.length > 0 && (
            <ul className="dropdown-list">
              {filteredDropdownUsers.map((user) => (
                <li
                  key={"user-" + user.id}
                  onClick={() => {
                    handleUserSelect(user);
                    handleInputClick();
                  }}
                >
                  <img
                    className="profile-icon"
                    src={user.profilePic}
                    alt={user.name}
                  />
                  <span className="user-name">
                    {renderHighlightedText(user.name, inputValue)}
                  </span>
                  <span className="user-email"> {user.email}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInputChip;
