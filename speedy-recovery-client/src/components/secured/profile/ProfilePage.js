import React, { Component, Fragment } from "react";
import { Grid, Icon, Table } from "semantic-ui-react";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  render() {
    const roleText =
      this.state.user.role === "Patient" ? (
        <Fragment>
          <Icon name="user" />
          Patient
        </Fragment>
      ) : (
        <Fragment>
          <Icon name="user doctor" />
          Doctor
        </Fragment>
      );

    return (

      <Grid verticalAlign="middle" columns={3} centered>
        <Grid.Row>
          <Grid.Column width={12}>
            <h1>Profile</h1>

            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={4}>Name</Table.Cell>
                  <Table.Cell>{this.state.user.name}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Role</Table.Cell>
                  <Table.Cell>{roleText}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Healthcare provider</Table.Cell>
                  <Table.Cell>
                    <Icon name="medkit" />
                    {this.state.user.careProvider}
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Email</Table.Cell>
                  <Table.Cell>
                    <Icon name="mail" />
                    {this.state.user.email}
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Phone</Table.Cell>
                  <Table.Cell>
                    <Icon name="phone" />
                    {this.state.user.phone && this.state.user.phone[0].value}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  componentDidMount() {
    // TODO: Update state when data from FHIR is available instead
    this.props.onChange();
    this.setState({user: this.props.user})
  }

}

export default ProfilePage;
