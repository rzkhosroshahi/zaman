import * as React from "react";
import { cleanup, render, fireEvent } from "react-testing-library";
import { Modal } from "../modal";

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
    const { container, getByTestId } = render(
      <Modal isOpen={true}>
        <p>Hello world</p>
      </Modal>,
    );
    expect(container.textContent).toBe("Hello world");

    const overlay = getByTestId("overlay");
    fireEvent.click(overlay);

    expect(container.textContent).not.toBe("Hello world");
  });
});
