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

/* This file defines the ParentHomePage component which creates the homepage for users with a practitioner role.
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon, Label, Loader } from "semantic-ui-react";
import { dataIsReady, getNextEvent } from "./HomePageDataUtils";
import { formatDate, isValidDate } from "../../../service/Utils";

class PractitionerHomePage extends Component {
  render() {
    if (dataIsReady(this.props.user, this.props.events)) {
      const nextEvent = getNextEvent(this.props.events);
      return (
        <div>
          <h1>Hello, {this.props.user.firstName}!</h1>
          {/*Check whether the practitioner has any upcoming appointments to be displayed*/}
          {isValidDate(nextEvent.start) ? (
            <p>
              Your patient {nextEvent.patient}'s next appointment is at{" "}
              <Label image color="yellow" as={Link} to={"/secured/calendar"}>
                <Icon name="calendar check" />
                {formatDate(nextEvent.start)}
                <Label.Detail as="span">{nextEvent.title}</Label.Detail>
              </Label>
            </p>
          ) : (
            <p>You dont't have any appointments upcoming.</p>
          )}
        </div>
      );
    } else {
      return <Loader content="Loading" inline="centered" active size="large" />;
    }
  }
}

export default PractitionerHomePage;
