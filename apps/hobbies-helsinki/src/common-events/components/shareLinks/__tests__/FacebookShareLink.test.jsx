import { render } from '@testing-library/react';
import React from 'react';

import FacebookShareLink from '../FacebookShareLink';

const renderComponent = (props) => render(<FacebookShareLink {...props} />);

it('should apply aria label', () => {
  const sharedLink = 'https://helsinki.fi/some/';
  renderComponent({ sharedLink });

  expect(screen.getByLabelText(/Jaa Facebookissa/)).toBeInTheDocument();
});
