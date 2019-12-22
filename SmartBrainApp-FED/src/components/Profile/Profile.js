import React, { useState } from 'react';
import './Profile.css';
import Api from '../../api/Api';

const Profile = ({ loadUser, toggleModal, user }) => {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [pet, setPet] = useState(user.pet);

  const updateProfile = () =>
    Api.updateProfile({ id: user.id, name, age, pet }).then(resp => {
      toggleModal();
      loadUser({ ...user, name, age, pet });
    });

  return (
    <div className="profile-modal">
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="h3 w3 dib"
            alt="avatar"
          />
          <h1>{name}</h1>
          <h4>Images Submitted: 5</h4>
          <p>Member since: January</p>
          <hr />
          <label className="mt2 fw6" htmlFor="name">
            Name :
          </label>
          <input
            className="pa2 ba w-100"
            placeholder={name}
            type="text"
            name="user-name"
            id="name"
            onChange={event => setName(event.target.value)}
          />
          <label className="mt2 fw6" htmlFor="name">
            Age :
          </label>
          <input
            className="pa2 ba w-100"
            placeholder={age}
            type="text"
            name="user-age"
            id="age"
            onChange={event => setAge(event.target.value)}
          />
          <label className="mt2 fw6" htmlFor="name">
            Pet :
          </label>
          <input
            className="pa2 ba w-100"
            placeholder={pet}
            type="text"
            name="user-pet"
            id="pet"
            onChange={event => setPet(event.target.value)}
          />
          <div
            className="mt4"
            style={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
              onClick={updateProfile}
            >
              Save
            </button>
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
              onClick={toggleModal}
            >
              Cancel
            </button>
          </div>
        </main>
        <div className="modal-close" onClick={toggleModal}>
          &times;
        </div>
      </article>
    </div>
  );
};

export default Profile;
