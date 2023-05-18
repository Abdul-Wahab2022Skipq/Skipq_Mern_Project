import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormErrorMessage,
  Input,
  CircularProgress,
} from "@chakra-ui/react";

import "./Login.css";
import { Light } from "../../utilites/Color";
import { String } from "../../utilites/String";
import Button from "../../component/Button/Button";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../apiCall";

const Login = () => {
  const { isFetching, error, dispatch } = React.useContext(AuthContext);
  // Registration page
  const navigate = useNavigate();
  // Validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      login: "",
    },
    onSubmit: (values) => {
      try {
        loginCall({ email: values.email, password: values.password }, dispatch);
        if (error.response.data) {
          formik.errors.email = "Email wrong";
          formik.errors.password = "Password wrong";
        }
      } catch (err) {
        console.log(err);
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(8, "Must be at least 8").required(),
    }),
  });

  return (
    <section className="logbody">
      {isFetching ? (
        <div className="loading">
          <CircularProgress isIndeterminate color={Light.App} size="100px" />
        </div>
      ) : (
        ""
      )}

      {/* Name */}
      <div className="Appname">
        <span>{String.name}</span>
        <p>
          {String.name} helps you connect and share with people in your life
        </p>
        <p>email: wahab@gmail.com</p>
        <p>password: 1234567890</p>
      </div>
      {/* Login Box */}
      <div className="logboxset">
        <div className="logbox">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
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
              <FormErrorMessage data-testid="error.email" className="errorset">
                {formik.errors.email}
              </FormErrorMessage>
            </FormControl>
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
                className="errorset"
              >
                {formik.errors.password}
              </FormErrorMessage>
            </FormControl>
            {/* Login Button */}
            <Button
              name={formik.errors.login ? formik.errors.login : "Log in"}
              type="submit"
              style={{ width: "100%" }}
            />
          </form>
          <div
            style={{
              cursor: "pointer",
              color: Light.App,
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Forget password ?
          </div>
          {/* Line */}
          <div className="linelogin" />
          <Button
            name="Create New Account"
            onClick={() => navigate("/Registration")}
            style={{ backgroundColor: "green" }}
          />
        </div>
      </div>
    </section>
  );
};
export default Login;
