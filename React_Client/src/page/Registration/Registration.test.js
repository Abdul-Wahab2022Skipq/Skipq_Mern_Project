import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import Registration from "./Registration";
import { BrowserRouter as Router } from "react-router-dom";

// check the valid name
test("Valid name", () => {
  render(
    <Router>
      <Registration />
    </Router>
  );
  const emailinput = screen.getByTestId("name");
  fireEvent.change(emailinput, { target: { value: "name" } });
  expect(emailinput).toHaveValue("name");
  cleanup();
});

// check the valid username
test("Valid username", () => {
  render(
    <Router>
      <Registration />
    </Router>
  );
  const emailinput = screen.getByTestId("username");
  fireEvent.change(emailinput, { target: { value: "username" } });
  expect(emailinput).toHaveValue("username");
  cleanup();
});

// check the valid email
test("Valid email", () => {
  render(
    <Router>
      <Registration />
    </Router>
  );
  const emailinput = screen.getByTestId("email");
  fireEvent.change(emailinput, { target: { value: "name@name.com" } });
  expect(emailinput).toHaveValue("name@name.com");
  cleanup();
});

// check the unvalid email
test("invalid email", async () => {
  render(
    <Router>
      <Registration />
    </Router>
  );
  const emailinput = screen.getByTestId("email");
  fireEvent.change(emailinput, { target: { value: "name.com" } });
  expect(emailinput).toHaveValue("name.com");

  const button = screen.getByText("Sign up");
  fireEvent.click(button);

  const validationErrors = await screen.findByTestId("error.email");
  expect(validationErrors.innerHTML).toBe("email must be a valid email");
  cleanup();
});

// check the valid password
test("valid password", () => {
  render(
    <Router>
      <Registration />
    </Router>
  );
  const emailinput = screen.getByTestId("password");
  fireEvent.change(emailinput, { target: { value: "12345678" } });
  expect(emailinput).toHaveValue("12345678");
  cleanup();
});

// check the unvalid password
test("invalid password", async () => {
  render(
    <Router>
      <Registration />
    </Router>
  );
  const emailinput = screen.getByTestId("password");
  fireEvent.change(emailinput, { target: { value: "123456" } });
  expect(emailinput).toHaveValue("123456");

  const button = screen.getByText("Sign up");
  fireEvent.click(button);

  const validationErrors = await screen.findByTestId("error.password");
  expect(validationErrors.innerHTML).toBe("Must be at least 8");
  cleanup();
});
