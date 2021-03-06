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

/* This file contains the configuration of a sandbox which contains a provider.
 */

const smartSandboxConfigs = {
  // Provider launch (provider is Joseph P Nichols, sees three patients including Shelby Von)
  providerSandbox_1:
    "https://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImIiOiJkMGQwY2RlMC00YjIxLTQyZjYtOWMxZS1iZm" +
    "E0NDdkNzIwNTksc21hcnQtNzc3NzcwMSwyMmE5YmMyYi0wYTE1LTRkZGItODUxOC0xYTZmMGQ4MWEyODYiLCJlIjoic21hcnQt" +
    "UHJhY3RpdGlvbmVyLTcyMDgwNDE2In0/fhir"
};

const smartProviderConfig = {
  client: {
    client_id: "ucl_speedy_recovery",
    scope: "patient/*.read launch/patient launch/todo openid fhirUser"
  },
  server: smartSandboxConfigs.providerSandbox_1
};

export default smartProviderConfig;
