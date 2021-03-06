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

/* This file defines the PractitionerConditionPane which creates a pane used in the PractitionerInfo component which displays all
care plan information regarding the Patient
 */

import React, { Component } from "react";
import { Icon, Label, Tab, Table } from "semantic-ui-react";
import "./PractitionerInfo.css";
import { isBrowser, isTablet } from "react-device-detect";

class PractitionerConditionPane extends Component {
  render() {
    const { conditions } = this.props;
    const conditionsNum = conditions.length;

    const createConditionTable = () => {
      const table = [];
      if (conditionsNum) {
        const header = [
          <Table.Row key={"conditionRow"}>
            {isBrowser || isTablet ? (
              <Table.HeaderCell id="parentTableCell">#</Table.HeaderCell>
            ) : null}
            <Table.HeaderCell id="parentTableCell">Conditions</Table.HeaderCell>
            {isBrowser || isTablet ? (
              <Table.HeaderCell id="parentTableCell">Search</Table.HeaderCell>
            ) : null}
            {isBrowser || isTablet ? (
              <Table.HeaderCell id="parentTableCell">Time</Table.HeaderCell>
            ) : null}
            {isBrowser || isTablet ? (
              <Table.HeaderCell id="parentTableCell">Severity</Table.HeaderCell>
            ) : null}
            {isBrowser ? (
              <Table.HeaderCell id="parentTableCell">
                VerifiedStatus
              </Table.HeaderCell>
            ) : null}
            {isBrowser ? (
              <Table.HeaderCell id="parentTableCell">
                ClinicalStatus
              </Table.HeaderCell>
            ) : null}
            {isBrowser || isTablet ? (
              <Table.HeaderCell id="parentTableCell">BodySite</Table.HeaderCell>
            ) : null}
          </Table.Row>
        ];
        table.push(
          <Table.Header id="parentTableHeader" key="conditionTableHeader">
            {header}
          </Table.Header>
        );
      }
      const body = [];
      for (let i = 0; i < conditionsNum; i++) {
        const children = [];
        const summary = conditions[i].summary;
        const searchQuery = "https://www.google.com/search?q=" + summary;

        children.push(
          <Table.Cell key={"conditionOrderCell" + i}>
            <Label color="blue" ribbon>
              {`${i + 1}`}{" "}
            </Label>
          </Table.Cell>
        );

        children.push(
          <Table.Cell key={"conditionSummaryCell" + i} id="parentTableCell">
            {<h4>{summary}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell
            key={"conditionSummarySearchCell" + i}
            id="parentTableCell"
          >
            {
              <h4>
                <a href={searchQuery} target="_blank" rel="noopener noreferrer">
                  {" "}
                  <Icon color="blue" fitted name="search" />{" "}
                </a>
              </h4>
            }
          </Table.Cell>
        );
        if (isBrowser || isTablet) {
          children.push(
            <Table.Cell key={"conditionTimeCell" + i} id="parentTableCell">
              {<h4>{conditions[i].onsetDateTime.toString()}</h4>}
            </Table.Cell>
          );
          children.push(
            <Table.Cell key={"conditionSeverityCell" + i} id="parentTableCell">
              {<h4>{conditions[i].severity}</h4>}
            </Table.Cell>
          );
          if (!isTablet) {
            children.push(
              <Table.Cell
                key={"conditionVerificationStatusCell" + i}
                id="parentTableCell"
              >
                {<h4>{conditions[i].verificationStatus}</h4>}
              </Table.Cell>
            );

            children.push(
              <Table.Cell
                key={"conditionClinicalStatusCell" + i}
                id="parentTableCell"
              >
                {<h4>{conditions[i].clinicalStatus}</h4>}
              </Table.Cell>
            );
          }
          children.push(
            <Table.Cell key={"conditionBodySiteCell" + i} id="parentTableCell">
              {<h4>{conditions[i].bodySite}</h4>}
            </Table.Cell>
          );
        }
        body.push(
          <Table.Row id="parentTableRow" key={"conditionRow2" + i}>
            {children}
          </Table.Row>
        );
      }
      table.push(
        <Table.Body key="conditionTableBody" id="parentTableBody">
          {body}
        </Table.Body>
      );
      const conditionTable = [];
      conditionTable.push(
        <Table key="conditionTable" color="blue">
          {table}
        </Table>
      );
      return conditionTable;
    };

    return (
      <div>
        <Tab.Pane>
          <h4>
            There are {conditionsNum} recorded conditions for this patient.
          </h4>
          {createConditionTable()}
        </Tab.Pane>
      </div>
    );
  }
}

export default PractitionerConditionPane;
