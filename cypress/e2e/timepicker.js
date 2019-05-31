describe("timePicker", () => {
  it("change time value by clicking", () => {
    cy.visit("/");
    cy.getByTestId("input-dp").click();
    cy.getByTestId("toggle-view").click();

    cy.getByTestId("dp__clock")
      .trigger("mousedown", { clientX: 260, clientY: 650 })
      .trigger("mouseup");
    cy.getByTestId("tp__hourPreview")
      .invoke("text")
      .should("equal", "۲۰");

    cy.getByTestId("dp__clock").trigger("mousedown", {
      clientX: 260,
      clientY: 650,
    });
    cy.getByTestId("tp__minutePreview")
      .invoke("text")
      .should("equal", "۴۰");
  });

  it("change time value by dragging", () => {
    cy.visit("/");
    cy.getByTestId("input-dp").click();
    cy.getByTestId("toggle-view").click();
    cy.getByTestId("dp__clock")
      .trigger("mousedown", { clientX: 409, clientY: 289 })
      .trigger("mousemove", { clientX: 260, clientY: 650 })
      .trigger("mouseup");

    cy.getByTestId("tp__hourPreview")
      .invoke("text")
      .should("equal", "۲۰");
    cy.getByTestId("dp__clock")
      .trigger("mousedown", { clientX: 409, clientY: 289 })
      .trigger("mousemove", { clientX: 260, clientY: 650 })
      .trigger("mouseup");
    cy.getByTestId("tp__minutePreview")
      .invoke("text")
      .should("equal", "۴۰");
  });

  it("change time value by touching", () => {
    cy.visit("/");
    cy.getByTestId("input-dp").click();
    cy.getByTestId("toggle-view").click();
    cy.getByTestId("dp__clock")
      .trigger("touchstart")
      .trigger("touchmove", {
        changedTouches: [{ clientX: 260, clientY: 650 }],
      })
      .trigger("touchend");

    cy.getByTestId("tp__hourPreview")
      .invoke("text")
      .should("equal", "۲۰");
  });
});
