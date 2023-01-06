import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES}  from '../button/button.component';

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {

const navigate = useNavigate();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    if (signInWithGooglePopup) {
      navigate('/');
      alert('You have successfully logged in');
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
      if (signInAuthUserWithEmailAndPassword) {
        alert('You have successfully logged in');
        navigate('/');
      }

    } catch (error) {
      console.log('user sign in failed', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button
           buttonType={BUTTON_TYPE_CLASSES.google} 
           type='button' 
           onClick={signInWithGoogle}>
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
