import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomVehicleSelect from "@/components/CustomVehicleSelect";
import CustomDateTimePicker from "@/components/CustomDateTimePicker";

describe("CustomVehicleSelect component", () => {
  it("renders default selected vehicle", () => {
    render(<CustomVehicleSelect value="innova-crysta" onChange={() => {}} />);
    expect(screen.getByText("Toyota Innova Crysta")).toBeInTheDocument();
  });

  it("opens popover on click and lists fleet vehicles", () => {
    const handleChange = jest.fn();
    render(<CustomVehicleSelect value="innova-crysta" onChange={handleChange} />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    expect(screen.getByText("Select Commercial Fleet")).toBeInTheDocument();
    expect(screen.getByText("Swift Dzire / Toyota Etios")).toBeInTheDocument();
    expect(screen.getByText("Force Tempo Traveller (12/17 Seater)")).toBeInTheDocument();

    // Click another vehicle
    fireEvent.click(screen.getByText("Swift Dzire / Toyota Etios"));
    expect(handleChange).toHaveBeenCalledWith("dzire-etios");
  });
});

describe("CustomDateTimePicker component", () => {
  it("displays formatted date and time", () => {
    render(
      <CustomDateTimePicker
        travelDate="2026-11-20"
        travelTime="06:00 AM"
        onDateChange={() => {}}
        onTimeChange={() => {}}
      />
    );

    expect(screen.getByText(/20 Nov.*06:00 AM/)).toBeInTheDocument();
  });

  it("opens popover and allows quick shortcuts and time change", () => {
    const handleDateChange = jest.fn();
    const handleTimeChange = jest.fn();

    render(
      <CustomDateTimePicker
        travelDate="2026-11-20"
        travelTime="06:00 AM"
        onDateChange={handleDateChange}
        onTimeChange={handleTimeChange}
      />
    );

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    expect(screen.getByText("Quick:")).toBeInTheDocument();
    expect(screen.getByText("Tomorrow")).toBeInTheDocument();

    // Click quick time
    fireEvent.click(screen.getByText("09:00 AM"));
    expect(handleTimeChange).toHaveBeenCalledWith("09:00 AM");

    // Click Apply Schedule
    fireEvent.click(screen.getByText("Apply Schedule"));
  });
});
