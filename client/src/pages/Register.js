import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { React, useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'

import { AuthContext } from '../context/auth';
import {useForm} from '../utils/hooks'
function Register(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({})



    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            context.login(result.data.login)
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function registerUser(){
        addUser();
    }


    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Register</h1>
                <Form.Input
                type="text"
                label="Username"
                placeholder="Username..."
                name="username"
                value={values.username}
                onChange={onChange}
                error={errors.username ?  true : false}
                />
                <Form.Input
                type="email"
                label="Email"
                placeholder="Email..."
                name="email"
                value={values.email}
                onChange={onChange}
                error={errors.email ?  true : false}
                />
                <Form.Input
                type="password"
                label="Password"
                placeholder="Password..."
                name="password"
                value={values.password}
                onChange={onChange}
                error={errors.password ?  true : false}
                />
                <Form.Input
                type="password"
                label="Retype Password"
                placeholder="Retype Password..."
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={onChange}
                error={errors.password ?  true : false}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
            <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map(value =>(
                        <li key={value}>{value}</li>
                    ))}
                </ul>
            </div>
            )}
        </div>
    )
}


const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id email username createdAt token
        }
    }
`

export default Register;