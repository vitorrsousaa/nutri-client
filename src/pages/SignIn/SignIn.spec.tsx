import { render } from '../../utils/test-utils';

import SignIn from '.';

describe('Sign In Page', () => {
  it('Should render correctly', () => {
    // Arrange

    // ACt
    const rendered = render(<SignIn />);

    // Assert
    expect(rendered.getByText('sign in'));
  });
});
