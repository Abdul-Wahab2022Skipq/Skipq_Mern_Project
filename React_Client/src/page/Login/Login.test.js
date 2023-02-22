import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

import Login from "./Login.js";

// check the title name of page
test("Title Text", () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const child = screen.getByText(
    "Funbook helps you connect and share with people in your life"
  );
  expect(child).toBeInTheDocument();
  cleanup();
});

// check the valid email
test("Valid email", async () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const emailinput = screen.getByTestId("email");
  expect(emailinput.value).toBe("");
  fireEvent.change(emailinput, { target: { value: "name@name.com" } });
  expect(emailinput.value).toBe("name@name.com");
  cleanup();
});

// check the unvalid email
test("invalid email", async () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const emailinput = screen.getByTestId("email");
  fireEvent.change(emailinput, { target: { value: "name.com" } });
  expect(emailinput.value).toBe("name.com");

  const button = screen.getByText("Log in");
  fireEvent.click(button);

  const validationErrors = await screen.findByTestId("error.email");
  expect(validationErrors.innerHTML).toBe("email must be a valid email");
  cleanup();
});

// check the valid password
test("valid password", () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const passwordinput = screen.getByTestId("password");
  fireEvent.change(passwordinput, { target: { value: "12345678" } });
  expect(passwordinput.value).toBe("12345678");
  cleanup();
});

// check the unvalid password
test("invalid password", async () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const passwordinput = screen.getByTestId("password");
  fireEvent.change(passwordinput, { target: { value: "123456" } });
  expect(passwordinput.value).toBe("123456");

  const button = screen.getByText("Log in");
  fireEvent.click(button);

  const validationErrors = await screen.findByTestId("error.password");
  expect(validationErrors.innerHTML).toBe("Must be at least 8");
  cleanup();
});

// fetch user data
test("fetch User data", async () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const userCredential = { email: "wahab@gmail.com", password: "1234567890" };
  const result = await axios.post(
    "http://localhost:9002/api/auth/login",
    userCredential
  );
  expect(result.data.email).toBe("wahab@gmail.com");
  expect(result.data.username).toBe("wahab");
});
