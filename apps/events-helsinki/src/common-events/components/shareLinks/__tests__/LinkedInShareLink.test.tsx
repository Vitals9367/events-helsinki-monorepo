import type { ShareLinkProps } from 'events-helsinki-components/components';
import React from 'react';
import { render, screen } from '@/test-utils';
import LinkedInShareLink from '../LinkedInShareLink';

const renderComponent = (props: ShareLinkProps) =>
  render(<LinkedInShareLink {...props} />);

it('should apply aria label', () => {
  const sharedLink = 'https://helsinki.fi/some/';
  renderComponent({ sharedLink });

  expect(screen.getByLabelText(/Jaa LinkedInissä/i)).toBeInTheDocument();
});
