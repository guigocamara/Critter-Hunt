import React from 'react';
function LoggedInName() {
  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);
  //var favorite = ud.favorite;
  var username = ud.username;
  //var password = ud.password;
  const doLogout = event => {
    event.preventDefault();
    localStorage.removeItem("user_data")
    window.location.href = '/';
  };
  return (
    <div id="loggedInDiv">
      <span id="userName">Logged In As {username}</span><br />
      <button type="button" id="logoutButton" class="buttons"
        onClick={doLogout}> Log Out </button>
    </div>
  );
};
export default LoggedInName;