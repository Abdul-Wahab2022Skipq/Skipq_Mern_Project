import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  FormControl,
  FormErrorMessage,
  Input,
  CircularProgress,
} from "@chakra-ui/react";
import axios from "axios";

import "./Registration.css";
import { Light } from "../../utilites/Color";
import Button from "../../component/Button/Button";
import { String } from "../../utilites/String";

function Registration() {
  const url = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  // Validation
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confrim_password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      const fetch = async () => {
        try {
          await axios.post(url + "/auth/register", values);
          navigate("/Login");
          setLoading(false);
        } catch (err) {
          if (err.response.data === "user Found")
            formik.errors.username = err.response.data;
          else if (err.response.data === "email Found")
            formik.errors.email = err.response.data;

          setLoading(false);
        }
      };

      setTimeout(function () {
        if (values.password === values.confrim_password) {
          fetch();
        } else {
          formik.errors.confrim_password = "password not match";
          setLoading(false);
        }
      }, 1000);
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(8, "Must be at least 8").required(),
      confrim_password: Yup.string().min(8, "Must be at least 8").required(),
    }).shape({}),
  });

  return (
    <section className="regbody">
      {loading ? (
        <div className="loading">
          <CircularProgress isIndeterminate color={Light.App} size="100px" />
        </div>
      ) : (
        ""
      )}
      <div className="Appname">
        <span>{String.name}</span>
        <p>
          {String.name} helps you connect and share with people in your life
        </p>
      </div>
      <div className="regformset">
        <form
          className="regform"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <div className="formside">
            {/* name */}
            <FormControl
              style={{
                marginBottom:
                  formik.errors.name && formik.touched.name ? "10px" : "30px",
              }}
              isInvalid={formik.errors.name && formik.touched.name}
            >
              <Input
                className="input"
                style={{
                  borderColor:
                    formik.errors.name && formik.touched.name ? "red" : "black",
                }}
                id="name"
                name="name"
                data-testid="name"
                placeholder="Enter Name"
                {...formik.getFieldProps("name")}
              />
              <FormErrorMessage
                data-testid="error.name"
                style={{ color: "red" }}
              >
                {formik.errors.name}
              </FormErrorMessage>
            </FormControl>
            {/* User Name */}
            <FormControl
              style={{
                marginBottom:
                  formik.errors.username && formik.touched.username
                    ? "10px"
                    : "30px",
              }}
              isInvalid={formik.errors.username && formik.touched.username}
            >
              <Input
                className="input"
                style={{
                  borderColor:
                    formik.errors.username && formik.touched.username
                      ? "red"
                      : "black",
                }}
                id="username"
                name="username"
                data-testid="username"
                placeholder="Enter UserName"
                {...formik.getFieldProps("username")}
              />
              <FormErrorMessage
                data-testid="error.username"
                style={{ color: "red" }}
              >
                {formik.errors.username}
              </FormErrorMessage>
            </FormControl>
            {/* Email */}
            <FormControl
              style={{
                marginBottom:
                  formik.errors.email && formik.touched.email ? "10px" : "30px",
              }}
              isInvalid={formik.errors.email && formik.touched.email}
            >
              <Input
                className="input"
                style={{
                  borderColor:
                    formik.errors.email && formik.touched.email
                      ? "red"
                      : "black",
                }}
                id="email"
                data-testid="email"
                name="email"
                placeholder="Enter Email"
                {...formik.getFieldProps("email")}
              />
              <FormErrorMessage
                data-testid="error.email"
                style={{ color: "red" }}
              >
                {formik.errors.email}
              </FormErrorMessage>
            </FormControl>
            {/* Password */}
            <FormControl
              style={{
                marginBottom:
                  formik.errors.password && formik.touched.password
                    ? "10px"
                    : "30px",
              }}
              isInvalid={formik.errors.password && formik.touched.password}
            >
              <Input
                className="input"
                style={{
                  borderColor:
                    formik.errors.password && formik.touched.password
                      ? "red"
                      : "black",
                }}
                id="password"
                name="password"
                data-testid="password"
                type="password"
                placeholder="Enter Password"
                {...formik.getFieldProps("password")}
              />
              <FormErrorMessage
                data-testid="error.password"
                style={{ color: "red" }}
              >
                {formik.errors.password}
              </FormErrorMessage>
            </FormControl>
            {/* confrim Password */}
            <FormControl
              style={{
                marginBottom:
                  formik.errors.confrim_password &&
                  formik.touched.confrim_password
                    ? "10px"
                    : "30px",
              }}
              isInvalid={
                formik.errors.confrim_password &&
                formik.touched.confrim_password
              }
            >
              <Input
                className="input"
                style={{
                  borderColor:
                    formik.errors.confrim_password &&
                    formik.touched.confrim_password
                      ? "red"
                      : "black",
                }}
                id="confrim_password"
                name="confrim_password"
                type="password"
                placeholder="Enter confrim Password"
                {...formik.getFieldProps("confrim_password")}
              />
              <FormErrorMessage style={{ color: "red" }}>
                {formik.errors.confrim_password}
              </FormErrorMessage>
            </FormControl>
          </div>
          <Button name="Sign up" type="submit" style={{ width: "100%" }} />
        </form>
      </div>
    </section>
  );
}

export default Registration;
