import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Signup from './Signup'; 
import { signupLoginApiCall } from '../Services/apiService';
import { axe, toHaveNoViolations } from 'jest-axe';

// Extend Jest with jest-axe for accessibility checks
expect.extend(toHaveNoViolations);

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../Services/apiService', () => ({
  signupLoginApiCall: jest.fn(),
}));

describe('Signup Component', () => {
  const navigate = useNavigate();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks to avoid state leaking between tests
    render(<Signup />);
  });

  afterEach(cleanup); // Cleanup after each test

  it('renders the Signup component', () => {
    expect(screen.getByText(/Create your Fundo Account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm/i)).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Signup />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('allows the user to input their details', () => {
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/Confirm/i), { target: { value: 'Password123!' } });

    expect(screen.getByLabelText(/Username/i).value).toBe('testuser');
    expect(screen.getByLabelText(/Email/i).value).toBe('test@example.com');
    expect(screen.getByLabelText(/Password/i).value).toBe('Password123!');
    expect(screen.getByLabelText(/Confirm/i).value).toBe('Password123!');
  });

  it('displays error message if passwords do not match', async () => {
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/Confirm/i), { target: { value: 'DifferentPassword!' } });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  it('handles successful signup', async () => {
    signupLoginApiCall.mockResolvedValueOnce({}); 

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/Confirm/i), { target: { value: 'Password123!' } });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => expect(screen.getByText(/Signup successful! You can now log in/i)).toBeInTheDocument());
    expect(navigate).toHaveBeenCalledWith('/login'); 
  });

  it('handles signup failure and retains input values', async () => {
    signupLoginApiCall.mockRejectedValueOnce({ response: { data: { error: 'Email already exists' } } }); 

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/Confirm/i), { target: { value: 'Password123!' } });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => {
      expect(screen.getByText(/Signup failed: Email already exists/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Username/i).value).toBe('testuser');
      expect(screen.getByLabelText(/Email/i).value).toBe('test@example.com');
      expect(screen.getByLabelText(/Password/i).value).toBe('Password123!');
      expect(screen.getByLabelText(/Confirm/i).value).toBe('Password123!');
    });
  });
});
