import * as React from "react";
import { cleanup, render, fireEvent } from "react-testing-library";
import { Modal } from "../components/Modal";

describe("modal tests", () => {
  afterEach(cleanup);
  test("when isOpen is false ", () => {
    const { container } = render(
      <Modal>
        <p>Hello world</p>
      </Modal>,
    );
    expect(container.textContent).not.toBe("Hello world");
  });

  test("when clicked on overlay ", () => {
    const mockVoid = jest.fn();
    const { getByTestId } = render(
      <Modal isOpen={true} toggleOpen={mockVoid}>
        <p>Hello world</p>
      </Modal>,
    );

    const overlay = getByTestId("overlay");
    fireEvent.click(overlay);

    expect(mockVoid).toHaveBeenCalledTimes(1);
  });
});
