import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../firebase/index";

import Logo from "../../components/Logo/Logo";
import classes from "./SellArt.module.css";
import Input from "../../components/UI/Input/Input";
import { updateObject, checkValidation } from "../../shared/utility";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";

const SellArt = (props) => {
  const [forms, setForms] = useState({
    title: {
      name: "Title",
      elementType: "input",
      elementConfig: {
        type: "text",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      placeholder: "The title of your art",
      validText: "Please, enter your title",
    },
    description: {
      name: "description",
      elementType: "textarea",
      elementConfig: {
        type: "text",
      },
      value: "",
      validation: {
        required: true,
        minLength: 100,
      },
      valid: false,
      touched: false,
      placeholder: "Explain your art",
      validText: "Please, enter your description",
    },
    price: {
      name: "Price",
      elementType: "input",
      elementConfig: {
        type: "number",
        min: 1,
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      placeholder: "How much it costs to appreciate your art",
      validText: "Please, enter your art price",
    },
    category: {
      name: "Category",
      elementType: "select",
      elementConfig: {
        type: "select",
        options: [
          {
            value: "abstract",
            displayValue: "Abstract",
          },
          {
            value: "expressionist",
            displayValue: "Expressionist",
          },
          {
            value: "contemporary",
            displayValue: "Contemporary",
          },
          {
            value: "cubism",
            displayValue: "Cubism",
          },
          {
            value: "realist",
            displayValue: "Realist",
          },
          {
            value: "surrealist",
            displayValue: "Surrealist",
          },
        ],
      },
      value: "abstract",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      placeholder: "Please choose your category",
      validText: "Please, choose your category",
    },
    image: {
      name: "Image",
      elementType: "file",
      elementConfig: {
        type: "file",
      },
      value: "",
      images: null,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      placeholder: "Please choose your image for your art",
      validText: "Please, enter your art image",
    },
  });

  const auth = useSelector((state) => state.auth);
  const peoples = useSelector((state) => state.people.peoples[0]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchPeopleInit(auth.token, auth.userId));
  }, [auth, dispatch]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const uploadTask = storage
      .ref(`products/${auth.userId}/${forms.image.images.name}`)
      .put(forms.image.images);
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
            artist: peoples.fullName,
            category: forms.category.value,
            description: forms.description.value,
            imageUrl: downloadUrl,
            price: forms.price.value,
            quantity: 1,
            title: forms.title.value,
            userId: auth.userId,
          };
          dispatch(actions.productAddInit(auth.token, data));
        });
      }
    );
    props.history.push("/setting");
  };

  const inputChangeHandler = (event, id) => {
    setForms(
      updateObject(forms, {
        [id]: updateObject(forms[id], {
          value: event.target.value,
          valid: checkValidation(event.target.value, forms[id].validation),
          validText:
            forms[id].validation.minLength === 100 &&
            "Please, write above 100 words",
          touched: true,
          images: id === "image" && event.target.files[0],
        }),
      })
    );
  };

  const formArray = [];
  for (const key in forms) {
    formArray.push({
      id: key,
      data: { ...forms[key] },
    });
  }

  return (
    <React.Fragment>
      <header className={classes.SellArtHeader}>
        <Logo style={{ display: "block", margin: "auto" }} />
      </header>
      <main className={classes.SellArt}>
        <h1>Sell Your Art</h1>
        <p className={classes.Detail}>You can sell your art in anvaas</p>
        <form onSubmit={onSubmitHandler}>
          {formArray.map((form) => (
            <Input
              key={form.id}
              label={form.data.name}
              elementType={form.data.elementType}
              elementConfig={form.data.elementConfig}
              value={form.data.value}
              invalid={!form.data.valid}
              invalidText={form.data.validText}
              shouldValidate={form.data.validation}
              isTouched={form.data.touched}
              placeholder={form.data.placeholder}
              changed={(event) => inputChangeHandler(event, form.id)}
            />
          ))}
          <Button
            btnType="Success"
            style={{ display: "block", margin: "20px auto", width: "50%" }}
          >
            Upload
          </Button>
        </form>
      </main>
    </React.Fragment>
  );
};

export default SellArt;
