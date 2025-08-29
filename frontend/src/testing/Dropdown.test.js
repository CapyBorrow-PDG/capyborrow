import { render, screen } from "@testing-library/react";
import Dropdown from "../components/Dropdown/Dropdown";

describe("Dropdown", () => {
  it("the button text matches the given text", () => {
    const { getByTestId } = render(<Dropdown buttontext="test" content={<div></div>} />);
    const buttonText = screen.getByTestId("dropdownbutton").textContent;
    expect(buttonText).toEqual("test");
  });
});