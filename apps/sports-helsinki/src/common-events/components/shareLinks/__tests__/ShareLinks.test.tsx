import React from 'react';

import { render, screen } from '@/test-utils';
import type { ShareLinksProps } from '../ShareLinks';
import ShareLinks from '../ShareLinks';

const renderComponent = (props: ShareLinksProps) =>
  render(<ShareLinks {...props} />);

it('should have discoverable link address copy button as well as Facebook, Twitter and LinkedIn share links', () => {
  renderComponent({ title: 'Jaa tapahtuma' });
  const shareLinkLabelsFI = [
    /Kopioi linkin osoite/,
    /Jaa Facebookissa/,
    /Jaa Twitterissä/,
    /Jaa LinkedInissä/,
  ];

  shareLinkLabelsFI.forEach((label) => {
    expect(screen.getByLabelText(label)).not.toStrictEqual(null);
  });
});
