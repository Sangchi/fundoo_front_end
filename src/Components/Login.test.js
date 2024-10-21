import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import { signupLoginApiCall } from '../Services/apiService';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));


jest.mock('../Services/apiService', () => ({
  signupLoginApiCall: jest.fn(),
}));

describe('Login Component', () => {
  let wrapper;
  let mockNavigate;
  
  beforeEach(() => {
    mockNavigate = useNavigate;
    wrapper = shallow(<Login />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the email and password input fields', () => {
    expect(wrapper.find(TextField).at(0).props().label).toBe('Email');
    expect(wrapper.find(TextField).at(1).props().label).toBe('Password');
  });

  it('updates email state on input change', () => {
    const emailInput = wrapper.find(TextField).at(0);
    emailInput.simulate('change', { target: { value: 'test@example.com' } });
    
    expect(wrapper.find(TextField).at(0).props().value).toBe('test@example.com');
  });

  it('updates password state on input change', () => {
    const passwordInput = wrapper.find(TextField).at(1);
    passwordInput.simulate('change', { target: { value: 'password123' } });
    
    expect(wrapper.find(TextField).at(1).props().value).toBe('password123');
  });

  it('calls signupLoginApiCall on form submit and navigates on success', async () => {
    const mockToken = 'fakeToken';
    signupLoginApiCall.mockResolvedValueOnce({ access: mockToken });

    const form = wrapper.find('form');
    form.simulate('submit', { preventDefault: () => {} });

    await Promise.resolve(); 

    expect(localStorage.setItem).toHaveBeenCalledWith('access', mockToken);
    expect(mockNavigate).toHaveBeenCalledWith('/Dashboard');
  });

  it('shows error message on failed login', async () => {
    signupLoginApiCall.mockRejectedValueOnce(new Error('Login failed'));

    const form = wrapper.find('form');
    form.simulate('submit', { preventDefault: () => {} });

    await Promise.resolve(); 

    expect(wrapper.find('.error-message').text()).toBe('Login failed: Please enter correct email and password');
  });
});
