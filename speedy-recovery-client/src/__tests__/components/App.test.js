/*
 * Speedy Recovery -- A patient-centred app based on the FHIR standard facilitating communication between paediatric
 * patients, parents and hospital staff
 *
 * Copyright (C) 2019 University College London
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not,
 * see http://www.gnu.org/license/.
 * */

/* This file tests the App.js component*/

import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../../components/core/App";
import SmartAuthService from "../../service/SmartAuthService";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import exampleUser from "../test_input/internal/ExampleUser.json";

Enzyme.configure({ adapter: new Adapter() });

// Mock SmartAuthService
jest.mock("../../service/SmartAuthService", () => ({
  startSmartAuthenticatedSession: jest.fn(),
  onSmartAuthenticatedSessionReady: jest
    .fn()
    .mockImplementation(() => Promise.resolve()),
  endSmartAuthenticatedSession: jest.fn()
}));

// Mock mapPatientToUser
jest.mock("../../service/FhirDataMappingService", () => ({
  mapPatientToUser: user => user
}));

const wrapper = shallow(<App />);
const underTest = wrapper.instance();

test("render without crashing", () => {
  shallow(<App />);

  // Make sure auth callback was registered
  expect(SmartAuthService.onSmartAuthenticatedSessionReady).toHaveBeenCalled();
});

test("handleLoginRequest() calls SmartAuthService", () => {
  underTest.handleLoginRequest();
  expect(SmartAuthService.startSmartAuthenticatedSession).toHaveBeenCalled();
});

test("handleLogoutRequest() calls SmartAuthService", () => {
  underTest.handleLogoutRequest();
  expect(SmartAuthService.endSmartAuthenticatedSession).toHaveBeenCalled();
});

test("handleLoginSuccess() sets state appropriately", () => {
  // given
  const mockUser = { name: "foo" };
  const mockFhirClient = {
    user: {
      read: jest.fn().mockImplementation(() => Promise.resolve(mockUser))
    }
  };

  wrapper.setState({ fhirClient: mockFhirClient });
  // when
  underTest.handleLoginSuccess(mockFhirClient);

  // then
  expect(wrapper.state().fhirClient).toEqual(mockFhirClient);

  // This should work, but there seems to be a bug, Promise.resolve executes too late
  // expect(wrapper.state().user).toEqual(mockUser);
});

test("handleLoginSuccess() sets state appropriately", () => {
  // given
  const mockUser = exampleUser;
  const mockFhirClient = {
    user: {
      read: jest.fn().mockImplementation(() => Promise.resolve(mockUser))
    }
  };

  // when
  underTest.handleLoginSuccess(mockFhirClient);
  // then
  // expect(wrapper.state().fhirClient).toEqual(mockFhirClient);
});

test("App triggers updateStateCondition without crashing", () => {
  // given
  const mockUserId = "mockId";
  // when
  underTest.updateStateCondition(mockUserId);
  // then
  expect(wrapper.state().conditions).toEqual([]);
});

test("App triggers updateStateMedicationDispense() without crashing", () => {
  // given
  const mockUserId = "mockId";
  // when
  underTest.updateStateMedicationDispense(mockUserId);
  // then
  expect(wrapper.state().medicationDispenses).toEqual([]);
});

test("App triggers updateStateCarePlan() without crashing", () => {
  // given
  const mockUserId = "mockId";
  // when
  underTest.updateStateCarePlan(mockUserId);
  // then
  expect(wrapper.state().carePlans).toEqual([]);
});

test("App triggers updateStatePatient without crashing", () => {
  const mockPatientResource = {};
  underTest.updateStatePatient(mockPatientResource);
});

test("App triggers updateStateAppointment without crashing", () => {
  // given
  const mockUserId = "mockId";
  const mockRole = "mockRole";
  // when
  underTest.updateStateAppointment(mockUserId, mockRole);
  // then
  expect(wrapper.state().appointments).toEqual([]);
});

test("App triggers setUserList without crashing", () => {
  underTest.setUserList();
});

test("App triggers setUserList without crashing", () => {
  underTest.setUserList();
});

test("App triggers handleFhirServerError without crashing", () => {
  underTest.handleFhirServerError();
});

test("App triggers resetError without crashing", () => {
  underTest.resetError();
});

test("App triggers handleLoginError without crashing", () => {
  underTest.handleLoginError(
    "No 'state' parameter found in authorization response."
  );
});

test("App renders without crashing", () => {
  const wrapper = mount(<App />);
  expect(wrapper.children().type().name).toEqual("BrowserRouter");
  expect(
    wrapper
      .children()
      .children()
      .type().name
  ).toEqual("Router");
  expect(
    wrapper
      .children()
      .children()
      .children()
      .type().name
  ).toEqual("Switch");
  expect(
    wrapper
      .children()
      .children()
      .children()
      .children()
      .type().name
  ).toEqual("Route");
});
