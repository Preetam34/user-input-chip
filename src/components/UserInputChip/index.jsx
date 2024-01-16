import React, { useState } from "react";
import user1 from "../../assets/user1.avif";
import user2 from "../../assets/user2.jpg";
import user3 from "../../assets/user3.avif";
import user4 from "../../assets/user4.avif";
import user5 from "../../assets/user5.avif";
import user6 from "../../assets/user6.avif";
import user7 from "../../assets/user7.avif";
import user8 from "../../assets/user8.avif";
import user9 from "../../assets/user9.avif";
import user10 from "../../assets/user10.avif";
import "./style.css";
const UserInputChip = () => {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      profilePic: user1,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      profilePic: user2,
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      profilePic: user3,
    },
    {
      id: 4,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      profilePic: user4,
    },
    {
      id: 5,
      name: "Eva Miller",
      email: "eva.miller@example.com",
      profilePic: user5,
    },
    {
      id: 6,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      profilePic: user6,
    },
    {
      id: 7,
      name: "Grace Davis",
      email: "grace.davis@example.com",
      profilePic: user7,
    },
    {
      id: 8,
      name: "Daniel White",
      email: "daniel.white@example.com",
      profilePic: user8,
    },
    {
      id: 9,
      name: "Olivia Taylor",
      email: "olivia.taylor@example.com",
      profilePic: user9,
    },
    {
      id: 10,
      name: "Samuel Turner",
      email: "samuel.turner@example.com",
      profilePic: user10,
    },
  ]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setUsers(filtered);
  };

  const handleInputClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setUsers([...selectedUsers, ...users]);
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
      <h3 className="dropdown-title">Pick Users</h3>
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
            <li key={user.id} onClick={() => handleUserSelect(user)}>
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
