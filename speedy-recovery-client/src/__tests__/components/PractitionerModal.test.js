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

/* This file tests the PractitionerModal component*/

import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import exampleAppointment from "../test_input/internal/ExampleAppointment";
import PractitionerModal from "../../components/secured/calendar/practitioner/PractitionerModal";

Enzyme.configure({ adapter: new Adapter() });

it("practitionermodal renders", () => {
  shallow(
    <PractitionerModal
      appointment={exampleAppointment}
      toggleEditModal={jest.fn()}
      isEditModalOpen={false}
    />
  );
});
