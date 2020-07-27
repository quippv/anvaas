import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, Route } from "react-router-dom";
import { storage } from "../../firebase/index";

import Toolbar from "../../components/Toolbar/Toolbar";
import classes from "./Setting.module.css";
import maleAvatarImage from "../../assets/images/male-avatar.png";
import Button from "../../components/UI/Button/Button";
import { Edit } from "@material-ui/icons";
import Input from "../../components/UI/Input/Input";
import { updateObject } from "../../shared/utility";
import Modal from "../../components/UI/Modal/Modal";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import Portfolio from "./Portfolio/Portfolio";

const Setting = (props) => {
  const [people, setPeople] = useState({
    fullName: {
      title: "Full Name",
      value: "",
    },
    gender: {
      title: "Gender",
      value: "",
    },
    birthDay: {
      title: "Birthday",
      value: "",
    },
    phoneNumber: {
      title: "Phone Number",
      value: "",
    },
    artist: false,
  });

  const [openModal, setOpenModal] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const { peoples } = props;

  useEffect(() => {
    if (peoples && people.gender.value === "") {
      setPeople(
        updateObject(people, {
          fullName: updateObject(people.fullName, {
            value: peoples.fullName,
          }),
          gender: updateObject(people.gender, {
            value: peoples.gender,
          }),
          birthDay: updateObject(people.birthDay, {
            value: peoples.birthDay,
          }),
          phoneNumber: updateObject(people.phoneNumber, {
            value: peoples.phoneNumber,
          }),
          artist: peoples.artist,
        })
      );
      setImageUrl(peoples.imageUrl);
    }
  }, [peoples, people]);

  const gotoHomeHandler = () => {
    props.history.push("/");
  };

  const openModalHandler = (event, image) => {
    setOpenModal(!openModal);
    const fullName = peoples && peoples.fullName;
    if (openModal) {
      setPeople(
        updateObject(people, {
          fullName: updateObject(people.fullName, {
            value: fullName,
          }),
        })
      );
    }
    image ? setIsImage(true) : setIsImage(false);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      artist: peoples.artist,
      birthDay: peoples.birthDay,
      fullName: people.fullName.value,
      gender: peoples.gender,
      phoneNumber: peoples.phoneNumber,
      userId: peoples.userId,
      id: peoples.id,
      imageUrl: imageUrl,
    };
    props.onEditPeople(props.token, data, peoples.id);
    setOpenModal(!openModal);
  };

  const onUploadHandler = (event) => {
    event.preventDefault();
    const uploadTask = storage
      .ref(`peoples/${peoples.userId}/${imageUrl.name}`)
      .put(imageUrl);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function...
        // const progress = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
      },
      (error) => {
        // error function...
        console.log(error);
      },
      () => {
        // complete function...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          const data = {
            artist: peoples.artist,
            birthDay: peoples.birthDay,
            fullName: people.fullName.value,
            gender: peoples.gender,
            phoneNumber: peoples.phoneNumber,
            userId: peoples.userId,
            id: peoples.id,
            imageUrl: downloadUrl,
          };
          props.onEditPeople(props.token, data, peoples.id);
        });
      }
    );
    setOpenModal(!openModal);
  };

  const inputChangeHandler = (event) => {
    setPeople(
      updateObject(people, {
        fullName: updateObject(people.fullName, {
          value: event.target.value,
        }),
      })
    );
  };

  const inputUploadHandler = (event) => {
    setImageUrl(event.target.files[0]);
  };

  const arrayPeoples = [];
  for (const key in people) {
    arrayPeoples.push({
      id: key,
      data: {
        ...people[key],
        artist: people.artist,
      },
    });
  }

  const onShowPortfolio = () => {
    props.history.replace("/setting/portfolio");
  };

  return (
    <React.Fragment>
      <Toolbar notMain="true" gotoHomeHandler={gotoHomeHandler} />
      <main className={classes.Setting}>
        <div className={classes.SettingLeft}>
          {props.loading ? (
            <Spinner />
          ) : (
            <img src={!imageUrl ? maleAvatarImage : imageUrl} alt="avatar" />
          )}
          <Button
            btnType="SignUp"
            clicked={(event) => openModalHandler(event, true)}
          >
            Change Profile Picture
          </Button>
        </div>
        <div className={classes.SettingRight}>
          {props.loading ? (
            <Spinner />
          ) : (
            arrayPeoples.map((people) => (
              <div key={people.id} className={classes.Row}>
                <h4>{people.data.title}</h4>
                <h3>
                  {people.data.value}{" "}
                  {people.id === "fullName" ? (
                    !people.data.artist ? (
                      <span onClick={(event) => openModalHandler(event, false)}>
                        <Edit
                          style={{
                            fontSize: 12,
                            marginLeft: 10,
                            cursor: "pointer",
                          }}
                        />
                      </span>
                    ) : null
                  ) : null}
                </h3>
              </div>
            ))
          )}
          <p>
            {!people.artist && "Are you an artist? "}
            {people.artist && <NavLink to="/sell">Sell art!</NavLink>}
            {!people.artist && <NavLink to="/agreement">Sell art!</NavLink>}
          </p>
          {people.artist && (
            <p
              style={{ cursor: "pointer", marginTop: 8 }}
              onClick={onShowPortfolio}
            >
              Click to show portfolio
            </p>
          )}
        </div>
      </main>
      <Route path={props.match.path + "/portfolio"} component={Portfolio} />
      <Modal showed={openModal} canceled={openModalHandler}>
        {isImage ? (
          <form onSubmit={onUploadHandler}>
            <Input
              label="Profile Picture"
              elementType="file"
              elementConfig={{ type: "file" }}
              placeholder="Change your profile picture"
              changed={inputUploadHandler}
            />
            <Button btnType="SignUp">Upload</Button>
          </form>
        ) : (
          <form onSubmit={onSubmitHandler}>
            <Input
              label="Change Fullname"
              elementType="input"
              elementConfig={{ type: "text" }}
              placeholder="Change your full name"
              value={people.fullName.value}
              changed={inputChangeHandler}
            />
            <Button btnType="SignUp">Change</Button>
          </form>
        )}
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    peoples: state.people.peoples[0],
    token: state.auth.token,
    loading: state.people.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditPeople: (token, data, id) =>
      dispatch(actions.editPeople(token, data, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
