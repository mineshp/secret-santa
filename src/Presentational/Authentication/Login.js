import React from 'react';
import PropTypes from 'prop-types';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';

const Login = ({
    handleSubmit,
    handleChange,
    data
}) => (
    <Container className="content-body">
        <Grid stackable centered>
            <Grid.Column className="login-form-grid-column">
                <Header as="h2" className="login-header" textAlign="center">
                    <Image src='secretSanta' className="home-logo" />
                    {' '}Login
                </Header>
                <Form size="large" onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Field>
                          <Input
                            fluid
                            name="memberName"
                            autoComplete="name"
                            placeholder="name..."
                            icon="user"
                            iconPosition="left"
                            className="text-box-3-col"
                            defaultValue={data.name}
                            onChange={handleChange}
                          />
                        </Form.Field>
                        <Form.Field>
                          <Input
                            fluid
                            name="groupID"
                            autoComplete="groupName"
                            placeholder="Group name..."
                            icon="user"
                            iconPosition="left"
                            className="text-box-3-col"
                            defaultValue={data.groupID}
                            onChange={handleChange}
                          />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                name="passphrase"
                                type="password"
                                autoComplete="passphrase"
                                placeholder="passphrase..."
                                className="text-box-3-col"
                                onChange={handleChange}
                                defaultValue={data.passphrase}
                            />
                        </Form.Field>
                        <Button color="pink" fluid size="large" type="submit">Login</Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    </Container>
);

Login.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    data: PropTypes.shape({}).isRequired
};

export default Login;
