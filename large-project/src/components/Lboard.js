import React, { useState, useEffect } from "react";
import "./styles.css";
import "./Leader.css";

const Lboard = () => {
  const [users, setUsers] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const fetchUsers = async () => {
    const response = await fetch(
      "http://critterhunt.herokuapp.com/api/users/rank"
    );
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderUsers = () => {
    // find the top three users based on overall ranking
    const topThreeUsers = users.slice(0, 3);
    return users.slice(startIndex, startIndex + 10).map((item, index) => {
      const isTopThree = topThreeUsers.some((user) => user._id === item._id);
      const rowClass = isTopThree ? (index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : "") : "";
      return (
        <tr key={item._id} className={rowClass}>
          <td>{startIndex + index + 1}</td>
          <td style={{ width: "400px" }}>{item.username}</td>
          <td>{item.numPosts}</td>
        </tr>
      );
    });
  };

  const handlePrevClick = () => {
    setStartIndex(Math.max(startIndex - 10, 0));
  };

  const handleNextClick = () => {
    setStartIndex(Math.min(startIndex + 10, users.length - 10));
  };

  return (
      <div className="container">
        <h1 className="title"></h1>
        {users.length > 0 ? (
          <div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Number of Posts</th>
                  </tr>
                </thead>
                <tbody>{renderUsers()}</tbody>
              </table>
            </div>
            <div className="buttons">
              <button onClick={handlePrevClick} disabled={startIndex === 0}>
                Prev
              </button>
              <button
                onClick={handleNextClick}
                disabled={startIndex + 10 >= users.length}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p className="loading">Loading...</p>
        )}
      </div>
    );

};

export default Lboard;
