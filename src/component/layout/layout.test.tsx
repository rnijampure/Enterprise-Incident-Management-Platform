// src/component/layout/layout.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import Layout from "./layout";

describe("Layout Component", () => {
  it("renders the navigation bar and the footer", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );

    // Check if the NavBar (or specific text in it) is there
    expect(screen.getByRole("banner")).toBeInTheDocument(); // <header>
    expect(screen.getByText(/bottom aligned/i)).toBeInTheDocument();
  });

  it("correctly renders child routes through the Outlet", () => {
    const TestPage = () => <div>Dashboard Content</div>;

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TestPage />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    // This proves the Outlet is working
    expect(screen.getByText("Dashboard Content")).toBeInTheDocument();
  });
});
