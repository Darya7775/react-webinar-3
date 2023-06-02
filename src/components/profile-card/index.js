import React from "react";

function ProfileCard(props) {
  return(
    <section>
      <h2>Профиль</h2>
      <div>Имя: <span>{props.profile.name}</span></div>
      <div>Телефон: <span>{props.profile.phone}</span></div>
      <div>email: <span>{props.user.email}</span></div>
    </section>
  );
}

export default ProfileCard;
