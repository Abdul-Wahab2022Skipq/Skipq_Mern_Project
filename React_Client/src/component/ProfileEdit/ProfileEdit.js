import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

import "./ProfileEdit.css";
import noAvatar from "../../assets/noAvatar.png";
import Button from "../Button/Button";

function ProfileEdit({ close, user }) {
  const url = process.env.REACT_APP_API_URL;
  const PF = process.env.REACT_APP_IMAGES;
  const [file, setFile] = React.useState(null);
  const bio = React.useRef();
  const name = React.useRef();
  const city = React.useRef();
  const country = React.useRef();
  const relationship = React.useRef();

  const UpdateProfileHandle = () => {
    const updateuser = {
      userId: user._id,
      name: name.current.value,
      bio: bio.current.value,
      city: city.current.value,
      country: country.current.value,
      relationShip: relationship.current.value,
    };
    console.log(updateuser);
    try {
      axios.put(url + "/user/" + user._id, updateuser);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="pBackbox">
      <div className="pbox">
        <div className="profileEditTop">
          <label>Edit Profile</label>
          <CloseIcon className="editpostclose" onClick={close} />
        </div>
        <hr />
        <div>
          {/* Profile Picture */}
          <div className="Editprofileset">
            <div className="profileedittext">
              <label>Profile Picture</label>
              <Button
                htmlFor="file"
                name="Edit"
                style={{ fontSize: "14px", padding: "10px" }}
              />
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <span>
              <img
                src={user.profilePicture ? PF + user.profilePicture : noAvatar}
                alt=""
              />
            </span>
          </div>
          {/* Profile Bio */}
          <div className="Editprofileset">
            <div className="profileedittext">
              <label>Bio</label>
            </div>
            <div className="bioedit">
              <input
                placeholder="Enter Bio ?"
                defaultValue={user.bio}
                ref={bio}
              />
            </div>
          </div>
          {/* Profile information */}
          <div className="Editprofileset">
            <div className="profileedittext">
              <label>Information</label>
            </div>
            <div className="infoedit">
              <div className="inputEdit">
                <div>Name: </div>
                <input
                  placeholder="Enter Name ?"
                  defaultValue={user.name}
                  ref={name}
                />
              </div>
              <div className="inputEdit">
                <div>city: </div>
                <input
                  placeholder="Enter city ?"
                  defaultValue={user.city}
                  ref={city}
                />
              </div>
              <div className="inputEdit">
                <div>country: </div>
                <input
                  placeholder="Enter country ?"
                  defaultValue={user.country}
                  ref={country}
                />
              </div>
              <div className="inputEdit">
                <div>relationShip: </div>
                <select defaultValue={user.relationShip} ref={relationship}>
                  <option value="">----</option>
                  <option value="1">Single</option>
                  <option value="2">Married</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <Button
          name="save"
          style={{ margin: "10px 0", width: "100%" }}
          onClick={UpdateProfileHandle}
        />
      </div>
    </div>
  );
}

export default ProfileEdit;
