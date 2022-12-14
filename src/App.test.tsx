import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import App from './App';

test('Renders App Component and comparing with snapshot', async() => {
  const {container} = render(<App />);
  await waitFor(() => {
    expect(screen.getByText('Member Name')).toBeInTheDocument();
  });
  expect(container).toMatchSnapshot();

  const linkElement = screen.getByText(/Absence Page/i);
  expect(linkElement).toBeInTheDocument();
});
